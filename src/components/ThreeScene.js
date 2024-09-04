'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function ThreeScene() {
    const mountRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const controlsRef = useRef(null);
    const sunRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.set(0, 1, 15);
        cameraRef.current = camera;
        cameraRef.current.far = 10000; 

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setClearColor(0xaaaaaa);
        renderer.shadowMap.enabled = true;
        mountRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Add OrbitControls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = true;
        controls.zoomSpeed = 1.0;
        controls.enablePan = true;
        controls.panSpeed = 0.5;
        controls.enableRotate = true;
        controls.rotateSpeed = 1.0;
        controlsRef.current = controls;

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 10, 1);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 500;
        scene.add(directionalLight);
        sunRef.current = directionalLight;

        // Add a plane as the ground
        const planeSize = 10000;
        const planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize);
        const planeMaterial = new THREE.MeshStandardMaterial({ color: '#54b946', side: THREE.DoubleSide });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -Math.PI / 2;
        plane.receiveShadow = true;
        scene.add(plane);

        // Load the GLTF model
        const loader = new GLTFLoader();
        loader.load('/models/cp.gltf', (gltf) => {
            const model = gltf.scene;
            model.position.set(0, 0, 0);
            model.scale.set(1, 1, 1);
            // model.rotation.x = -Math.PI / 2;
            model.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;

                    // Assume roofs have a specific material or name
                    if (child.material && child.name.includes('Roof')) {
                        const originalColor = new THREE.Color(child.material.color.getHex());

                        // Add custom shader logic to change color based on sun angle
                        child.material.onBeforeCompile = (shader) => {
                            shader.uniforms.sunDirection = { value: sunRef.current.position.clone().normalize() };
                            shader.uniforms.originalColor = { value: originalColor };
                            shader.vertexShader = `
                                varying vec3 vNormal;
                                void main() {
                                    vNormal = normalize(normalMatrix * normal);
                                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                                }
                            ` + shader.vertexShader;

                            shader.fragmentShader = `
                                uniform vec3 sunDirection;
                                uniform vec3 originalColor;
                                varying vec3 vNormal;
                                void main() {
                                    float intensity = dot(vNormal, sunDirection);
                                    vec3 newColor = mix(originalColor, vec3(1.0, 0.0, 0.0), step(0.5, intensity));
                                    gl_FragColor = vec4(newColor, 1.0);
                                }
                            ` + shader.fragmentShader;
                        };

                        child.material.needsUpdate = true;
                    }
                }
            });
            scene.add(model);
        }, undefined, (error) => {
            console.error('Error loading model:', error);
        });

        // Set initial size
        updateSize();

        // Animation loop
        const animate = function () {
            requestAnimationFrame(animate);

            // Animate sun position (directional light)
            if (sunRef.current) {
                const time = Date.now() * 0.0005;
                sunRef.current.position.set(
                    Math.sin(time) * 30,
                    Math.cos(time) * 30,
                    Math.cos(time) * 30
                );
                sunRef.current.lookAt(scene.position);
            }

            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        // Handle container resize
        const resizeObserver = new ResizeObserver(updateSize);
        resizeObserver.observe(mountRef.current);

        // Clean up on unmount
        return () => {
            resizeObserver.disconnect();
            mountRef.current.removeChild(renderer.domElement);
            controls.dispose();
        };
    }, []);

    const updateSize = () => {
        if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;

        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;

        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();

        rendererRef.current.setSize(width, height);
    };

    return <div ref={mountRef} className='w-full h-full' />;
}

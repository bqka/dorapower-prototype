'use client';

const access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlMzJhODQzMS0wZjk4LTQzNjctOTlmMy1lZTBmYjkzMGZhMTUiLCJpZCI6MjM5MTIxLCJpYXQiOjE3MjU0NTk3MjZ9.xGfx3BmQwvKZctzFV4puCrS8PU6KphgMNJVXuFSIpug';

import React from 'react';
import type { CesiumType } from '../types/cesium';
import type { Cesium3DTileset, Entity, Viewer } from 'cesium';
import type { Position } from '../types/position';
import { dateToJulianDate } from '../example_utils/date';
import 'cesium/Build/Cesium/Widgets/widgets.css';

export const CesiumComponent: React.FunctionComponent<{
    CesiumJs: CesiumType,
    positions: Position[]
}> = ({
    CesiumJs,
    positions
}) => {
    const cesiumViewer = React.useRef<Viewer | null>(null);
    const cesiumContainerRef = React.useRef<HTMLDivElement>(null);
    const addedScenePrimitives = React.useRef<Cesium3DTileset[]>([]);
    const [isLoaded, setIsLoaded] = React.useState(false);

    const resetCamera = React.useCallback(async () => {
        if (cesiumViewer.current !== null) {
            // Calculate bounding box of all entities to fit the camera view
            const boundingSphere = CesiumJs.BoundingSphere.fromBoundingSpheres(
                positions.map(p => new CesiumJs.BoundingSphere(
                    CesiumJs.Cartesian3.fromDegrees(p.lng, p.lat),
                    400 // Adjust radius if necessary
                ))
            );

            cesiumViewer.current.scene.camera.viewBoundingSphere(boundingSphere, new CesiumJs.HeadingPitchRange(
                CesiumJs.Math.toRadians(10),
                CesiumJs.Math.toRadians(-30),
                boundingSphere.radius * 2
            ));
        }
    }, [CesiumJs, positions]);

    const cleanUpPrimitives = React.useCallback(() => {
        addedScenePrimitives.current.forEach(scenePrimitive => {
            if (cesiumViewer.current !== null) {
                cesiumViewer.current.scene.primitives.remove(scenePrimitive);
            }
        });
        addedScenePrimitives.current = [];
    }, []);

    const initializeCesiumJs = React.useCallback(async () => {
        if (cesiumViewer.current !== null) {
            try {
                const osmBuildingsTileset = await CesiumJs.createOsmBuildingsAsync();
                cleanUpPrimitives();

                const osmBuildingsTilesetPrimitive = cesiumViewer.current.scene.primitives.add(osmBuildingsTileset);
                addedScenePrimitives.current.push(osmBuildingsTilesetPrimitive);

                positions.forEach(p => {
                    console.log(`Adding entity at lat: ${p.lat}, lng: ${p.lng}`); // Debugging output
                    cesiumViewer.current?.entities.add({
                        position: CesiumJs.Cartesian3.fromDegrees(p.lng, p.lat),
                        ellipse: {
                            semiMinorAxis: 50000.0,
                            semiMajorAxis: 50000.0,
                            height: 0,
                            material: CesiumJs.Color.RED.withAlpha(0.5),
                            outline: true,
                            outlineColor: CesiumJs.Color.BLACK,
                        }
                    });
                });

                // Set loaded flag and adjust camera after entities are added
                setIsLoaded(true);
                resetCamera();
            } catch (error) {
                console.error("Error initializing CesiumJS:", error); // Error handling
            }
        }
    }, [CesiumJs, cleanUpPrimitives, positions, resetCamera]);

    React.useEffect(() => {
        if (cesiumViewer.current === null && cesiumContainerRef.current) {
            CesiumJs.Ion.defaultAccessToken = access_token;

            cesiumViewer.current = new CesiumJs.Viewer(cesiumContainerRef.current, {
                terrain: CesiumJs.Terrain.fromWorldTerrain(),
                sceneMode: CesiumJs.SceneMode.SCENE3D, // Ensure 3D mode is enabled
                useDefaultRenderState: false, // Allows for custom rendering settings
                selectionIndicator: false, // Optional: Disable selection indicator for cleaner view
                scene3DOnly: true // Use only 3D mode, if applicable
            });

            // Enable depth testing and adjust rendering settings
            cesiumViewer.current.scene.globe.depthTestAgainstTerrain = true;
            cesiumViewer.current.scene.globe.enableLighting = true;
            cesiumViewer.current.scene.globe.showGroundAtmosphere = true;
            cesiumViewer.current.scene.globe.baseColor = CesiumJs.Color.WHITE.withAlpha(0.3);
            cesiumViewer.current.scene.globe.enableLighting = true;

            cesiumViewer.current.clock.clockStep = CesiumJs.ClockStep.SYSTEM_CLOCK_MULTIPLIER;
        }
    }, [CesiumJs]);

    React.useEffect(() => {
        if (isLoaded) return;
        initializeCesiumJs();
    }, [initializeCesiumJs, isLoaded]);

    return (
        <div
            ref={cesiumContainerRef}
            id='cesium-container'
            style={{ height: '100%', width: '100%' }}
        />
    );
}

export default CesiumComponent;

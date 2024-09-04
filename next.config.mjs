import path from 'path';
import process from 'process';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import webpack from 'webpack';

const pathBuilder = (subpath) => path.join(process.cwd(), subpath);

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { webpack }) => {
        config.plugins.push(
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: pathBuilder('node_modules/cesium/Build/Cesium/Workers'),
                        to: pathBuilder('public/cesium/Workers'),
                        info: { minimized: true }
                    },
                    {
                        from: pathBuilder('node_modules/cesium/Build/Cesium/ThirdParty'),
                        to: pathBuilder('public/cesium/ThirdParty'),
                        info: { minimized: true }
                    },
                    {
                        from: pathBuilder('node_modules/cesium/Build/Cesium/Assets'),
                        to: pathBuilder('public/cesium/Assets'),
                        info: { minimized: true }
                    },
                    {
                        from: pathBuilder('node_modules/cesium/Build/Cesium/Widgets'),
                        to: pathBuilder('public/cesium/Widgets'),
                        info: { minimized: true }
                    }
                ]
            }),
            new webpack.DefinePlugin({ CESIUM_BASE_URL: JSON.stringify('/cesium') })
        );

        return config;
    },
    output: 'standalone'
};

export default nextConfig;

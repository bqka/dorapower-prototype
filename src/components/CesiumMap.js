import { useEffect, useRef } from "react";
import { ArcGisMapServerImageryProvider, CesiumTerrainProvider, ImageryLayer, Viewer } from "cesium";
import 'cesium/Build/Cesium/Widgets/widgets.css'

const CesiumMap = () => {
  const cesiumContainerRef = useRef(null);

  useEffect(() => {
      const viewer = new Viewer(cesiumContainerRef.current, {
          baseLayer: new ImageryLayer(new ArcGisMapServerImageryProvider({
              url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
          })),
          terrainProvider: new CesiumTerrainProvider({
              url: 'https://assets.agi.com/stk-terrain/world'
          })
      });
  }, []);

  return (
      <div ref={cesiumContainerRef} style={{ width: '100%', height: '100%' }} />
  );
};

export default CesiumMap;
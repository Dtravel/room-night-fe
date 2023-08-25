import React, { useEffect } from 'react'
import { Map, Source, Layer } from 'react-map-gl';
import { clusterLayer, clusterCountLayer, unclusteredPointLayer, unclusteredSymbolLayer } from './layer';

import type { MapRef } from 'react-map-gl';
import type { GeoJSONSource } from 'react-map-gl';
import useWindowDimensions from '@dtravel/helpers/hooks/useWindowDimensions';
import { isEmpty } from '@dtravel/utils/common';
import { convertCurrencySymbol, numberWithCommas } from '@dtravel/helpers/utils/common';
interface Props {
  merchantData: any[]
}
// https://docs.mapbox.com/mapbox-gl-js/example/cluster-html/

// const rawData = [
//   { "type": "Feature", "properties": { "id": "ak16994521", "mag": 2.3 }, "geometry": { "type": "Point", "coordinates": [-151.5129, 63.1016, 0.0] } },
//   { "type": "Feature", "properties": { "id": "ak16994519", "mag": 1.7 }, "geometry": { "type": "Point", "coordinates": [-150.4048, 63.1224, 105.5] } },
//   { "type": "Feature", "properties": { "id": "ak16994517", "mag": 1.6 }, "geometry": { "type": "Point", "coordinates": [-151.3597, 63.0781, 0.0] } },
//   { "type": "Feature", "properties": { "id": "ci38021336", "mag": 1.42 }, "geometry": { "type": "Point", "coordinates": [-118.497, 34.299667, 7.64] } },
//   { "type": "Feature", "properties": { "id": "us2000b2nn", "mag": 4.2 }, "geometry": { "type": "Point", "coordinates": [-87.6901, 12.0623, 46.41] } },
// ]
const MapsBoxMerchantV2Cluster = ({ merchantData }: Props) => {
  const merchantDataMap = (merchantData || []).filter((el: any) => el?.address?.lng && el?.address?.lat)
  const mapRef = React.useRef<MapRef>(null);
  const windowDimensions = useWindowDimensions()
  const isMobile = windowDimensions.width < 768

  const applyToArray = (func: any, array: any[]) => func.apply(Math, array)
  useEffect(() => {
    if (!isEmpty(merchantDataMap) && mapRef && (mapRef as any)?.current) {
      const pointsLong = (merchantDataMap || []).map((el: any) => Number(el?.address?.lng))
      const pointsLat = (merchantDataMap || []).map((el: any) => Number(el?.address?.lat))
      const cornersLongLat = [
        [applyToArray(Math.min, pointsLong), applyToArray(Math.min, pointsLat)],
        [applyToArray(Math.max, pointsLong), applyToArray(Math.max, pointsLat)]
      ]
      if (!isEmpty(cornersLongLat) && (mapRef as any)?.current && typeof window !== "undefined") {
        (mapRef as any)?.current.fitBounds(
          cornersLongLat,
          {
            padding: isMobile ? { top: 96, bottom: 160, left: 48, right: 48 } : { top: 160, bottom: 80, left: 120, right: 120 },
            duration: 1000,
            maxZoom: 14
          }
        )
      }
    } else if (mapRef && (mapRef as any)?.current && typeof window !== "undefined") {
      (mapRef as any)?.current.fitBounds(
        [[-180, 0], [180, 0]],
        {
          padding: { top: 0, bottom: 0, left: 0, right: 0 },
          duration: 1000,
          maxZoom: 10,
        }
      )
    }
    // eslint-disable-next-line
  }, [merchantData, isMobile]);
  const onClick = (event: any) => {
    const feature = event.features[0];
    if (feature) {
      const clusterId = feature.properties.cluster_id;

      const mapboxSource = mapRef?.current?.getSource('earthquakes') as GeoJSONSource;

      mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) {
          return;
        }
        mapRef?.current?.easeTo({
          center: feature.geometry.coordinates,
          zoom,
          duration: 500
        });
      });
    }
  };
  const customData: any[] = merchantDataMap.map((el: any) => {
    return {
      type: "Feature",
      properties: {
        id: el.id,
        price: el?.propertyPrice?.basePrice || 0,
        price_view: `${convertCurrencySymbol(el?.propertyPrice?.currency)}${numberWithCommas(el?.propertyPrice?.basePrice || 0)}`,
      },
      geometry: {
        type: "Point",
        coordinates: [el?.address?.lng, el?.address?.lat]
      },

    }
  })

  return (
    <>
      <Map
        initialViewState={{
          latitude: 40.67,
          longitude: -103.59,
          zoom: 3
        }}
        mapStyle='mapbox://styles/mapbox/light-v10'
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        interactiveLayerIds={[clusterLayer?.id as string]}
        onClick={onClick}
        ref={mapRef}
      >
        <Source
          id="earthquakes"
          type="geojson"
          // data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
          data={
            {
              type: "FeatureCollection",
              // "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
              features: customData
            }}
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
          <Layer {...unclusteredSymbolLayer} />
        </Source>
      </Map>
    </>
  )
}
export default MapsBoxMerchantV2Cluster
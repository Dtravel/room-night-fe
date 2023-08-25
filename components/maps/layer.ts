import type { LayerProps } from 'react-map-gl'

export const clusterLayer: LayerProps = {
  id: 'clusters',
  type: 'circle',
  source: 'earthquakes',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 100, '#f1f075', 750, '#f28cb1'],
    'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
  },
}

export const clusterCountLayer: LayerProps = {
  id: 'cluster-count',
  type: 'symbol',
  source: 'earthquakes',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 16,
    'text-line-height': 20,
  },
  paint: {
    'text-color': '#171716',
  },
}

export const unclusteredPointLayer: LayerProps = {
  id: 'unclustered-point',
  type: 'circle',
  source: 'earthquakes',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': '#fff',
    'circle-radius': ['step', ['get', 'price'], 20, 100, 30, 750, 40],
    // 'circle-stroke-width': 1,
    // 'circle-stroke-color': '#fff',
  },
}

export const unclusteredSymbolLayer: LayerProps = {
  id: 'earthquake_label',
  type: 'symbol',
  source: 'earthquakes',
  filter: ['!', ['has', 'point_count']],
  layout: {
    'text-field': ['get', 'price_view'],
    'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
    'text-size': 16,
    'text-line-height': 20,
  },
  paint: {
    'text-color': '#171716',
  },
}

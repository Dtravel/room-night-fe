/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Marker } from 'react-map-gl'
import { IconMapMarker } from '@dtravel/components/common/Icons'

interface Props {
  longitude: number
  latitude: number
  handleClickMarker?: any
  color?: string
}
const MapsBoxMarker = ({ handleClickMarker, longitude, latitude, color }: Props) => {
  return (
    <Marker longitude={Number(longitude)} latitude={Number(latitude)}>
      <button
        onClick={() => {
          if (handleClickMarker) handleClickMarker()
        }}
      >
        <IconMapMarker color={color} />
      </button>
    </Marker>
  )
}
export default MapsBoxMarker

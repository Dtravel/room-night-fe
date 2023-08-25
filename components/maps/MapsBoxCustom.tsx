/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import { TransitionProps } from '@mui/material/transitions'
import { Dialog, Slide } from '@mui/material'
import Image from 'next/image'
import ic_close from '@dtravel/assets/icons/ic_close.svg'
import Map from 'react-map-gl'
import MapsBoxMarker from './MapsBoxMarker'
import useWindowDimensions from '@dtravel/helpers/hooks/useWindowDimensions'
import useTheme from '@dtravel/helpers/hooks/useTheme'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})
interface Props {
  externalName: string
  address: string
  longitude: number
  latitude: number
  hiddenMarker?: boolean
}
const MapsBoxCustom = ({ externalName, address, longitude, latitude, hiddenMarker }: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const windowDimensions = useWindowDimensions()
  const { color } = useTheme()

  const handleClickMarker = () => {
    setOpen(true)
  }
  const handleClose = () => setOpen(false)
  const mapsBox = (isDialog?: boolean) => {
    return (
      <Map
        mapboxAccessToken={
          process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ||
          'pk.eyJ1IjoiZHRyYXZlbCIsImEiOiJjbDRkank4Y3MwOHl0M2ZtbWwzb2FkZWVnIn0.vG0Rk2X02-PnO8p37snjlw'
        }
        initialViewState={{
          longitude: Number(longitude),
          latitude: Number(latitude),
          zoom: 14,
        }}
        style={{ width: '100%', height: '100%', borderRadius: isDialog ? 0 : 24 }}
        mapStyle="mapbox://styles/mapbox/light-v10"
        scrollZoom={!!isDialog}
        dragPan={!!isDialog || (windowDimensions.width >= 1024 && !isDialog)}
        doubleClickZoom={!!isDialog}
      >
        {longitude && latitude && !hiddenMarker && (
          <MapsBoxMarker
            longitude={Number(longitude)}
            latitude={Number(latitude)}
            handleClickMarker={handleClickMarker}
            color={color}
          />
        )}
      </Map>
    )
  }
  return (
    <>
      {mapsBox()}
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <div className="flex justify-between items-center px-6 py-5 min-h-[88px]">
          <Image src={ic_close} alt="" width={24} height={24} className="hidden opacity-0" />
          <p className="flex flex-col items-center justify-center w-full">
            <span className="font-editorial-new text-24-32 text-sand-7">{externalName}</span>
            <span className="text-12-16 text-sand-6">{address}</span>
          </p>
          <Image src={ic_close} alt="" width={24} height={24} onClick={handleClose} className="cursor-pointer" />
        </div>
        {mapsBox(true)}
      </Dialog>
    </>
  )
}
export default MapsBoxCustom

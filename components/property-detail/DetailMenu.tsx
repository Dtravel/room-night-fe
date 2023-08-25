import React, { useEffect, useState } from 'react'
import { isScrolledIntoView } from '@dtravel/helpers/utils/common'
import { useAppSelector } from '@dtravel/redux/hooks'
import { isEmpty } from '@dtravel/utils/common'

const MENU = [
  {
    key: 'photos',
    label: 'Photos',
  },
  {
    key: 'location',
    label: 'Location',
  },
  {
    key: 'amenities',
    label: 'Amenities',
  },
  {
    key: 'reviews',
    label: 'Reviews',
  },
  {
    key: 'policies',
    label: 'Policies',
  },
]

const DetailMenu = () => {
  const { propertyReview } = useAppSelector((state) => state.property)
  const [activeMenu, setActiveMenu] = useState<string>('mission')
  const MENU_SHOW = MENU.filter((el: any) => !(isEmpty(propertyReview) && el.key === 'reviews'))

  useEffect(() => {
    // first time set active to photos
    setActiveMenu('photos')
  }, [])

  useEffect(() => {
    const listId = MENU_SHOW.map((item) => item.key)
    document.addEventListener('scroll', function () {
      for (let id of listId) {
        const element = document.getElementById(id)
        if (element && isScrolledIntoView(element)) {
          setActiveMenu(id)
          break
        }
      }
    })
    return () => {
      window.removeEventListener('scroll', function () { })
    }
  }, [])

  const handleClickMenu = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const bodyRect = document?.body?.getBoundingClientRect()?.top
      const elementRect = element?.getBoundingClientRect()?.top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
      // element.scrollIntoView({ behavior: 'smooth', inline: 'end' })
      setActiveMenu(id)
    }
  }

  return (
    <ul className={'hidden md:flex gap-[24px]'}>
      {MENU_SHOW.map((item) => {
        return (
          <li
            key={item.key}
            className={`font-inter-500 text-14-18 ${activeMenu === item.key ? 'text-neutral-900' : 'text-neutral-600'}`}
          >
            {/*<a>{item.label}</a>*/}
            <button onClick={() => handleClickMenu(item.key)}>{item.label}</button>
          </li>
        )
      })}
    </ul>
  )
}

export default DetailMenu

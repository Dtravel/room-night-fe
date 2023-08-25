import React, { useEffect, useRef, useState } from 'react'
import useTheme from '@dtravel/helpers/hooks/useTheme'

interface Props {
  content: string
  numberOfLine?: number
}

const ViewMoreContent: React.FC<Props> = ({ content, numberOfLine }) => {
  const eleRef = useRef<HTMLDivElement | null>(null)
  const [hasMore, setHasMore] = useState<boolean>(false)
  const [isExpanse, setIsExpanse] = useState<boolean>(false)
  const { color } = useTheme()

  const checHasMore = () => {
    const divElement = eleRef.current as HTMLDivElement
    if (divElement) {
      // const desHeight = divElement.getBoundingClientRect().height
      const scrollHeight = divElement.scrollHeight
      // requirement: Show 10 lines by default, longer than 10 lines expands all text
      // lineHeigth: 24
      setHasMore(scrollHeight >= 24 * (numberOfLine || 10))
    }
  }

  useEffect(() => {
    const divElement = eleRef.current as HTMLDivElement
    if (content && divElement) {
      checHasMore()
    }
    // eslint-disable-next-line
  }, [numberOfLine, content, eleRef])

  const handleToggleDesciption = () => {
    setIsExpanse((prevState) => !prevState)
  }
  const lastChar = (content || '').trim().slice(-1)

  return (
    <>
      <div
        ref={eleRef}
        className={'font-inter-400 text-neutral-900 text-16-24 relative whitespace-pre-line'}
        style={
          isExpanse
            ? { wordBreak: 'break-word' }
            : {
              wordBreak: 'break-word',
              display: '-webkit-box',
              WebkitLineClamp: numberOfLine || 10,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }
        }
      >
        {content}
        {lastChar === '.' || lastChar === '' || lastChar === '!' ? '' : '.'}
        <div
          className={`absolute bottom-0 left-0 w-full h-[64px] ${hasMore && !isExpanse ? 'bg-gradient-to-b from-white-0 to-white' : ''
            }`}
        />
      </div>

      {hasMore && (
        <button
          className={'font-maison-neue-medium text-16-20 underline mt-4 text-neutral-900'}
          onClick={handleToggleDesciption}
          style={color ? { color } : {}}
        >
          {isExpanse ? 'Less' : 'More'}
        </button>
      )}
    </>
  )
}

export default ViewMoreContent

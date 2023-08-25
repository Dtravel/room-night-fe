import { NextPage } from 'next'
import React from 'react'
import queryString from 'query-string'


interface Props { }

const BookingPage: NextPage<Props> = () => {
  return <></>
}

export async function getServerSideProps(context: any) {
  const { propertyId, listingId, ...otherQuery } = context?.query || {}
  const paramsSearch = queryString.stringify({ ...otherQuery })
  const { req } = context
  const hostDomain = req?.headers?.host

  return {
    redirect: {
      permanent: true,
      destination: `https://${hostDomain}/${propertyId}/booking/${listingId}${paramsSearch ? `?${paramsSearch}` : ''}`,
    },
  }
}

export default BookingPage

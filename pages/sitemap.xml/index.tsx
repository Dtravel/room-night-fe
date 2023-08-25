import { getSiteMap } from '@dtravel/helpers/api/merchant'
import { GetServerSideProps } from 'next'
// import { getServerSideSitemap, ISitemapField } from 'next-sitemap'

const SiteMap = () => null

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  // const { hostAddress } = context.query
  // const walletAddress = (hostAddress || '0x2933b9cd8b8608e2a879ab5449ad350d24276abf').toLowerCase()
  // const res: any = await getMerchantList({
  //   hostAddress: walletAddress,
  //   pageSize: '10',
  //   page: `1`,
  // })
  // let data: any[] = []
  // if (res?.data?.success) {
  //   data = res?.data?.data
  // }
  // const fields: ISitemapField[] = data.map((el: any) => {
  //   return {
  //     loc: `${process.env.NEXT_PUBLIC_SITE_URL}/property/${walletAddress}/${el.id}`,
  //     lastmod: new Date().toISOString()
  //   }
  // })
  const { res } = context
  const response: any = await getSiteMap()
  if (res) {
    res.setHeader('Content-Type', 'text/xml')
    res.write(response.data)
    res.end()
  }
  return {
    props: {},
  }
}

export default SiteMap

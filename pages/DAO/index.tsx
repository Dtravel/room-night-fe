import type { NextPage } from 'next';
import DAO from '@dtravel/components/dao/DAO';
import LayoutHome from '@dtravel/components/layout/LayoutHome';
interface Props {
  userAgent?: string;
}

const DAOPage: NextPage<Props> = () => (
  <>
    <LayoutHome title="Dtravel DAO" description="Dtravel DAO">
      <DAO />
    </LayoutHome>
  </>
);

DAOPage.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  return { userAgent };
};

export default DAOPage;

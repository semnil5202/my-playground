import { Helmet } from 'react-helmet-async';

interface Props {
  title: string;
}

const HelmetComp = ({ title }: Props) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
    </Helmet>
  );
};

export default HelmetComp;

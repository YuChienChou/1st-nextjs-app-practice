import Head from 'next/head';

import '../styles/globals.css';
import Layout from '../components/layout/layout';


function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta name='viewport' content='inital-scale=1.0, width=devide-width' />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp
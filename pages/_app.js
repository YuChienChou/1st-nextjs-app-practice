import Head from 'next/head';

import '../styles/globals.css';
import Layout from '../components/layout/layout';


function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Next.js Events</title> // this will be overwritten if new Head title is defined in other pages
        <meta name='description' content='Next.js Events'/> // this will be overwritten if new meta data is defined in other pages
        <meta name='viewport' content='inital-scale=1.0, width=devide-width' />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp
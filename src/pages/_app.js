/* pages/_app.js */
import '../styles/globals.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { CookiesProvider } from 'react-cookie';

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </CookiesProvider>
  );
}

export default MyApp;

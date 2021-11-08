import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/Layout';
import { useEffect, useState } from "react";

function App({ Component, pageProps }) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if(localStorage.getItem('memorang-email')){
      setLoggedIn(true);
    }
  },[])
  return (
    <Layout isLoggedIn={isLoggedIn}>
      <Component isLoggedIn={isLoggedIn} {...pageProps} />
    </Layout>
  )
}

export default App
import Head from "next/head";
import { useEffect, useState } from "react";
import Router from 'next/router';
import SignUpForm from '../components/SignUpForm';

export const siteTitle = "MMDb | SignUp";

export default function SignUp() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if(localStorage.getItem('memorang-email')){
      setLoggedIn(true);
    }
  },[])
  if(isLoggedIn){
    // Router.push('/search', '/search?loggedIn=true');
    Router.push({
      pathname: '/search',
      query: { loggedIn: isLoggedIn },
    });
    return (<p>Already logged in. Redirecting...!</p>)
  }
  return (
    <div>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <SignUpForm/>
    </div>
  );
}

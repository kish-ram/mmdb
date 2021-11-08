import Link from "next/link";
import Head from "next/head";
import { useEffect, useState } from "react";
import cookie from 'js-cookie'

export const siteTitle = "MMDb | Logout";

export default function Logout() {
  const [isLoggedIn, setLoggedIn] = useState(true);
  useEffect(() => {
    localStorage.removeItem('memorang-email');
    localStorage.removeItem('memorang-user');
    cookie.set("memorang-user");
    setLoggedIn(false);
  },[])
  return (
    <div>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {isLoggedIn === false ? <p>Logged out. Click <Link href='/login'>here</Link> to login again!</p> : null}
    </div>
  );
}

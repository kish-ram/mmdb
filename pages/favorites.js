import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Router from 'next/router';
import Favorites from '../components/Favorites';
import {
    ApolloClient,
    InMemoryCache,
    useQuery,
    useMutation,
    gql,
  } from "@apollo/client";

export const siteTitle = "MMDb | My Favorites";

export default function Favorite ({favorites}) {
    console.log(favorites)
    const [isLoggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
      if(localStorage.getItem('memorang-email')){
        setLoggedIn(true);
      }
    },[])
    return (
        <div>
          <Head>
            <title>{siteTitle}</title>
          </Head>
          {favorites.length>0 ? <Favorites favorites={favorites} isLoggedIn={isLoggedIn} /> : <p>No favorites added. <Link href='/search'>Search</Link> and add few!</p> }
        </div>
      );
}

export const getServerSideProps = async ({req,res}) => {
    let userId = req.cookies['memorang-user'];
    const client = new ApolloClient({
        uri: "https://2e8ui9n2p8.execute-api.us-east-1.amazonaws.com/dev/graphql",
        cache: new InMemoryCache(),
      });
    
      const { data, loading, error } = await client.query({
        query: gql`
        query {
            favorites(userId: "${userId}") {
                title
                status
                movieId
              }
            }`,
      });
      if(loading) return "<div>Loading.!</div>";
      if(error) return "<div>Errror.!</div>";
      console.log('hereee');
      console.log(data);
      return { props: {favorites: data.favorites} };
}
import Head from "next/head";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FormControl } from "react-bootstrap";
import MovieList from "../components/MovieList";

export const siteTitle = "MMDb | Search";

export default function Search() {
  const router = useRouter();
  console.log('router.query.loggedIn');
  console.log(router.query.loggedIn);
  const [isLoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if(localStorage.getItem('memorang-email')){
      setLoggedIn(true);
    }
  },[])
  let [moviesState, setMovies] = useState([]);
  const searchHandler = async (event) => {
    let searchSlug = event.target.value;
    if (searchSlug.length > 2) {
      let data = await fetchMovies(searchSlug);
      setMovies(data.movies);
    } else {
      setMovies([]);
    }
  };
  return (
    <div>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <main>
        <h1 className="title">Find movies!</h1>

        <p className="description">Get started by typing few characters</p>

        <FormControl type="text" name="search" placeholder="Search movies by title..." onChange={searchHandler} autoComplete="off" />
        {moviesState.length>0 && <MovieList movies={moviesState}/> }
      </main>
    </div>
  );
}

export async function fetchMovies(searchSlug) {
  // let searchSlug = event.target.value
  const client = new ApolloClient({
    uri: "https://2e8ui9n2p8.execute-api.us-east-1.amazonaws.com/dev/graphql",
    cache: new InMemoryCache(),
  });

  const { data, loading, error } = await client.query({
    query: gql`
            query {
              movies(title: "${searchSlug}") {
                title,id, overview, release_date
              }
            }
          `,
  });
  if(loading) return "<div>Loading.!</div>";
  if(error) return "<div>Errror.!</div>";
  return { movies: data.movies };
}

export async function getStaticProps() {
  return {
    props: {
      movies: [],
    },
  };
}

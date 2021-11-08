import Link from "next/link";
import cookie from "js-cookie";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { Card, Button } from "react-bootstrap";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  useQuery,
  useMutation,
  gql,
} from "@apollo/client";
import { useEffect, useState } from "react";

const Favorites = ({ isLoggedIn, favorites }) => {
  console.log("isLoggedin");
  console.log(isLoggedIn);
  if (!isLoggedIn) {
    return (
      <p>
        Please <Link href="/login">login</Link> to continue
      </p>
    );
  }
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    setFavs(favorites);
  }, []);

  const handleFavToggle = async (event) => {
    const movieId = event.target.getAttribute("data-movieid");
    const title = event.target.getAttribute("data-title");
    const userId = cookie.get("memorang-user");
    const client = new ApolloClient({
      uri: "https://2e8ui9n2p8.execute-api.us-east-1.amazonaws.com/dev/graphql",
      cache: new InMemoryCache(),
    });
    const { data, loading, error } = await client.mutate({
      mutation: gql`
    mutation {
      toggleFavorite(movieId: ${movieId}, userId: "${userId}", title: "${title}") {
          status
        }
      }
    `,
    });
    console.log(error);
    console.log(data);

    const fetchResp = await client.query({
      query: gql`
    query {
        favorites(userId: "${userId}") {
            title
            status
            movieId
          }
        }`,
    });
    if (fetchResp.loading) return "<div>Loading.!</div>";
    if (fetchResp.error) return "<div>Errror.!</div>";
    console.log("hereee");
    console.log(fetchResp.data);
    setFavs(fetchResp.data.favorites);
  };
  return favs.length>0 ? (favs.map((favorite) => {
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Link
            key={favorite.movieId}
            href="/movie/[id]"
            as={`/movie/${favorite.movieId}`}
          >
            <Card.Title style={{ cursor: "pointer" }}>
              {favorite.title}
            </Card.Title>
          </Link>
          <Button
            variant="warning"
            onClick={handleFavToggle}
            data-movieid={favorite.movieId}
            data-title={favorite.title}
          >
            Remove from Favorite <BsHeartFill />
          </Button>
        </Card.Body>
      </Card>
    );
  })) :  <p>No favorites added. <Link href='/search'>Search</Link> and add few!</p>
};

export default Favorites;

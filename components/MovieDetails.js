import Link from 'next/link';
import Moment from 'react-moment';
import cookie from 'js-cookie'
import { Button } from 'react-bootstrap';
import { BsHeart, BsHeartFill } from "react-icons/bs";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  useQuery,
  useMutation,
  gql,
} from "@apollo/client";

import styles from "../styles/MovieDetails.module.css";
import { useEffect, useState } from 'react';

const MovieDetails = (data) => {

  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setIsFav(data.isFavorite);
  }, [])

  const handleFavToggle = async (event) => {
    const movieId = event.target.getAttribute('data-movieid');
    const title = event.target.getAttribute('data-title');
    const userId = cookie.get("memorang-user");
    const client = new ApolloClient({
      uri: 'https://2e8ui9n2p8.execute-api.us-east-1.amazonaws.com/dev/graphql',
      cache: new InMemoryCache()
  });
  const { data, loading, error } = await client.mutate({
    mutation: gql`
    mutation {
      toggleFavorite(movieId: ${movieId}, userId: "${userId}", title: "${title}") {
          status
        }
      }
    `
  });
  console.log(error);
  console.log(data);

  setIsFav(data.toggleFavorite.status)
    
  }
  
  return (
    <div className={styles.card}>
        <img className={styles.poster} src={data.imageUrl} />
        <h2>{data.title}</h2>
        <p><span className={styles.spans}>Synopsis:</span>{data.overview}</p>
        <p><span className={styles.spans}>Year of release:</span>
        <Moment format="YYYY">
          { data.release_date }
        </Moment>
        </p>
        <p><span className={styles.spans}>Runtime:</span>{data.runtime > 0 ? `${data.runtime} minutes` : 'not available'}</p>
        <p><span className={styles.spans}>Genres:</span>
            {
              data.genres.length > 0 ? 
                data.genres.map((el,idx) => {
                    if(idx === (data.genres.length -1))
                      return `${el.name}`
                    return `${el.name}, `
                }) : '-'
            }
        </p>
        {data.isLoggedIn ? isFav ? <Button variant="warning" onClick={handleFavToggle} data-movieid={data.id} data-title={data.title}>
          Remove from Favorite <BsHeartFill />
        </Button> : <Button variant="success" onClick={handleFavToggle} data-movieid={data.id} data-title={data.title}>
          Mark as Favorite <BsHeart />
        </Button> : <Link href="/login"><Button variant="primary">Login to mark favorite</Button></Link>
        }
    </div>
  );
}

export default MovieDetails;

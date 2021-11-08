import Head from "next/head";
import {
  Button,
} from "react-bootstrap";
import { useState } from "react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  useQuery,
  useMutation,
  gql,
} from "@apollo/client";
import { useRouter } from "next/router";

export const siteTitle = "MMDb | Movie Details";

const client = new ApolloClient({
  uri: "https://2e8ui9n2p8.execute-api.us-east-1.amazonaws.com/dev/graphql",
  cache: new InMemoryCache(),
});

function MovieDetails({ movieId }) {

  console.log(movieId);
  const FILMS_QUERY = gql`
query {
    movie(id: ${movieId}) {
      title,
      id,
      overview,
    }
  }
`;
  const { loading, error, data } = useQuery(FILMS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
    // if(data.movie.status){
    //   return (
    //     <div>
    //       <h2 className="title">{data.movie.title}</h2>
    //       <p className="description">{data.movie.overview}</p>
    //       <Button className="btn" onClick={favClickListner} data-id={data.movie.id} data-title={data.movie.title}>Remove favorite</Button>
    //     </div>
    //   );
    // }else {
      return (
        <div>
          <h2 className="title">{data.movie.title}</h2>
          <p className="description">{data.movie.overview}</p>
          <Button className="btn" onClick={favClickListner} data-id={data.movie.id} data-title={data.movie.title}>Add to favorite</Button>
        </div>
      );
    // }
}

export default function Movie() {
  const router = useRouter();
  let { movieId } = router.query;

  let [isFav, setIsFav] = useState(false);

  return (
                <div className="container">
                    
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className="row">
                        <div className="col-md-12">
      <ApolloProvider client={client} >
          <MovieDetails movieId={movieId} className="container"/>
      </ApolloProvider>
      </div>

        </div>
    </div>
  );
}

export async function toggleFav(movieId, title) {
  // let searchSlug = event.target.value
  const client = new ApolloClient({
      uri: 'https://2e8ui9n2p8.execute-api.us-east-1.amazonaws.com/dev/graphql',
      cache: new InMemoryCache()
  });
  
//   const MUTATION_QRY = gql`
// mutation {
// toggleFavorite(movieId: ${movieId}, userId: "1324", title: "${title}") {
//     status
//   }
// }
// `;
// const { loading, error, data } = useMutation(MUTATION_QRY);

const { data, loading, error } = await client.mutate({
  mutation: gql`
  mutation {
    toggleFavorite(movieId: ${movieId}, userId: "1324", title: "${title}") {
        status
      }
    }
  `
})

if (loading) return <p>Loading...</p>;
if (error) return <p>Error :(</p>;
  console.log(data.toggleFavorite.status);
      return {
        status:data.toggleFavorite.status
      }
}

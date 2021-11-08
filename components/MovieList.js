import MovieCard from "./MovieCard";

import styles from "../styles/MovieList.module.css";

const MovieList = ({ movies }) => (
  <div className={styles.grid}>
    {movies.map((movie) => {
        console.log(movie);
      return <MovieCard { ...movie } key={movie.id} />;
    })}
  </div>
);

export default MovieList;

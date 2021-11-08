import Link from 'next/link'
import Moment from 'react-moment';
import styles from "../styles/MovieList.module.css";

const favClickListner = () => {
    console.log('here');
    console.log(event);
}

const MovieCard = movie => (
    <div className={styles.card}>
        <Link key={movie.id} href="/movie/[id]" as={`/movie/${movie.id}`} className={styles.card}>
            <div>
                <h2>{ movie.title }</h2>
                <p className={styles.yearOfRelease}>Year of release:
                    <Moment format="YYYY">
                        { movie.release_date }
                    </Moment>
                </p>
            </div>
        </Link>
    </div>
  );
  
  export default MovieCard;
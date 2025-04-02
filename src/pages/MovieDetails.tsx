import { useEffect, useState, useContext, lazy, Suspense, ReactNode } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Movie } from "./Home.tsx";
import { FavoritesContext } from "../context/FavoritesContext.tsx";
import { AuthContext } from "../context/AuthContext.tsx";
import ReviewFrom from "../Components/ReviewFrom.tsx";
import { db } from "../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const TMDB_API_KEY = `521b418e6b0c0227a624515e80c9288a`;
const TMDB_API_URL = `https://api.themoviedb.org/3/movie`;

interface Review {
    movieId: number;
    review: string;
    userName: string;
    userId: number;
}

export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState<Movie>();
    const [reviews, setReviews] = useState<Review[]>([]);    const { user } = useContext(AuthContext);
    const LazyImage = lazy(() => import("../Components/LazyImage.tsx"));

    const favoritesContext = useContext(FavoritesContext);
    if (!favoritesContext) {
        throw new Error("FavoritesContext must be used within a FavoritesProvider");
    }
    const { setFavorite, favorites } = favoritesContext;

    useEffect(() => {
        axios.get(`${TMDB_API_URL}/${id}?api_key=${TMDB_API_KEY}`)
            .then((res) => setMovie(res.data));
    }, [id]);

    useEffect(() => {
        const reviewsRef = collection(db, "reviews");
        const q = query(reviewsRef, where("movieId", "==", parseInt(id ? id : '-1')));

        getDocs(q).then((snapshot) => {
            setReviews(snapshot.docs.map((doc) => doc.data() as Review));
        });
    }, [id]);

    if (!movie) {
        return <p>Loading...</p>;
    }

    const favButtonLabel = favorites.has(movie.id) ? "Remove from Favorites" : "Add to Favorites";
    const reviewForm = user && <ReviewFrom movieId={movie.id} />;
    const reviewDisplay = reviews.length > 0 && (
        <div className="p-4">
            <h1>Reviews</h1>
            {reviews.map((r, index) => (
                <p style={{ textAlign: 'right' }} key={index}>
                    <strong>{r.review}</strong>
                    <br />by: {r.userName}
                </p>
            ))}
        </div>
    );

    return (
        <Suspense fallback={(<div className="spinner"></div> as ReactNode)}>
            <div className="p-4">
                <LazyImage
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    className="w-64 rounded"
                    alt={movie.title}
                />
                <h1 className="text-2xl font-bold">{movie.title}</h1>
                <p>{movie.overview}</p>
                <p>{movie.vote_average}</p>
                <button
                    onClick={() => setFavorite(movie)}
                    className="bg-blue-500 text-white px-4 pt-2 rounded"
                >
                    {favButtonLabel}
                </button>
                <br />
                {reviewForm}
                <br />
                {reviewDisplay}
            </div>
        </Suspense>
    );
}

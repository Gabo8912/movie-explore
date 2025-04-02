import { Link } from "react-router-dom";
import { lazy } from "react";

const LazyImage = lazy(() => import("./LazyImage"));

interface MovieProps {
    id: number;
    title: string;
    poster: string;
    rating: number;
}

export default function MovieCard({ id, title, poster, rating }: MovieProps) {
    return (
        <div className="p-4 bg-gray-900 text-white rounded-lg">
            <LazyImage src={poster} alt={title} className="w-full rounded" />
            <h3 className="text-lg font-bold mt-2">
                <Link to={`/movie/${id}`}>
                    {title}
                </Link>
            </h3>
            <p>⭐ {rating}</p>
        </div>
    );
}

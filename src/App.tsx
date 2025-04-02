import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Navbar from './Components/Navbar';
import MovieDetails from './pages/MovieDetails.tsx';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './Components/ProtectedRoute.tsx';
import Favorites from './pages/Favorites';

export default function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/dashboard" element={
                    <ProtectedRoute><Dashboard /></ProtectedRoute>
                } />
                <Route path="/profile" element={
                    <ProtectedRoute><Profile /></ProtectedRoute>
                } />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/favorites" element={<Favorites />} /> {/* Nueva ruta */}
            </Routes>
        </div>
    );
}

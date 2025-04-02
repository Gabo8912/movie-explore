import {useContext,/*React*/ useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext.tsx";
import {FavoritesContext} from "../context/FavoritesContext.tsx";

export default function Navbar(){
        const [query, setQuery] = useState("");
        const navigate = useNavigate();
        const {logout, user} = useContext(AuthContext);
        const favorites = useContext(FavoritesContext);
        let authForm;

        if (user) {
            authForm = ([
                <Link to="/dashboard" key="dashboard">{user.email}</Link>,
                <p key="favorites">⭐Favorites: <Link to="/favorites">{favorites?.favorites.size ?? 0}</Link></p>,
                <form onSubmit={handleLogout} className="float-right md:float-left" key="logout-form">
                    <button type="submit" className="bg-blue-500 px-2 py-1 rounded">
                        🚪Logout
                    </button>
                </form>
            ]);
        }else {
            const signInForm =
                <form onSubmit={handleSignup}>
                    <button type="submit" className="bg-blue-500 px-2 py-1 rounded">
                        📑Sign Up
                    </button>
                </form>
            const loginForm =
                <form onSubmit={handleLogin}>
                    <button type="submit" className="bg-blue-500 px-2 py-1 rounded">
                        👤Login
                    </button>
                </form>
            authForm = [signInForm, loginForm];
        }



    function handleSearch(event: React.FormEvent){
            event.preventDefault();
            navigate('/search?q='+query); 
        }

        function handleSignup(event: React.FormEvent){
            event.preventDefault();
            navigate('/signup');
        }

        function handleLogin(event: React.FormEvent){
            event.preventDefault();
            navigate('/login');
        }

    async function handleLogout(event: React.FormEvent) {
        event.preventDefault();
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    }


    return (
        <nav className="flex gap-4 p-4 bg-gray-800 text-white items-end">
            <Link to="/"> Home </Link>
            <Link to="/search"> Search </Link>
            <Link to="/dashboard"> Dashboard </Link>
            <Link to="/profile"> Profile </Link>
            <form onSubmit = {handleSearch} className="flex gap-2">
                <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Movie..."
                className="px-2 py-1 rounded"
                />
                <button type="submit"
                className="bg-blue-50 px-2 py-1 rounded">
                    🔍
                </button>
            </form>
            {authForm}
        </nav>
    );
}





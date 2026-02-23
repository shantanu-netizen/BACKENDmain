import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Home() {
    const navigate = useNavigate();
    useEffect(() => {
        // check if login after mount
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);
    return (
        <div>
            <h1>Welcome to the Home Page</h1>
        </div>
    )
}
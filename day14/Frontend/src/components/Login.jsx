import axios from "axios";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import styles from './Login.module.css';
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { email, password };
        try {
            const response = await axios.post("http://localhost:4000/login", userData, { headers: { "Content-Type": "application/json" } });
            if (response.status === 200) {
                setMsg("Login successful!");
                // Store the token in localStorage and take token from header with comes with authorization key in the type of bearer token
                // backend code:  res.setHeader("Authorization", `Bearer ${token}`);
                console.log(response)
                localStorage.setItem("token", response.data.token);
                navigate("/");
            } else {
                setMsg("Login failed.");
            }
        } catch (error) {
            console.error(error);
            setMsg(error.response?.data?.message || "Login failed");
        }
    };
    return (
        <div className={styles.container}>
            {msg && <p className={styles.msg}>{msg}</p>}
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={styles.input}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>Login</button>
            </form>
        </div>
    )
}
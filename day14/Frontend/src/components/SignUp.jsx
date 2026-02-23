import React, { useState } from "react";
import styles from "./SignUp.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dob, setDob] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name === "name") setName(value);
        if (name === "username") setUsername(value);
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
        if (name === "dob") setDob(value);
        if (name === "phone") setPhone(value);
        if (name === "address") setAddress(value);
        if (name === "gender") setGender(value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = {
            name,
            username,
            email,
            password,
            dob,
            phone,
            address,
            gender,
        };
        // Send userData to the backend
        try {
            // Make the API call to send userData via axios using POST
            const response = await axios.post(
                "http://localhost:4000/register",
                userData,
                { headers: { "Content-Type": "application/json" } },
            );
              console.log(response.data);
            // Handle success or error message based on status code
            if (response.status === 201) {
                setMsg("Registration successful!");
                navigate("/login");
            } else {
                console.log(response.data);
                setMsg(response.data.error);
            }
        } catch (error) {
            console.error(error);
            setMsg(error.response?.data?.message || "Registration failed");
        }
    };
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => setShowPassword((s) => !s);

    return (
        <div className={styles.container}>
            {msg && <p className={styles.msg}>{msg}</p>}
            <h1>Sign Up</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={name}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
                <div className={styles.passwordContainer}>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={handleChange}
                        required
                        className={styles.input}
                        style={{ flex: 1 }}
                    />
                    <button
                        type="button"
                        onClick={toggleShowPassword}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className={styles.button}
                        style={{ marginLeft: 8, padding: "8px 10px" }}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>

                <input
                    type="date"
                    name="dob"
                    placeholder="Date of Birth"
                    value={dob}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={phone}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={address}
                    onChange={handleChange}
                    required
                    className={styles.input}
                />
                <select
                    name="gender"
                    value={gender}
                    onChange={handleChange}
                    required
                    className={styles.input}
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <button type="submit" className={styles.button}>
                    Sign Up
                </button>
            </form>
        </div>
    );
}
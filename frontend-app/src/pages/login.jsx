import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Login() {

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const navigate =
        useNavigate();

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            const response =
                await api.post(
                    "/auth/login",
                    {
                        email,
                        password
                    }
                );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(
                    response.data.user
                )
            );

            navigate("/jobs");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    }

    return (
        <div className="form-container">

            <h1>Login</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={
                        e =>
                        setEmail(e.target.value)
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={
                        e =>
                        setPassword(e.target.value)
                    }
                />

                <button>
                    Login
                </button>

            </form>

        </div>
    );
}
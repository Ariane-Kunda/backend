import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Register() {

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const navigate =
        useNavigate();

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            await api.post(
                "/auth/register",
                {
                    name,
                    email,
                    password
                }
            );

            alert(
                "Registration successful"
            );

            navigate("/login");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    }

    return (
        <div className="form-container">

            <h1>Create Account</h1>

            <form onSubmit={handleSubmit}>

                <input
                    placeholder="Full name"
                    value={name}
                    onChange={
                        e =>
                        setName(e.target.value)
                    }
                />

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
                    Register
                </button>

            </form>

        </div>
    );
}
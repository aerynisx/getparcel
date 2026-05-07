import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { showToast } = useToast();
  const navigate = useNavigate();

  const login = async () => {
    try {
    const res = await fetch(
      "http://127.0.0.1:8000/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
        showToast("success", "Login successful");

        setTimeout(() => {
          navigate("/dashboard");
        }, 800);
      } else {
        showToast("error", "Invalid credentials");
      }
    } catch (err) {
      showToast("error", "Server error");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFDEE6] flex flex-col items-center justify-center">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Admin Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="border w-full p-2 mb-4 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full p-2 mb-4 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="bg-[#FF6B8E] hover:opacity-80 text-white w-full py-2 rounded-lg"
        >
          Login
        </button>

      </div>

      <Link
          to="/"
          className="mt-6 text-[#FF6B8E] hover:underline font-medium"
        >
            Back
        </Link>

    </div>
  );
}
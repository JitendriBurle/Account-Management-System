import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/auth/signup",{
        name,
        email,
        password
      });

      login(res.data.token);

      navigate("/dashboard");

    } catch(err) {

      alert("Signup failed");

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-xl rounded-lg p-8 w-96">

        <h2 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e)=>setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold"
          >
            Signup
          </button>

        </form>

        <p className="text-center mt-4 text-gray-600">

          Already have an account?

          <Link
            to="/login"
            className="text-blue-500 ml-1 font-medium"
          >
            Login
          </Link>

        </p>

      </div>

    </div>

  );

};

export default Signup;
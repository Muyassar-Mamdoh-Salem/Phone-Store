import React, { useState } from "react";
import { useAuth } from "../assets/AuthContext";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    const result = await signup(email, password);

    if (result.success) {
      alert("Account created successfully");
      navigate("/login");
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FBF8EF] px-4 sm:px-6 md:px-10">
      <div className="bg-white p-6 md:p-10 rounded-xl shadow-xl w-full max-w-3xl">
        <h1 className="text-3xl text-[#80CBC4] font-semibold text-center mb-8">
          Create a New Account
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* First & Last Name */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="w-full md:w-1/2">
              <label className="block text-gray-700 text-lg font-medium">
                First Name:
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="w-full bg-[#FBF8EF] p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FA8912] text-lg"
                required
              />
            </div>

            <div className="w-full md:w-1/2">
              <label className="block text-gray-700 text-lg font-medium">
                Last Name:
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="w-full p-4 mt-2 bg-[#FBF8EF] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FA8912] text-lg"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-medium">
              Email Address:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="w-full p-4 mt-2 border bg-[#FBF8EF] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FA8912] text-lg"
              required
            />
          </div>

          {/* Password & Confirm */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="w-full md:w-1/2">
              <label className="block text-gray-700 text-lg font-medium">
                Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                minLength="6"
                className="w-full bg-[#FBF8EF] p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FA8912] text-lg"
                required
              />
            </div>

            <div className="w-full md:w-1/2">
              <label className="block text-gray-700 text-lg font-medium">
                Confirm Password:
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full bg-[#FBF8EF] p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FA8912] text-lg"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-[#80CBC4] text-white rounded-md hover:bg-[#68aca5] duration-300 focus:outline-none text-lg"
          >
            {loading ? "Registering..." : "Create Account"}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

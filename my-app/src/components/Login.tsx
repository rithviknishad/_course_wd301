import { navigate } from "raviger";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { login } from "../utils/apiUtils";
import { getAuthToken, setAuthToken } from "../utils/storageUtils";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await login({ username, password });
      setAuthToken(data.token);
      toast("Successfully logged in");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (getAuthToken()) navigate("/");
  }, []);

  return (
    <div className="w-full max-w-lg divide-y divide-gray-200">
      <h1 className="text-2xl my-2 text-gray-700">Login</h1>
      <form className="py-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-lg p-2 my-2 flex-1"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-lg p-2 my-2 flex-1"
          />
        </div>
        <div className="mb-4">
          <button
            className="w-full border-2 border-gray-200 rounded-lg p-2 my-2 flex-1"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

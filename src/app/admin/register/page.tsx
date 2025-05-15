'use client';
import React, { useRef } from 'react';
import { toast } from 'react-toastify';

const Page = () => {
  const emailRef = useRef<HTMLInputElement>(null!); 
  const passwordRef = useRef<HTMLInputElement>(null!); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        return toast.error(data.message || "Registration failed");
      }
  
      toast.success("Registration successful!");
      
  
    } catch (err) {
      console.error("Register error:", err);
      toast.error("Something went wrong!");
    }
  };
  

  return (
    <div className="flex items-center justify-center mt-32">
      <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-md w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-semibold text-center capitalize">Login</h2>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            ref={emailRef}
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            ref={passwordRef}
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 cursor-pointer text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Page;

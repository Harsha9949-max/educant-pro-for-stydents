
import React, { useState } from 'react';

interface LoginPageProps {
  onLogin: (username: string, dob: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [dob, setDob] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, dob);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary to-secondary p-4 relative overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/4 -translate-y-1/4 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full translate-x-1/4 translate-y-1/4 animate-pulse delay-500"></div>

      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-8 text-white z-10 animate-slideInUp">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight">EDUCANT PRO</h1>
          <p className="text-lg opacity-80 mt-2">Your Personal Learning Companion</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-2">
              Student Name
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your full name"
              className="w-full bg-white/20 border-2 border-white/30 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-white/50 transition duration-300 placeholder-white/60"
              required
            />
          </div>
          <div>
            <label htmlFor="dob" className="block text-sm font-medium mb-2">
              Date of Birth
            </label>
            <input
              id="dob"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full bg-white/20 border-2 border-white/30 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-white/50 transition duration-300 placeholder-white/60"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white text-primary font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-opacity-90 transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Access My Learning Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
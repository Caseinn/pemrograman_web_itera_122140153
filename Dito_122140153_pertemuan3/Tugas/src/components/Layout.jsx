import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white p-4 shadow">
      <nav className="flex gap-4 justify-center sm:justify-start">
  <Link to="/" className="text-lg hover:text-gray-400">Home</Link>
  <Link to="/stats" className="text-lg hover:text-gray-400">Stats</Link>
</nav>

      </header>

      <main className="flex-grow p-4">
        {children}
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>© 2025 Dito Rifki Irawan</p>
      </footer>
    </div>
  );
};

export default Layout;

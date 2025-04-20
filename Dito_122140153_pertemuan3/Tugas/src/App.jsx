import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import { BookProvider } from "./context/BookContext";
import Layout from "./components/Layout"; // Import the Layout component

export default function App() {
  return (
    <BookProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </BookProvider>
  );
}

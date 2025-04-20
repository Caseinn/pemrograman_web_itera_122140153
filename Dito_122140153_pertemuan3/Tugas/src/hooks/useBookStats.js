import { useMemo } from "react";
import { useBooks } from "../context/BookContext";

export const useBookStats = () => {
  const { books } = useBooks();

  return useMemo(() => ({
    total: books.length,
    own: books.filter(b => b.status === "Own").length,
    reading: books.filter(b => b.status === "Reading").length,
    wishlist: books.filter(b => b.status === "Wishlist").length
  }), [books]);  
};

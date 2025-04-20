import { useState } from "react";

export const useLocalStorage = (key, initial) => {
  const [stored, setStored] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? initial; }
    catch { return initial; }
  });

  const setValue = value => {
    setStored(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [stored, setValue];
};

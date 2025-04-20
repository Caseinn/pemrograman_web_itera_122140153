import { useBookStats } from "../hooks/useBookStats";

export default function Stats() {
  const stats = useBookStats(); 

  return (
    <ul className="space-y-1">
      {Object.entries(stats).map(([k, v]) => (
        <li key={k} className="flex justify-between border-b py-2">
          <span className="capitalize">{k}</span>
          <span>{v}</span>
        </li>
      ))}
    </ul>
  );
}

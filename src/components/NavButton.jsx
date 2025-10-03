import { useNavigate } from "react-router-dom";

export default function NavButton({ to, children }) {
  const navigate = useNavigate();

  //return (
  //  <button
  //    onClick={() => navigate(to)}
  //    className="px-4 py-2 bg-copper text-white rounded-lg shadow-md hover:bg-darkbrown transition transform hover:scale-105"
  //  >
  //    {children}
  //  </button>
  //);
  return(
    <button
  onClick={() => navigate(to)}
  className="btn btn-copper"
>
  {children}
</button>
  );
}

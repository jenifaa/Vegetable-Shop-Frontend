import { Link } from "react-router";

export default function Unauthorized() {
  return (
    <div>
      <h1>  authorized na....</h1>
      <Link to="/">Home</Link>
    </div>
  );
}
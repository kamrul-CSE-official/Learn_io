import { Link } from "react-router-dom";

let user = "";

export default function Home() {
  const sendUser = () => {
    user = document.getElementById("joinInput").value;
    document.getElementById("joinInput").value = "";
  };
  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-3">
      <h1 className="text-center text-2xl font-bold my-4">Login</h1>
      <input
        id="joinInput"
        type="text"
        placeholder="Type here"
        className="input input-bordered input-success w-full max-w-xs"
      />
      <Link
        onClick={(event) => (!user ? event.preventDefault() : null)}
        to="/chat"
      >
        <button onClick={sendUser} className="btn btn-primary">
          Login
        </button>
      </Link>
    </div>
  );
}

export { user };

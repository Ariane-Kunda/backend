import { Link } from "react-router-dom";

function NavBar() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  }

  return (
    <nav>
      <h2>JobBoard</h2>

      <Link to="/jobs">
        Jobs
      </Link>

      {!user && (
        <>
          <Link to="/login">
            Login
          </Link>

          <Link to="/register">
            Register
          </Link>
        </>
      )}

      {user && (
        <>
          {user.role === "admin" && (
            <Link to="/admin">
              Admin
            </Link>
          )}

          <button onClick={logout}>
            Logout
          </button>
        </>
      )}
    </nav>
  );
}

export default NavBar;
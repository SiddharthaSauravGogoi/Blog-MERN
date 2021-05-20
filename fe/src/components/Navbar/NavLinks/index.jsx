import React from "react";

export default function NavLinks({ Link, logOutUser, user }) {
  return (
    <nav>
      <Link to="/">
        <h2>MicroBlogs</h2>
      </Link>
      <ul className="nav-auth-links">
        {!user ? (
          <>
            <Link to="/login">LOGIN</Link>
            <Link to="/register">REGISTER</Link>{" "}
          </>
        ) : (
          <>
            <Link to="/create_blog" className="btn">
              New post
            </Link>
            <Link to="/dashboard"> DASHBOARD </Link>
            <div onClick={logOutUser} style={{ cursor: "pointer" }}>
              LOGOUT
            </div>
          </>
        )}
      </ul>
    </nav>
  );
}

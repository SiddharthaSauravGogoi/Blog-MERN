import React, { useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import NavLinks from "./NavLinks";

export default function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    } else {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [setUser]);

  const logOutUser = () => {
    localStorage.clear();
    setUser(null);
    history.push("/");
  };

  return <NavLinks Link={Link} logOutUser={logOutUser} user={user} />;
}

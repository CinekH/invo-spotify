import React, { useState } from "react";
import "./HomePage.scss";
import { auth } from "@/firebase";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';


export const HomePage: React.FC = () => {
  const [user, setUser] = useState<null | User>(null);
  const navigator = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user)
    }
  });

  const handleClick = () => {
    signOut(auth).then(() => {
      navigator(0);
    })
  }

  return (
    <div className="home">
      {user !== null ? (
        <>
          <p className="text-big home__text">Dzień dobry, ${user.email}</p>
          <button className="text-big home__button" onClick={handleClick}>Log out</button>
        </>
      ) : (
        <>
          <Link className="text-big home__button" to="/sign-in">Log in</Link>
          <Link className="text-big home__button" to="/sign-up">Register</Link>
        </>
      )}

    </div>
  );
};

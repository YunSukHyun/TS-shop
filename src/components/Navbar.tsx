import { Link } from "react-router-dom";
import { FaPencil } from "react-icons/fa6";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { login, logout, onUserStateChange } from "../api/firebasse";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import UserInfo from "./UserInfo";

const Navbar = () => {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
    });
  });

  return (
    <header className="flex justify-between border-b border-gray-300 p-2">
      <Link to="/" className="flex items-center text-4xl text-brand">
        <LiaShoppingBagSolid />
        <h1>Shop</h1>
      </Link>
      <nav className="flex items-center gap-4 font-semibold">
        <Link to="/products">Products</Link>
        <Link to="/carts">Carts</Link>
        <Link to="/products/new" className="text-2xl">
          <FaPencil />
        </Link>
        {user && <UserInfo user={user} />}
        <button onClick={!user ? login : logout}>
          {!user ? "Login" : "Logout"}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;

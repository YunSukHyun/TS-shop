import { Link } from "react-router-dom";
import { FaPencil } from "react-icons/fa6";
import { LiaShoppingBagSolid } from "react-icons/lia";
import UserInfo from "./UserInfo";
import Button from "./ui/Button";
import { useAuthContext } from "./context/AuthContext";

const Navbar = () => {
  const authContext = useAuthContext();
  if (!authContext) return <></>;
  const { user, login, logout } = authContext;
  return (
    <header className="flex justify-between border-b border-gray-300 p-2">
      <Link to="/" className="flex items-center text-4xl text-brand">
        <LiaShoppingBagSolid />
        <h1>Shop</h1>
      </Link>
      <nav className="flex items-center gap-4 font-semibold">
        <Link to="/products">Products</Link>
        <Link to="/carts">Carts</Link>
        {user && user.isAdmin && (
          <Link to="/products/new" className="text-2xl">
            <FaPencil />
          </Link>
        )}
        {user && <UserInfo user={user} />}
        <Button
          text={!user ? "Login" : "Logout"}
          onClick={!user ? login : logout}
        />
      </nav>
    </header>
  );
};

export default Navbar;

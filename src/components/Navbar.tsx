import { Link } from "react-router-dom";
import { FaPencil } from "react-icons/fa6";
import { LiaShoppingBagSolid } from "react-icons/lia";
const Navbar = () => {
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
        <button>Login</button>
      </nav>
    </header>
  );
};

export default Navbar;

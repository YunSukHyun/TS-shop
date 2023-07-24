import { useQuery } from "@tanstack/react-query";
import { BsCart4 } from "react-icons/bs";
import { getCart } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";
const CartStatus = () => {
  const { uid } = useAuthContext()!;
  const { data: products } = useQuery(["carts"], () => getCart(uid));
  return (
    <div className="relative">
      <BsCart4 className="text-4xl" />
      {products && (
        <p className="w-6 h-6 text-center bg-brand text-white font-bold rounded-full absolute -top-1 -right-2">
          {products.length}
        </p>
      )}
    </div>
  );
};

export default CartStatus;

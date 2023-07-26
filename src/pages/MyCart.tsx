import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { CartProduct } from "../pages/NewProduct";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaEquals } from "react-icons/fa6";
import CartItem from "../components/CartItem";
import PriceCard from "../components/PriceCard";
import Button from "../components/ui/Button";
import useCart from "../hooks/useCart";

const SHIPPING = 3000;
const MyCart = () => {
  const { uid } = useAuthContext()!;
  const {
    cartQuery: { isLoading, data: products },
  } = useCart();
  const cartProducts = products ? (products as CartProduct[]) : [];

  if (isLoading) return <p>Loading...</p>;
  const hasProducts = cartProducts && cartProducts.length > 0;
  const totalPrice =
    cartProducts &&
    cartProducts.reduce((prev, cur) => prev + cur.price * cur.quantity, 0);
  console.log(products);
  return (
    <section className="p-4 flex flex-col">
      <p className="text-2xl text-center font-bold pb-4 border-b">My Cart</p>
      {!hasProducts && (
        <p>
          장바구니에 상품이 없습니다.😕 <Link to="/procuts">상품 목록으로</Link>
        </p>
      )}
      {hasProducts && (
        <>
          <ul className="border-b border-gray-300 mb-8 p-4 px-8">
            {cartProducts &&
              cartProducts.map((product) => (
                <CartItem key={product.id} product={product} uid={uid} />
              ))}
          </ul>
          <div className="flex justify-between items-center mb-4 px-2 md:px-4 lg:px-8">
            <PriceCard text="배송액" price={totalPrice} />
            <BsFillPlusCircleFill className="shrink-0" />
            <PriceCard text="배송액" price={SHIPPING} />
            <FaEquals className="shrink-0" />
            <PriceCard text="총가격" price={totalPrice + SHIPPING} />
          </div>
          <Button text="주문하기" onClick={() => {}} />
        </>
      )}
    </section>
  );
};

export default MyCart;

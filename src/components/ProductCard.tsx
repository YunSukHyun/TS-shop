import { useNavigate } from "react-router-dom";

export type ProductCardProps = {
  product: {
    id: string;
    image: string;
    title: string;
    category: string;
    price: number;
  };
};

const ProductCard = ({
  product,
  product: { id, image, title, category, price },
}: ProductCardProps) => {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => {
        navigate(`/products/${id}`, { state: { product } });
      }}
      className="rounded-md shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105"
    >
      <img className="w-full" src={image} alt={title} />
      <div className="mt-2 px-2 text-lg flex justify-between items-center">
        <h3 className="truncate">{title}</h3>
        <p>{`₩${price}`}</p>
      </div>
      <p className="mb-2 px-2 text-gray-600">{category}</p>
    </li>
  );
};

export default ProductCard;

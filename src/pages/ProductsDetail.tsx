import { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/ui/Button";
import useCart from "../hooks/useCart";

const ProductsDetail = () => {
  const {
    state: {
      product: { id, image, title, description, category, price, options },
    },
  } = useLocation();
  const { addOrUpdateItem } = useCart();
  const [success, setSuccess] = useState("");
  const [selected, setSelected] = useState(options && options[0]);
  const handleSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };

  const handleClick = (e: React.FormEvent) => {
    const product = {
      id,
      image,
      title,
      price,
      option: selected,
      quantity: 1,
    };
    addOrUpdateItem.mutate(product, {
      onSuccess: () => {
        setSuccess("🛒 장바구니에 추가되었습니다.");
        setTimeout(() => {
          setSuccess("");
        }, 3000);
      },
    });
  };
  return (
    <>
      <p className="mx-12 mt-4 text-gray-700">{category}</p>
      <section className="flex flex-col md:flex-row p-4">
        <img
          className="w-full px-4 max-w-lg basis-7/12 self-center"
          src={image}
          alt={title}
        />
        <div className="w-full basis-5/12 flex flex-col p-4">
          <h2 className="text-3xl font-bold py-2">{title}</h2>
          <p className="text-2xl font-bold py-2 border-gray-300 border-b">
            ₩{price}
          </p>
          <p className="py-1 text-lg">{description}</p>
          <div className="flex item items-center">
            <label htmlFor="select" className="text-brand font-bold">
              옵션:
            </label>
            <select
              className="p-2 m-2 flex-1 border-2 border-dashed border-brand outline-none"
              id="select"
              onChange={handleSelected}
              value={selected}
            >
              {options &&
                options.map((option: string, idx: number) => (
                  <option key={idx}>{option}</option>
                ))}
            </select>
          </div>
          {success && <p className="my-2">{success}</p>}
          <Button text="장바구니 추가" onClick={handleClick} />
        </div>
      </section>
    </>
  );
};

export default ProductsDetail;

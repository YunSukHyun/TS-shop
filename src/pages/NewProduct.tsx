import React, { useState } from "react";
import { uploadImage } from "../api/uploader";
import Button from "../components/ui/Button";
import useProducts from "../hooks/useProducts";

export type Product = {
  id?: string;
  title: string;
  price: number;
  category: string;
  description: string;
  options: string;
};

export type CartProduct = {
  id: string;
  image: string;
  title: string;
  price: number;
  option: string;
  quantity: number;
};

const NewProduct = () => {
  const [product, setProduct] = useState<Product>({
    title: "",
    price: 0,
    category: "",
    description: "",
    options: "",
  });
  const [file, setFile] = useState<File | null>();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState("");
  const { addProduct } = useProducts();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    uploadImage(file as File)
      ?.then((url) => {
        addProduct.mutate(
          { product, url },
          {
            onSuccess: () => {
              setSuccess("성공적으로 제품이 추가되었습니다.");
              setTimeout(() => {
                setSuccess("");
              }, 4000);
            },
          }
        );
      })
      .finally(() => setIsUploading(false));
  };
  return (
    <section className="w-full text-center">
      <h2 className="text-2xl font-bold my-4">New Product enroll</h2>
      {success && <p className="my-2">✅ {success}</p>}
      {file && (
        <img
          className="w-96 mx-auto mb-2"
          src={URL.createObjectURL(file)}
          alt=""
        />
      )}
      <form className="flex flex-col px-12">
        <input
          type="file"
          accept="images/*"
          name="file"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="title"
          value={product.title ?? ""}
          placeholder="제품명"
          required
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          value={product.price ?? ""}
          placeholder="가격"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          value={product.category ?? ""}
          placeholder="카테고리"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={product.description ?? ""}
          placeholder="제품 설명"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="options"
          value={product.options ?? ""}
          placeholder="옵션들(콤마(,)로 구분)"
          required
          onChange={handleChange}
        />
        <Button
          text={isUploading ? "업로드 중..." : "제품 등록하기"}
          onClick={handleSubmit}
        />
      </form>
    </section>
  );
};

export default NewProduct;

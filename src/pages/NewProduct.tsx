import React, { useState } from "react";

type Product = {
  title: string;
  price: number;
  category: string;
  description: string;
  options: string;
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };
  const handleSubmit = (e: React.FormEvent) => {};
  return (
    <section>
      {file && <img src={URL.createObjectURL(file)} alt="" />}
      <form onSubmit={handleSubmit}>
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
      </form>
    </section>
  );
};

export default NewProduct;

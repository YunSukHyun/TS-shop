import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addNewProduct, getProducts } from "../api/firebase";
import { Product } from "../pages/NewProduct";

type addNewProductType = {
  product: Product;
  url: string;
};

const useProducts = () => {
  const queryClient = useQueryClient();
  const productsQuery = useQuery(["products"], getProducts, {
    staleTime: 1000 * 60,
  });
  const addProduct = useMutation(
    ({ product, url }: addNewProductType) => addNewProduct(product, url),
    {
      onSuccess: () => queryClient.invalidateQueries(["products"]),
    }
  );
  return { productsQuery, addProduct };
};

export default useProducts;

import React from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import useCartStore from "@/stores/cartStore";
import { toast } from "sonner";

const ProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.attributeValues.p_title.value || "Product",
      price: product.attributeValues.p_price.value || 0,
      quantity: 1,
      image: product.attributeValues.p_image.value.downloadLink,
    });
    toast("Added to Cart", {
      description: `${product.attributeValues.p_title.value} has been added to your cart.`,
      duration: 5000,
    });
  };
  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300 overflow-hidden group">
      <Link
        href={`/product/${product.id}`}
        className="relative w-full aspect-square bg-gray-50 flex items-center justify-center"
      >
        <img
          src={product.attributeValues.p_image.value.downloadLink}
          alt={product.attributeValues.p_title.value}
          className="object-contain w-full max-h-[330px] transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-col flex-1 p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold mb-1 text-gray-800 group-hover:text-purple-600 transition-colors duration-300 line-clamp-1">
            {product.attributeValues.p_title.value}
          </h3>
        </Link>
        <div
          className="text-gray-500 text-sm mb-2 line-clamp-2"
          dangerouslySetInnerHTML={{
            __html:
              product.attributeValues.p_description.value[0]?.htmlValue || "",
          }}
        />
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-purple-600">
            ${product.attributeValues.p_price.value}
          </span>
          <Button
            className="ml-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all duration-300"
            onClick={() => handleAddToCart(product)}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

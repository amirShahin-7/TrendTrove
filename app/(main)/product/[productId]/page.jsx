"use client";

import { useState, useEffect, use as usePromise } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import useCartStore from "@/stores/cartStore";
import { getProductDetails } from "@/actions/catalog/getProductDetails";
import ProductCatalog from "@/components/productCatalog";
import { getRelatedProducts } from "@/actions/catalog/getRelatedProducts";
import { toast } from "sonner";

export default function ProductDetailPage({ params }) {
  const unwrappedParams = usePromise(params);

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchData = async () => {
      if (!unwrappedParams?.productId) return;

      try {
        const productData = await getProductDetails(
          parseInt(unwrappedParams.productId)
        );
        setProduct(productData);

        if (
          productData?.productPages?.[0]?.pageId &&
          unwrappedParams.productId
        ) {
          const relatedProductsData = await getRelatedProducts(
            parseInt(productData.productPages[0].pageId, 10),
            parseInt(unwrappedParams.productId, 10)
          );
          setRelatedProducts(relatedProductsData);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [unwrappedParams?.productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.attributeValues.p_title.value || "Product",
        price: product.attributeValues.p_price.value,
        quantity: 1,
        image: product.attributeValues.p_image.value.downloadLink,
      });
      toast("Added to Cart", {
        description: `${product.attributeValues.p_title.value} has been added to your cart.`,
        duration: 5000,
      });
    }
  };

  if (isLoading) {
    return (
      <div className=" flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <Button
          className="mb-8 flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 shadow-lg text-white font-bold text-lg transition-all duration-300 hover:from-purple-700 hover:via-pink-600 hover:to-red-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400"
          onClick={() => router.back()}
        >
          Back
        </Button>

        {/* Product details */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative overflow-hidden rounded-lg ">
            <img
              src={product?.attributeValues?.p_image?.value?.downloadLink || ""}
              alt={product?.attributeValues?.p_title?.value || "Product Image"}
              className="object-contain w-full max-h-[400px] transition-transform duration-300 transform hover:scale-105"
            />
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
              {product?.attributeValues?.p_title?.value || "Product Title"}
            </h1>

            <p className="text-xl font-semibold text-gray-700">
              ${product?.attributeValues?.p_price?.value?.toFixed(2) || "0.00"}
            </p>
            <div
              className="text-gray-500"
              dangerouslySetInnerHTML={{
                __html:
                  product?.attributeValues?.p_description?.value?.[0]
                    ?.htmlValue || "",
              }}
            />

            <div className="flex space-x-4">
              <Button
                className="flex-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-semibold cursor-pointer"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <ProductCatalog
              title="Related Products"
              products={relatedProducts}
            />
          </section>
        )}
      </main>
    </div>
  );
}

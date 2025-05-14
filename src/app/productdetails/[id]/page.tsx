"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import ProductImageSlider from "@/components/ProductImageSlider/ProductImageSlider";
import Link from "next/link";
import TitleWithLine from "@/Shared/TitleWithLine/TitleWithLine";
import ProductCard from "@/Shared/ProductCard/ProductCard";
import Pagination from "@/components/Pagination/Pagination";

interface Product {
  _id: string;
  id: string;
  name: string;
  images: string[];
  description: string;
  discountPrice: number;
  regularPrice: number;
  category: string;
  code?: string;
}
interface CartItem {
  id: string;
  name: string;
  regularPrice: number;
  discountPrice: number;
  image: string;
  quantity: number;
}

const ProductDetails = () => {
  const params = useParams();
  const id = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"description" | "return">("description");
  const [deliveryCharge, setDeliveryCharge] = useState({
    insideDhaka: 0,
    outsideDhaka: 0,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  
// all products
  useEffect(() => {
    setLoading(true); // Add setLoading(true) here
    fetch(`http://localhost:5000/productdetails/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setProduct(null);
      })
      .finally(() => {
        setLoading(false); // Make sure setLoading(false) is called
      });
  }, [id]);


  // related products fetch
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!product?.category) return; // Ensure that product category exists
  
      try {
        const res = await fetch(`http://localhost:5000/products?category=${product.category}`);
        const data = await res.json();
  
        // Filter out the current product from the list of related products
        const filtered = data.filter((p: Product) => p._id !== id); // Exclude the current product
        setRelatedProducts(filtered); // Update the related products state
      } catch (err) {
        console.error("Failed to load related products:", err);
        setRelatedProducts([]); // Handle error scenario by setting an empty array
      }
    };
  
    if (product) fetchRelatedProducts();
  }, [product, id]); // Re-run when product or id changes
  

  // Fetch delivery charge
  useEffect(() => {
    const fetchDeliveryCharge = async () => {
      try {
        const res = await fetch("/api/updatedeliverycharge");
        const data = await res.json();
        if (data) {
          setDeliveryCharge(data);
        }
      } catch (error) {
        console.error("Failed to fetch delivery charge:", error);
      }
    };

    fetchDeliveryCharge();
  }, []);

  // paigenation
  const totalPages = Math.ceil(relatedProducts.length / productsPerPage);
  const paginatedProducts = relatedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  if (loading) {
    return (
      <div className="text-center py-10">
        <span className="loading loading-bars loading-xl text-red-500"></span>
      </div>
    );
  }

  if (!product) {
    return <div className="text-center py-10">প্রোডাক্ট পাওয়া যায়নি</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-32">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 mt-0">
        <ProductImageSlider images={product?.images} />

        <div className="flex flex-col justify-start space-y-4 mt-0 md:mt-1 lg:mt-6">
          <h1 className="text-2xl font-semibold">{product?.name}</h1>
          <div className="flex items-center space-x-4 ">
            <p className="text-3xl font-bold">
              Price:{" "}
              <span className="text-red-600 text-3xl font-bold">
                ৳ {product?.discountPrice}
              </span>
            </p>
            <span className="line-through text-gray-500">
              ৳ {product?.regularPrice}
            </span>
          </div>

          <Link
            href="/checkout"
            onClick={() => {
              const newProduct = {
                id,
                name: product?.name,
                regularPrice: product?.regularPrice,
                discountPrice: product?.discountPrice,
                image: product?.images[0] || "/placeholder.png",
                quantity: 1,
              };

              const existingCart: CartItem[] = JSON.parse(
                localStorage.getItem("checkoutCart") || "[]"
              );

              const existingIndex = existingCart.findIndex(
                (item) => item.id === newProduct.id
              );

              if (existingIndex !== -1) {
                existingCart[existingIndex].quantity += 1;
              } else {
                existingCart.push(newProduct);
              }

              localStorage.setItem(
                "checkoutCart",
                JSON.stringify(existingCart)
              );
            }}
            className="bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 md:py-3 px-6 rounded cursor-pointer text-center"
          >
            অর্ডার করুন
          </Link>
          <a
            href="https://wa.me/8801795072200"
            target="_blank"
            className="w-full text-center cursor-pointer bg-blue-100 text-black py-3 rounded shadow"
          >
            কল করতে ক্লিক করুন: 01795072200
          </a>
          <p className="font-bold">
            Code : <span className="font-medium">{product.code || "N/A"}</span>
          </p>
          <p className="font-bold">
            Category :{" "}
            <span className="font-medium">{product?.category || "N/A"}</span>
          </p>
          <div className="text-sm">
            <div className="flex justify-between border-t pt-3">
              <span>ঢাকায় ডেলিভারি খরচ</span>
              <span>৳ {deliveryCharge.insideDhaka}</span>
            </div>
            <div className="flex justify-between border-t pt-3">
              <span>ঢাকার বাইরে কুরিয়ার খরচ</span>
              <span>৳ {deliveryCharge.outsideDhaka}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8">
        <div className="flex space-x-4 border-b">
          <button
            onClick={() => setActiveTab("description")}
            className={`py-2 px-4 cursor-pointer ${activeTab === "description"
              ? "border-b-2 border-green-600 text-green-600 font-semibold"
              : "text-gray-500"
              }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("return")}
            className={`py-2 px-4 cursor-pointer ${activeTab === "return"
              ? "border-b-2 border-green-600 text-green-600 font-semibold"
              : "text-gray-500"
              }`}
          >
            Return Policy
          </button>
        </div>
        <div className="mt-4 bg-gray-50 p-4 rounded shadow text-sm leading-relaxed">
          {activeTab === "description" ? (
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          ) : (
            <div>
              <p>
                ১) উল্লিখিত ডেলিভারি চার্জ ১ কেজি পর্যন্ত ওজনের পণ্যের জন্য।
              </p>
              <p className="mt-2">
                ২) ছবি এবং বর্ণনার সাথে পণ্য মিলে থাকা সত্ত্বেও রিটার্ন করতে
                চাইলে কুরিয়ার চার্জ নিজ দায়িত্বে দিতে হবে।
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && ( // এখানে চেক করা হচ্ছে
        <div className="my-7">
          <TitleWithLine title="Related Products" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedProducts.map((item) => (
              <ProductCard
                key={item._id}
                id={item._id}
                name={item.name}
                regularPrice={item.regularPrice}
                discountPrice={item.discountPrice}
                image={item.images[0]}
              />
            ))}
          </div>

          {/* Pagination only if more than 40 */}
          {relatedProducts.length > 40 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      )}
      {relatedProducts.length === 0 && (
        <div className="my-7">
          <TitleWithLine title="Related Products" />
          <div className="text-center py-10">
            <p>No related products found</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;


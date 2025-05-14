"use client";
import useCategories from "@/hooks/useCategories";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";


// Define types for product and category
interface Product {
  _id: string;
  name: string;
  regularPrice: number;
  discountPrice: number;
  images: string[];
  category: string;
}

const AllCategoriesProducts = () => {
  const { categories } = useCategories();

  const [activeCategory, setActiveCategory] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/products`);
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (activeCategory) {
      const filtered = products.filter(
        (product) => product.category === activeCategory
      );
      setFilteredProducts(filtered);
    }
  }, [activeCategory, products]);

  useEffect(() => {
    if (categories.length > 0) {
      setActiveCategory(categories[0].name);
    }
  }, [categories]);

//  delete products
const handleDelete = async () => {
  if (!productToDelete) return;

  try {
    const response = await fetch(`http://localhost:5000/product/${productToDelete}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (response.ok) {
      // Remove the deleted product from both state arrays
      const updatedProducts = products.filter(product => product._id !== productToDelete);
      setProducts(updatedProducts);

      const updatedFiltered = filteredProducts.filter(product => product._id !== productToDelete);
      setFilteredProducts(updatedFiltered);

      // Close modal and reset state
      setIsModalOpen(false);
      setProductToDelete(null);

      // Optional: Show toast or alert
      toast.success("Product deleted successfully!");
    } else {
      toast.error(data.message || "Failed to delete the product");
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    toast.error("An error occurred while deleting the product");
  }
};


  const openDeleteModal = (id: string) => {
    setProductToDelete(id);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setProductToDelete(null);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="w-full px-4 md:px-8">
      <p className=" md:my-4 text-left text-lg md:text-2xl font-semibold">
      Product Management
      </p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => setActiveCategory(category.name)}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 cursor-pointer ${
              activeCategory === category.name
                ? "bg-[#0f766e] text-white shadow-sm"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="space-y-4">
        {filteredProducts.length === 0 ? (
          <div className="text-left text-gray-500">No products found</div>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="flex items-center bg-white rounded-lg shadow-md p-4 gap-4 hover:shadow-lg transition-shadow"
            >
              {/* Product Image */}
              <div className="relative w-20 h-20 shrink-0">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>

              {/* Product Info */}
              <div className="flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{product?.name}</h3>
                <p className=" font-bold">
                  ${product?.discountPrice ? product?.discountPrice : product?.regularPrice}
                </p>
                <span className="text-gray-500 text-sm">{product?.category}</span>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => openDeleteModal(product._id)}
                className="text-red-500 text-sm font-medium hover:underline cursor-pointer"
                aria-label={`Delete ${product?.name}`}
              >
                <MdDeleteOutline className="text-2xl"></MdDeleteOutline>
              </button>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full">
            <h3 className="text-lg font-semibold text-gray-800">Are you sure?</h3>
            <p className="text-gray-500 mb-4">This action cannot be undone.</p>
            <div className="flex justify-between">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCategoriesProducts;

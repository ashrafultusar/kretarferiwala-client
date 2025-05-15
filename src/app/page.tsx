import AllCategories from "@/components/AllCategories/AllCategories";
import AllProducts from "@/components/HomePage/AllProducts/AllProducts";

import Slider from "@/components/Slider/Slider";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen mt-16 md:mt-40 lg:mt-32">
     
      <div className="w-full">
        <Slider />
      </div>
      <AllCategories></AllCategories>
      <AllProducts></AllProducts>
    </div>
  );
}

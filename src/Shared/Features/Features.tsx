import { FC } from "react";
import { FaThumbsUp, FaHeadphones, FaTruck, FaLock } from "react-icons/fa";

import { ReactNode } from "react";

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <FaThumbsUp className="text-red-500 text-4xl" />,
    title: "হাই-কোয়ালিটি পণ্য",
    description: "Enjoy top quality items for less",
  },
  {
    icon: <FaHeadphones className="text-red-500 text-4xl" />,
    title: "24/7 লাইভ চ্যাট",
    description: "Get instant assistance whenever you need it",
  },
  {
    icon: <FaTruck className="text-red-500 text-4xl" />,
    title: "এক্সপ্রেস শিপিং",
    description: "Fast & reliable delivery options",
  },
  {
    icon: <FaLock className="text-red-500 text-4xl" />,
    title: "সিকিউর পেমেন্ট",
    description: "Multiple safe payment methods",
  },
];

const Features: FC = () => {
  return (
    <section className="bg-[#f8fdfa] py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="bg-red-100 rounded-full p-4 mb-4">
              {feature.icon}
            </div>
            <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;

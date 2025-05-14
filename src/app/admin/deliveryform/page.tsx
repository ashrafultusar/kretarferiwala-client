// 'use client'
// import { useState } from 'react';
// import { toast } from 'react-toastify';

// const DeliveryChargeForm = () => {
//   const [insideDhaka, setInsideDhaka] = useState<number>(70);
//   const [outsideDhaka, setOutsideDhaka] = useState<number>(150);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await fetch('http://localhost:5000/deliverycharges', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ insideDhaka, outsideDhaka }),
//       });

//       if (res.ok) {
//         toast.success('Delivery charges updated successfully!');
//       } else {
//         toast.error('Failed to update delivery charges');
//       }
//     } catch (err) {
//       toast.error('Error: ' + err);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label className="block mb-1 font-semibold">ঢাকার ভিতরে চার্জ *</label>
//         <input
//           type="number"
//           value={insideDhaka}
//           onChange={(e) => setInsideDhaka(Number(e.target.value))}
//           className="w-full border rounded-md p-2"
//         />
//       </div>
//       <div>
//         <label className="block mb-1 font-semibold">ঢাকার বাইরে চার্জ *</label>
//         <input
//           type="number"
//           value={outsideDhaka}
//           onChange={(e) => setOutsideDhaka(Number(e.target.value))}
//           className="w-full border rounded-md p-2"
//         />
//       </div>
//       <button
//         type="submit"
//         className="bg-blue-500 text-white font-semibold py-3 rounded-md w-full"
//       >
//         আপডেট করুন
//       </button>
//     </form>
//   );
// };

// export default DeliveryChargeForm;


'use client';
import { useState } from 'react';
import { toast } from 'react-toastify';

const DeliveryChargeForm = () => {
  const [insideDhaka, setInsideDhaka] = useState<number>(70);
  const [outsideDhaka, setOutsideDhaka] = useState<number>(150);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/deliverycharges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ insideDhaka, outsideDhaka }),
      });

      if (res.ok) {
        toast.success('Delivery charges updated successfully!');
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || 'Failed to update delivery charges');
      }
    } catch (err) {
      console.error('Error: ',err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-semibold">ঢাকার ভিতরে চার্জ *</label>
        <input
          type="number"
          value={insideDhaka}
          onChange={(e) => setInsideDhaka(Number(e.target.value))}
          className="w-full border rounded-md p-2"
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold">ঢাকার বাইরে চার্জ *</label>
        <input
          type="number"
          value={outsideDhaka}
          onChange={(e) => setOutsideDhaka(Number(e.target.value))}
          className="w-full border rounded-md p-2"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white font-semibold py-3 rounded-md w-full"
      >
        আপডেট করুন
      </button>
    </form>
  );
};

export default DeliveryChargeForm;

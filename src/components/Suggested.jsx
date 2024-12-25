import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';

const Suggested = () => {
  const [product, setProduct] = useState(null);

  const getRandomProductId = () => Math.floor(Math.random() * 20) + 1;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const randomId = getRandomProductId();
        const response = await axios.get(`https://dummyjson.com/products/${randomId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching the product:', error);
      }
    };

    fetchProduct();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <p className="text-center text-3xl p-4 text-[#f5deb3]">Suggested</p>
      <div className="flex flex-col gap-3 p-4 mt-10 text-black bg-[#f5deb3] rounded-xl w-[90%] max-w-[400px] md:max-w-[250px] rounded-tr-none relative mb-10">
        {product ? (
          <>
            {/* Title and Price */}
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold sm:text-xl">{product.title}</p>
              <div className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] bg-black text-[#f5deb3] p-2 flex items-center justify-center rounded-full rounded-tr-none">
                <p className="text-sm">${product.price}</p>
              </div>
            </div>

            {/* Discount Badge */}
            <div className="bg-red-600 h-[60px] w-[60px] sm:h-[70px] sm:w-[70px] text-white flex justify-center items-center rounded-full absolute top-[-8%] left-[-2%]">
              {product.discountPercentage}% off
            </div>

            {/* Product Image */}
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-[180px] sm:h-[200px] object-contain rounded-lg"
            />

            {/* Brand and Category */}
            <div className="flex gap-2 justify-center mt-3 text-sm sm:text-base">
              <p className="font-bold border-r-2 pr-2 border-black">{product.brand}</p>
              <p>{product.category}</p>
            </div>

            {/* Description */}
            <p className="mt-3 text-sm sm:text-base text-center">{product.description}</p>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center mt-4">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "black",
                  color: "#f5deb3",
                  fontWeight: "bold",
                  borderRadius: "15px",
                  width: "100px",
                }}
              >
                ADD
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "black",
                  color: "black",
                  fontWeight: "bold",
                  borderWidth: 2,
                  borderRadius: "15px",
                  width: "100px",
                }}
              >
                VIEW
              </Button>
            </div>
          </>
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Suggested;

import { useEffect, useState } from "react";
import Nav2 from "../components/Nav2";
import axios from "axios";
import { Button, Typography, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [flippedProductId, setFlippedProductId] = useState(null);
  const [loading, setLoading] = useState(true); // Loader state
  const [page, setPage] = useState(1); // Page state to control pagination
  const navigate = useNavigate();

  const handleNext = () => {
    setPage(2);
  };

  const handlePrev = () => {
    setPage(1);
  };

  const cart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to the cart");
  };

  const find = (name) => {
    if (!name) {
      setProducts(originalProducts);
    } else {
      const filtered = originalProducts.filter((product) =>
        product.title.toLowerCase().includes(name.toLowerCase())
      );
      setProducts(filtered);
    }
  };

  const filter = (range) => {
    if (!range) {
      setProducts(originalProducts);
      return;
    }

    const filtered = originalProducts.filter((product) => {
      if (range === "under-1000") {
        return product.price < 100;
      } else if (range === "1000-5000") {
        return product.price >= 100 && product.price <= 2000;
      } else if (range === "5000-10000") {
        return product.price > 2000 && product.price <= 3000;
      } else if (range === "above-10000") {
        return product.price > 3000;
      }
      return true;
    });

    setProducts(filtered);
  };

  useEffect(() => {
    const getProducts = async () => {
      let array = [];
      for (let i = 1; i <= 30; i++) {
        try {
          const response = await axios.get(`https://dummyjson.com/products/${i}`);
          array.push(response.data);
        } catch (error) {
          console.error("Can't fetch products", error);
        }
      }
      setOriginalProducts(array);
      setProducts(array.slice(0, 15)); // Initially show products 1-15
      setLoading(false); // Hide loader once data is fetched
    };
    getProducts();
  }, []);

  useEffect(() => {
    // Change products based on page state
    if (page === 1) {
      setProducts(originalProducts.slice(0, 15));
    } else if (page === 2) {
      setProducts(originalProducts.slice(15, 30));
    }
  }, [page, originalProducts]);

  const toggleFlip = (id) => {
    setFlippedProductId((prevId) => (prevId === id ? null : id));
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.6,
        type: "spring",
      },
    }),
  };

  return (
    <div className="flex flex-col items-center">
      <Nav2 />
      <div className="w-[66%] py-7">
        {/* Search Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
          <div className="p-1">
            <Typography variant="h3" className="mb-4">
              Have a <span className="text-[#f5deb3]">Fixed Budget</span>? Got your back.
            </Typography>

            <div className="flex items-start gap-4 mt-14">
              {/* Dropdown for price range */}
              <select
                className="bg-slate-200 p-2 rounded-xl text-slate-700 w-[300px]"
                defaultValue=""
                onChange={(e) => filter(e.target.value)}
              >
                <option value="" disabled>
                  Select your price range
                </option>
                <option value="under-1000">Under $100</option>
                <option value="1000-5000">$100 - $2,000</option>
                <option value="5000-10000">$2,000 - $3,000</option>
                <option value="above-10000">Above $3,000</option>
              </select>
            </div>
          </div>

          <div className="p-3 col-span-2 h-[40vh]">
            <div
              style={{
                backgroundImage: "url('./back4.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="h-full flex items-center justify-center rounded-2xl"
            >
              <div className="flex gap-3 w-[70%]">
                <input
                  value={searchItem}
                  onChange={(e) => {
                    setSearchItem(e.target.value);
                    find(e.target.value);
                  }}
                  placeholder="Search for products"
                  className={`font-dark p-4 opacity-80 rounded-xl w-[80%] ${
                    searchItem ? "text-blue-950" : "text-black"
                  }`}
                />
                <Button
                  onClick={() => find(searchItem)}
                  variant="contained"
                  sx={{
                    width: "5%",
                    borderRadius: "50%",
                    backgroundColor: "whitesmoke",
                  }}
                >
                  <img src="./search.png" alt="search" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <p className="mt-20 text-center text-3xl">OUR PRODUCTS</p>

        {/* Loader */}
        {loading ? (
          <div className="flex justify-center items-center mt-10">
            <CircularProgress size={60} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-10 text-[#f5deb3]">
            {products && products.length > 0 ? (
              products.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="relative w-full h-[300px] bg-black rounded-lg shadow-lg border-2 border-[#f5deb3] overflow-hidden"
                  style={{ perspective: 1000 }}
                  onClick={() => toggleFlip(product.id)}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={cardVariants}
                >
                  <motion.div
                    className="absolute w-full h-full"
                    initial={{ rotateY: 0 }}
                    animate={{
                      rotateY: flippedProductId === product.id ? 180 : 0,
                    }}
                    transition={{ duration: 0.8 }}
                    style={{
                      transformStyle: "preserve-3d",
                      position: "relative",
                    }}
                  >
                    {/* Front Side of Card */}
                    <div
                      className={`absolute w-full h-full flex flex-col items-center justify-center p-4 text-white`}
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <Typography variant="h6" sx={{ textAlign: "center" }}>
                        {product.title}
                      </Typography>
                      <Typography variant="body1" sx={{ color: "white" }}>
                        ${product.price}
                      </Typography>
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-[150px] object-contain mt-2"
                      />
                      <div className="flex gap-3 justify-center text-white mt-2">
                        <p className="font-bold border-r-2 px-2 border-white">
                          {product.brand}
                        </p>
                        <p>{product.category}</p>
                      </div>
                    </div>

                    {/* Back Side of Card */}
                    <div
                      className={`absolute w-full h-full flex flex-col items-center justify-center p-4`}
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <Typography variant="body2">
                        {product.description}
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={() => cart(product)}
                        sx={{
                          marginTop: "10px",
                          backgroundColor: "#f5deb3",
                          color: "black",
                        }}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              ))
            ) : (
              <p className="text-center col-span-full text-xl">
                No products found.
              </p>
            )}
          </div>
        )}

        {/* Pagination Buttons */}
        <div className="flex justify-center items-center gap-10 my-10">
          <Button
            onClick={handlePrev}
            variant="contained"
            disabled={page === 1}
            sx={{
              backgroundColor: "#f5deb3",
              color: "black",
              "&:hover": { backgroundColor: "#e3c99c" },
            }}
          >
            Previous
          </Button>
          <Typography>{page}</Typography>
          <Button
            onClick={handleNext}
            variant="contained"
            disabled={page === 2}
            sx={{
              backgroundColor: "#f5deb3",
              color: "black",
              "&:hover": { backgroundColor: "#e3c99c" },
            }}
          >
            Next
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Products;

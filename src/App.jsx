import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import "./App.css";
import Navbar from "./components/Navbar";
import Button from "@mui/material/Button";
import Slider from "./components/Slider";

function App() {
  const navigate = useNavigate(); // Hook for programmatic navigation

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 justify-center items-center mt-[80px] p-5">
        {/* Left Section */}
        <div className="flex flex-col gap-5 text-center lg:text-left">
          <Typography variant="h3" className="text-lg lg:text-3xl">
            Welcome to{" "}
            <span className="text-[#f5deb3] font-bold">Basket.</span>
            <br />
            the best E-commerce platform
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "#f8e9d8c8" }}
            className="text-sm lg:text-base"
          >
            Get products across multiple collections and items.
            <br />
            Add to cart, buy, and flow with the trend.
          </Typography>
          <div className="mt-10 flex flex-col lg:flex-row gap-5 lg:gap-10">
            {/* Sign Up Button */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#f5deb3",
                color: "black",
                fontWeight: "bold",
              }}
              onClick={() => navigate("/signin")} // Navigate to Signup page
              className="w-full lg:w-auto"
            >
              Sign Up
            </Button>
            {/* Log In Button */}
            <Button
              variant="outlined"
              sx={{
                borderColor: "#f5deb3",
                color: "#f5deb3",
                fontWeight: "bold",
              }}
              onClick={() => navigate("/login")} // Navigate to Login page
              className="w-full lg:w-auto"
            >
              Log In
            </Button>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-[30%]">
          <Slider />
        </div>
      </div>
    </>
  );
}

export default App;

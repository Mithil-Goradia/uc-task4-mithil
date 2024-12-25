import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import Swal from 'sweetalert2';

const Footer = () => {
  return (
    <div className="bg-[#f0d9ae] text-black w-full p-4 flex flex-col items-center justify-center mt-20">
      {/* Contact Section */}
      <div className="bg-black text-white relative top-[-40px] p-6 rounded-xl max-w-[90%] lg:w-[600px] flex flex-col items-center gap-4">
        <p className="text-[#f0d9ae] font-bold text-lg sm:text-xl text-center">
          We are here for anything you need!
        </p>
        <div className="bg-[#f0d9ae] w-full rounded-lg p-2 flex flex-col sm:flex-row items-center gap-2">
          <input
            type="text"
            placeholder="Enter your email and we will reach back"
            className="flex-1 p-2 bg-[#f0d9ae] rounded-lg text-sm sm:text-base focus:outline-none"
          />
          <button
            className="w-full sm:w-[100px] h-[40px] rounded-lg bg-black text-[#f0d9ae] text-sm sm:text-base font-bold"
            onClick={() => {
              Swal.fire({
                title: "Sweet!",
                text: "We will get back to you",
                imageUrl: "./ok.png",
                imageWidth: 400,
                imageHeight: 300,
                imageAlt: "Custom image",
                customClass: {
                  container: "swal2-container",
                },
                willOpen: () => {
                  const swalContainer = document.querySelector('.swal2-container');
                  swalContainer.style.zIndex = 9999; // Ensure alert is on top
                },
              });
            }}
          >
            Send
          </button>
        </div>
      </div>

      {/* Links Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-14 mt-14 w-full max-w-[600px]">
        {/* Icon */}
        <BubbleChartIcon
          sx={{
            display: { xs: "none", md: "flex" },
            fontSize: "4rem",
            color: "black",
          }}
        />

        {/* Link Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {/* Column 1 */}
          <div className="flex flex-col items-center md:items-start border-b-2 md:border-b-0 md:border-r-2 border-black p-2">
            <p className="font-bold">Your Account</p>
            <p className="text-sm mt-1">Your Cart</p>
            <p className="text-sm mt-1">Your Liked</p>
          </div>
          {/* Column 2 */}
          <div className="flex flex-col items-center md:items-start border-b-2 md:border-b-0 md:border-r-2 border-black p-2">
            <p className="font-bold">New Launches</p>
            <p className="text-sm mt-1">Trending</p>
            <p className="text-sm mt-1">Suggestions</p>
          </div>
          {/* Column 3 */}
          <div className="flex flex-col items-center md:items-start p-2">
            <p className="font-bold">Home</p>
            <p className="text-sm mt-1">Products</p>
            <p className="text-sm mt-1">Cart</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

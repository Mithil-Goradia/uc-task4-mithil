import transit from './transit';
import Nav2 from '../components/Nav2';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';

const Reviews = () => {
  const [review, setReview] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 8; // Number of reviews per page

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/comments?limit=${reviewsPerPage}&skip=${(currentPage - 1) * reviewsPerPage}&select=body,postId`
        );
        setReview(response.data);
      } catch (error) {
        console.error('Error in fetching the reviews', error);
      }
    };
    fetchReviews();
  }, [currentPage]);

  return (
    <div className="flex flex-col items-center">
      <Nav2 />
      <h2 className="text-2xl font-bold mb-4 text-[#f5deb3] text-center pt-4">Reviews</h2>
      <div className="bg-black rounded-xl mb-2 p-3 grid grid-cols-2 gap-3">
        {review?.comments ? (
          review.comments.map((comment) => (
            <div
              key={comment.postId}
              className="mb-2 p-3 border-b border-gray-300 bg-[#f5deb3] rounded-md backdrop-blur-xl"
            >
              <p className="text-gray-900 font-bold">{comment.user?.username || 'Anonymous'}</p>
              <p className="text-gray-800">{comment.body}</p>
              <small className="text-gray-500">Post ID: {comment.postId}</small>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Loading reviews...</p>
        )}
      </div>
      <div className="flex justify-center mt-1 space-x-3 mb-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-[#f5deb3] text-black rounded-md disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-gray-800 font-bold">{currentPage}</span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 bg-[#f5deb3] text-black rounded-md disabled:opacity-50"
          disabled={review?.comments.length < reviewsPerPage}
        >
          Next
        </button>
      </div>
    <Footer/>
    </div>
  );
};

export default transit(Reviews);

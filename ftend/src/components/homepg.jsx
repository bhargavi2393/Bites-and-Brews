import React, { useEffect, useState, useContext } from 'react';
import Nav from './nav';
import './homepg.css';
import API from '../auth';
import { AuthContext } from './authcontext';

function Home() {
  const [reviews, setReviews] = useState([]);
  const [expandedCards, setExpandedCards] = useState([]);
  const { uid } = useContext(AuthContext);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await API.get(`/r/all`);
        setReviews(res.data.data);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };

    if (uid) {
      fetchReviews();
    }
  }, [uid]);

  const toggleCard = (id) => {
    setExpandedCards(prev =>
      prev.includes(id) ? prev.filter(cardId => cardId !== id) : [...prev, id]
    );
  };

  const formatTimeAgo = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMs = now - created;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    return `${diffDays} days ago`;
  };

  return (
    <div className="hm">
      <Nav />
      <div className="flex flex-wrap justify-center gap-x-10 gap-y-10 mt-10">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="self-start w-[300px] bg-white border border-gray-300 rounded-lg shadow-md"
          >
            <img
              className="h-[200px] w-full object-cover rounded-t-lg"
              src={`http://localhost:3000/api/v1/r/image/${review.image}`}
              alt={review.resname}
            />
            <div className="p-5">
              <h5 className="resname mb-2 text-xl font-bold tracking-tight text-gray-900">
                {review.resname}
              </h5>

              <div className="flex items-center gap-2">
                <i className="bx bx-heart"></i>
                <i className="bx bx-message-square-dots"></i>
                <i
                  className="bx bx-dots-horizontal-rounded cursor-pointer"
                  onClick={() => toggleCard(review._id)}
                ></i>
                <h4 className="dd ml-auto text-xs text-gray-500">
                  {formatTimeAgo(review.createdAt)}
                </h4>
              </div>

              {expandedCards.includes(review._id) && (
                <div className=" it mt-3 text-sm text-gray-700 border-t pt-2">
                  <p><strong>Area:</strong> {review.area}</p>
                  <p><strong>City:</strong> {review.city}</p>
                  <p><strong>Food Tried:</strong> {review.food}</p>
                  <p><strong>Review:</strong> {review.reviewContent}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

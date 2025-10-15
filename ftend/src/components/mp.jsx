import React, { useEffect, useState, useContext } from 'react';
import './mp.css';
import Nav from './nav';
import API from '../auth';
import { AuthContext } from './authcontext';

function Mpage() {
  const [userPosts, setUserPosts] = useState([]);
  const [expandedCards, setExpandedCards] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editData, setEditData] = useState({});
  const { uid } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await API.get(`/r/user/${uid}`);
        setUserPosts(res.data.data);
      } catch (err) {
        console.error("Failed to fetch user posts:", err);
      }
    };

    if (uid) {
      fetchUserPosts();
    }
  }, [uid]);

  const toggleCard = (id) => {
    setExpandedCards(prev =>
      prev.includes(id) ? prev.filter(cardId => cardId !== id) : [...prev, id]
    );
  };

  const handleEditClick = (review) => {
    setEditingPostId(review._id);
    setEditData({
      area: review.area,
      city: review.city,
      food: review.food,
      reviewContent: review.reviewContent,
    });
  };

  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = async (postId) => {
    try {
      await API.put(`/r/update/${postId}`, editData); // Make sure this route exists in backend
      const updatedPosts = userPosts.map(post =>
        post._id === postId ? { ...post, ...editData } : post
      );
      setUserPosts(updatedPosts);
      setEditingPostId(null);
    } catch (err) {
      console.error('Failed to update post:', err);
    }
  };

  const handleCancel = () => {
    setEditingPostId(null);
    setEditData({});
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
    <div>
      <Nav />
      <div className=" tt text-center mt-8 text-2xl font-semibold">Your posts so far...</div>
      <div className="flex flex-wrap justify-center gap-x-10 gap-y-10 mt-10">
        {userPosts.map((review) => {
          const isExpanded = expandedCards.includes(review._id);
          const isEditing = editingPostId === review._id;

          return (
            <div
              key={review._id}
              className="self-start w-[300px] bg-white border border-gray-300 rounded-lg shadow-md"
            >
              <img
                className="  h-[200px] w-full object-cover rounded-t-lg"
                src={`http://localhost:3000/api/v1/r/image/${review.image}`}
                alt={review.resname}
              />
              <div className="p-5">
                <h5 className=" resn mb-2 text-xl font-bold tracking-tight text-gray-900">
                  {review.resname}
                </h5>

                <div className="flex items-center gap-2">
                  <i className="bx bx-heart"></i>
                  <i className="bx bx-message-square-dots"></i>
                  <i
                    className="bx bx-dots-horizontal-rounded cursor-pointer"
                    onClick={() => toggleCard(review._id)}
                  ></i>
                  <h4 className="ml-auto text-xs text-black-500">
                    {formatTimeAgo(review.createdAt)}
                  </h4>
                </div>

                {isExpanded && (
                  <div className=" it mt-3 text-sm text-gray-700 border-t pt-2">
                    {isEditing ? (
                      <>
                        <p>
                          <strong>Area:</strong>{' '}
                          <input
                            name="area"
                            value={editData.area}
                            onChange={handleInputChange}
                            className="border rounded p-1 w-full"
                          />
                        </p>
                        <p>
                          <strong>City:</strong>{' '}
                          <input
                            name="city"
                            value={editData.city}
                            onChange={handleInputChange}
                            className="border rounded p-1 w-full"
                          />
                        </p>
                        <p>
                          <strong>Food Tried:</strong>{' '}
                          <input
                            name="food"
                            value={editData.food}
                            onChange={handleInputChange}
                            className="border rounded p-1 w-full"
                          />
                        </p>
                        <p>
                          <strong>Review:</strong>{' '}
                          <textarea
                            name="reviewContent"
                            value={editData.reviewContent}
                            onChange={handleInputChange}
                            className="border rounded p-1 w-full"
                          />
                        </p>
                        <div className="flex justify-end mt-2 gap-2">
                          <button
                            onClick={() => handleSave(review._id)}
                            className=" b px-3 py-1 bg-green-500 text-white rounded"
                          >
                            Update
                          </button>
                          <button
                            onClick={handleCancel}
                            className=" b px-3 py-1 bg-gray-400 text-white rounded"
                          >
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <p><strong>Area:</strong> {review.area}</p>
                        <p><strong>City:</strong> {review.city}</p>
                        <p><strong>Food Tried:</strong> {review.food}</p>
                        <p><strong>Review:</strong> {review.reviewContent}</p>
                        <i
                          className=" edit bx bxs-edit-alt cursor-pointer"
                          onClick={() => handleEditClick(review)}
                        ></i>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Mpage;

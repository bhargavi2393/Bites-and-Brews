import React, { useState, useContext } from "react";
import Nav from "./nav";
import './add.css';
import API from '../auth'; // Ensure the path is correct
import { AuthContext } from "./authcontext"; // To get user ID

function Add() {
  const [image, setImage] = useState(null);
  const [resname, setresname] = useState("");
  const [location, setLocation] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [food, setFood] = useState("");
  const [reviewContent, setReviewContent] = useState("");

  const { uid } = useContext(AuthContext); // Get the logged-in user's UID

  const handleSubmit = async () => {
    if (!image || !resname || !location || !area || !city || !food || !reviewContent) {
      alert("Please fill all fields");
      return;
    }

    console.log(uid); // Debugging line to check if the UID is being fetched correctly

    const formData = new FormData();
    formData.append("image", image);
    formData.append("resname", resname);
    formData.append("location", location);
    formData.append("area", area);
    formData.append("city", city);
    formData.append("food", food);
    formData.append("reviewContent", reviewContent);
    formData.append("userId", uid || "123"); // Use logged-in user's ID or fallback for testing

    try {
      const res = await API.post("/r/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        alert("Review Added Successfully!");
      } else {
        alert("Failed to add review");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <Nav />
      <h2>Adding New Review</h2>
      <div className="connn">
        <label className="imgl">Upload Image:</label>
        <input className="i" type="file" onChange={(e) => setImage(e.target.files[0])} />
        <input className="i" type="text" placeholder="Restaurant Name..." onChange={(e) => setresname(e.target.value)} />
        <input className="i" type="text" placeholder="Exact Location..." onChange={(e) => setLocation(e.target.value)} />
        <input className="i" type="text" placeholder="Area..." onChange={(e) => setArea(e.target.value)} />
        <input className="i" type="text" placeholder="City..." onChange={(e) => setCity(e.target.value)} />
        <input className="i" type="text" placeholder="Food Item..." onChange={(e) => setFood(e.target.value)} />
        <textarea className="i" placeholder="Write an honest review..." onChange={(e) => setReviewContent(e.target.value)} />
        <button className="bttn" onClick={handleSubmit}>ADD REVIEW</button>
      </div>
    </div>
  );
}

export default Add;

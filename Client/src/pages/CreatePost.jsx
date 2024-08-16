import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";
import { createPost } from "../services/api";
import { AuthContext } from "../context/AuthContext";

const CreatePost = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleSubmit = async (postData) => {
    try {
      await createPost(postData);
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Create New Stories</h1>
      <PostForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreatePost;

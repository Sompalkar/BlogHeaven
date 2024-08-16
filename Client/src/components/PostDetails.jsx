import React from "react";

const PostDetail = ({ post }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-semibold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-4">By {post.author.username}</p>
      <div className="prose">{post.content}</div>
    </div>
  );
};

export default PostDetail;

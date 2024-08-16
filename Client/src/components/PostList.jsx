import React from 'react';
import { Link } from 'react-router-dom';

const PostList = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <div key={post._id} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2 text-indigo-700">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.content.substring(0, 100)}...</p>
            <Link to={`/post/${post._id}`} className="text-indigo-600 hover:text-indigo-800 font-semibold">
              Read more
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
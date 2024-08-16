// import React, { useState, useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import { getUserPosts, deletePost } from '../services/api';

// const ProfilePage = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { user } = useContext(AuthContext);

//   useEffect(() => {
//     const fetchUserPosts = async () => {
//       try {
//         const response = await getUserPosts();
//         setPosts(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching user posts:', error);
//         setLoading(false);
//       }
//     };

//     fetchUserPosts();
//   }, []);

//   const handleDeletePost = async (postId) => {
//     try {
//       await deletePost(postId);
//       setPosts(posts.filter(post => post._id !== postId));
//     } catch (error) {
//       console.error('Error deleting post:', error);
//     }
//   };

//   if (loading) {
//     return <div className="text-center text-2xl mt-8">Loading...</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <div className="mb-8 text-center">
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//         </svg>
//         <h1 className="text-3xl font-bold text-gray-900">{user.username}</h1>
//       </div>
//       <div className="mb-8">
//         <h2 className="text-2xl font-semibold mb-4 text-gray-900">Your Stories</h2>
//         {posts.length === 0 ? (
//           <p className="text-gray-600">You haven't written any stories yet.</p>
//         ) : (
//           <div className="space-y-6">
//             {posts.map((post) => (
//               <div key={post._id} className="border-b border-gray-200 pb-6">
//                 <h3 className="text-xl font-semibold mb-2 text-gray-900">{post.title}</h3>
//                 <p className="text-gray-600 mb-4">{post.content.substring(0, 150)}...</p>
//                 <div className="flex justify-between items-center">
//                   <Link to={`/post/${post._id}`} className="text-green-600 hover:text-green-700 font-semibold">
//                     Read more
//                   </Link>
//                   <button
//                     onClick={() => handleDeletePost(post._id)}
//                     className="text-red-600 hover:text-red-700 font-semibold"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getUserPosts, deletePost } from "../services/api";

const ProfilePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await getUserPosts();
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user posts:", error);
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, []);

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEditPost = (postId) => {
    navigate(`/edit-post/${postId}`);
  };

  if (loading) {
    return <div className="text-center text-2xl mt-8">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 mx-auto mb-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <h1 className="text-3xl font-bold text-gray-900">{user.username}</h1>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          Your Stories
        </h2>
        {posts.length === 0 ? (
          <p className="text-gray-600">You haven't written any stories yet.</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post._id} className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {post.content.substring(0, 150)}...
                </p>
                <div className="flex justify-between items-center">
                  <Link
                    to={`/post/${post._id}`}
                    className="text-green-600 hover:text-green-700 font-semibold"
                  >
                    Read more
                  </Link>
                  <div className="space-x-4">
                    <button
                      onClick={() => handleEditPost(post._id)}
                      className="text-blue-600 hover:text-blue-700 font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePost(post._id)}
                      className="text-red-600 hover:text-red-700 font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

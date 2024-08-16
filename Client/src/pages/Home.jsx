// // import React, { useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom';
// // import { getPosts } from '../services/api';

// // const Home = () => {
// //   const [posts, setPosts] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchPosts = async () => {
// //       try {
// //         const response = await getPosts();
// //         setPosts(response.data);
// //         setLoading(false);
// //       } catch (error) {
// //         console.error('Error fetching posts:', error);
// //         setLoading(false);
// //       }
// //     };

// //     fetchPosts();
// //   }, []);

// //   if (loading) {
// //     return <div className="text-center text-2xl mt-8">Loading...</div>;
// //   }

// //   return (
// //     <div className="max-w-4xl mx-auto px-4 py-8">
// //       <h1 className="text-3xl font-bold mb-8 text-gray-900">Recent Stories</h1>
// //       {posts.length === 0 ? (
// //         <p className="text-center text-xl text-gray-600">No stories available yet.</p>
// //       ) : (
// //         <div className="space-y-8">
// //           {posts.map((post) => (
// //             <div key={post._id} className="border-b border-gray-200 pb-8">
// //               <Link to={`/post/${post._id}`} className="block">
// //                 <h2 className="text-2xl font-bold mb-2 text-gray-900 hover:text-gray-700">{post.title}</h2>
// //                 <p className="text-gray-600 mb-4">{post.content.substring(0, 200)}...</p>
// //               </Link>
// //               <div className="flex items-center text-sm text-gray-500">
// //                 <span>{post.author.username}</span>
// //                 <span className="mx-2">·</span>
// //                 <span>{new Date(post.createdAt).toLocaleDateString()}</span>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Home;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { getPosts } from "../services/api";

// const Home = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await getPosts();
//         setPosts(response.data);

//         console.log(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   if (loading) {
//     return <div className="text-center text-2xl mt-8">Loading...</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8 text-gray-900">Recent Stories</h1>
//       {posts.length === 0 ? (
//         <p className="text-center text-xl text-gray-600">
//           No stories available yet.
//         </p>
//       ) : (
//         <div className="space-y-8">
//           {posts.map((post) => (
//             <div key={post._id} className="pb-8">
//               <Link to={`/post/${post._id}`} className="block">
//                 <h2 className="text-2xl font-bold mb-2 text-gray-900 hover:text-gray-700">
//                   {post.title}
//                 </h2>
//                 <p className="text-gray-600 mb-4">
//                   {post.content.substring(0, 200)}...
//                 </p>
//               </Link>
//               <div className="flex items-center text-sm text-gray-500">
//                 <span>{post.author.username}</span>
//                 <span className="mx-2">·</span>
//                 <span>{new Date(post.createdAt).toLocaleDateString()}</span>
//               </div>
//               <div className="mt-8">
//                 <hr className="border-t border-gray-300" />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../services/api";
import CircularIndeterminate from "../components/progressbar";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response.data);
        setFilteredPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const results = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(results);
  }, [searchQuery, posts]);

  if (loading) {
    return (
      <div className="text-center text-2xl mt-8">
        {" "}
        <CircularIndeterminate />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Recent Stories</h1>

      {/* Search Field */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by title, content, or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {filteredPosts.length === 0 ? (
        <p className="text-center text-xl text-gray-600">
          No stories match your search.
        </p>
      ) : (
        <div className="space-y-8">
          {filteredPosts.map((post) => (
            <div key={post._id} className="pb-8">
              <Link to={`/post/${post._id}`} className="block">
                <h2 className="text-2xl font-bold mb-2 text-gray-900 hover:text-gray-700">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {post.content.substring(0, 200)}...
                </p>
              </Link>
              <div className="flex items-center text-sm text-gray-500">
                <span>{post.author.username}</span>
                <span className="mx-2">·</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="mt-8">
                <hr className="border-t border-gray-300" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

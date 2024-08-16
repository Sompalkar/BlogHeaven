// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { getPost } from '../services/api';

// const PostPage = () => {
//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const response = await getPost(id);
//         setPost(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching post:', error);
//         setLoading(false);
//       }
//     };

//     fetchPost();
//   }, [id]);

//   if (loading) {
//     return <div className="text-center text-2xl mt-8">Loading...</div>;
//   }

//   if (!post) {
//     return <div className="text-center text-2xl mt-8">Post not found</div>;
//   }

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold mb-4 text-gray-900">{post.title}</h1>
//       <div className="mb-8 flex items-center text-sm text-gray-500">
//         <span>{post.author.username}</span>
//         <span className="mx-2">·</span>
//         <span>{new Date(post.createdAt).toLocaleDateString()}</span>
//       </div>
//       <div className="prose prose-lg max-w-none">
//         {post.content.split('\n').map((paragraph, index) => (
//           <p key={index} className="mb-4 text-gray-800">{paragraph}</p>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PostPage;






import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPost, addComment } from '../services/api';

const PostPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPost(id);
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await addComment(id, { content: comment });
      const response = await getPost(id); // Refresh the post to get the updated comments
      setPost(response.data);
      setComment(''); // Clear the comment input
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (loading) {
    return <div className="text-center text-2xl mt-8">Loading...</div>;
  }

  if (!post) {
    return <div className="text-center text-2xl mt-8">Post not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-gray-900">{post.title}</h1>
      <div className="mb-8 flex items-center text-sm text-gray-500">
        <span>{post.author.username}</span>
        <span className="mx-2">·</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
      <div className="prose prose-lg max-w-none">
        {post.content.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4 text-gray-800">{paragraph}</p>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Comments</h2>
        <form onSubmit={handleCommentSubmit} className="mb-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="3"
            className="w-full p-2 border rounded"
            placeholder="Add a comment..."
          ></textarea>
          <button
            type="submit"
            className="mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Comment
          </button>
        </form>
        <div className="space-y-4">
          {post.comments && post.comments.map((comment, index) => (
            <div key={index} className="bg-white p-4 rounded shadow">
              <p className="text-sm text-gray-700">{comment.content}</p>
              <div className="text-xs text-gray-500 mt-2">
                <span>{comment.author.username}</span> · <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostPage;

// import React, { useState } from "react";

// const PostForm = ({ onSubmit, initialData }) => {
//   const [title, setTitle] = useState(initialData?.title || "");
//   const [content, setContent] = useState(initialData?.content || "");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({ title, content });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label htmlFor="title" className="block mb-1">
//           Title
//         </label>
//         <input
//           type="text"
//           id="title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full px-3 py-2 border rounded-md"
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="content" className="block mb-1">
//           Content
//         </label>
//         <textarea
//           id="content"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           className="w-full px-3 py-2 border rounded-md"
//           rows="6"
//           required
//         ></textarea>
//       </div>
//       <button
//         type="submit"
//         className="bg-blue-500 text-white px-4 py-2 rounded-md"
//       >
//         {initialData ? "Update Post" : "Create Post"}
//       </button>
//     </form>
//   );
// };

// export default PostForm;

import React, { useState } from "react";

const PostForm = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto py-8 space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-lg font-medium mb-2 text-gray-800"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full pl-2 border-b-2 border-gray-300 focus:border-gray-600 outline-none text-xl font-semibold py-2"
          placeholder="Enter your title here"
          required
        />
      </div>
      <div>
        <label
          htmlFor="content"
          className="block text-lg font-medium mb-2 text-gray-800"
        >
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full pl-2 h-64 border-b-2 border-gray-300 focus:border-gray-600 outline-none text-lg leading-relaxed py-2"
          placeholder="Start writing your story..."
          rows="10"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-black text-white font-semibold px-6 py-3 rounded-md hover:bg-gray-800 transition-colors duration-200"
      >
        {initialData ? "Update Post" : "Create Post"}
      </button>
    </form>
  );
};

export default PostForm;

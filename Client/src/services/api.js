// import axios from 'axios';

// const api = axios.create({
//     baseURL: 'http://localhost:5000/api',
// });

// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         config.headers['x-auth-token'] = token;
//     }
//     return config;
// });

// export const getPosts = () => api.get('/posts');
// export const getPost = (id) => api.get(`/posts/${id}`);
// export const createPost = (data) => api.post('/posts', data);
// export const updatePost = (id, data) => api.put(`/posts/${id}`, data);
// export const deletePost = (id) => api.delete(`/posts/${id}`);

// export default api;



import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export const getPosts = () => api.get('/posts');
export const getPost = (id) => api.get(`/posts/${id}`);
export const createPost = (data) => api.post('/posts', data);
export const updatePost = (id, data) => api.put(`/posts/${id}`, data);
export const deletePost = (id) => api.delete(`/posts/${id}`);
export const getUserPosts = () => api.get('/posts/user');

export default api;
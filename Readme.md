# Blog Haven

Blog Haven is a full-stack web application that allows users to create, read, update, and delete blog posts. It features user authentication, a responsive design, and a clean, Medium-inspired user interface.

## Features

- User authentication (register, login, logout) 
- Create, read, update, and delete blog posts
- Responsive design for mobile and desktop
- User profiles with personal post management
- Medium-inspired user interface

## Technologies Used

### Frontend

- React.js
- React Router for navigation
- Axios for API requests
- Tailwind CSS for styling

### Backend

- Node.js
- Express.js
- MongoDB for database
- Mongoose as ODM (Object Document Mapper)
- JSON Web Tokens (JWT) for authentication

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB
 
### Installation

1. Clone the repository:

git clone https://github.com/yourusername/blog-haven.git
cd blog-haven


I understand you want to add these sections to the README.md file. Here's how you can format it properly in markdown:
markdownCopy### Installation

1. Clone the repository:
git clone https://github.com/yourusername/blog-haven.git

cd blog-haven
Copy



2. Install backend dependencies:
cd backend
npm install


3. Install frontend dependencies:
cd ../frontend
npm install



4. Create a `.env` file in the backend directory with the following content:


MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret










3. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login a user
- `GET /api/posts`: Get all posts
- `GET /api/posts/:id`: Get a specific post
- `POST /api/posts`: Create a new post (requires authentication)
- `PUT /api/posts/:id`: Update a post (requires authentication)
- `DELETE /api/posts/:id`: Delete a post (requires authentication)
- `GET /api/posts/user`: Get all posts for the authenticated user

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.


Minimal AI Customer Support Agent
A full-stack chat application that authenticates users, allows them to chat with an AI assistant powered by OpenRouter.ai, and stores the complete conversation history in a MongoDB database.

Features

1.Authentication:
i)Secure user signup and login using JSON Web Tokens (JWT).
ii)Passwords are securely hashed using bcrypt.
iii)Protected API routes that require a valid JWT.
iv)Real-time Chat System:
v)Intuitive chat interface for sending and receiving messages.
vi)Live responses from an AI model.
vii)User-specific chat history is saved to and retrieved from the database.
viii)AI Integration:Integrated with OpenRouter.ai to use powerful, free-tier language models (ex- Mistral).

Bonus Features:
i)Typing Indicator: Shows when the AI is processing a response.
ii)Implemented API Rate Limiting: Basic protection against spam and abuse on the backend.

Dockerisation: Could not build docker image because wsl error was continuously coming while running docker in windows


Tech Stack
Frontend   :React (with Vite), Axios, React Router
Backend    :Node.js, Express
Database   :MongoDB Atlas (Free Tier)
Auth	   :JSON Web Tokens (JWT), Bcrypt
AI	       :OpenRouter.ai



Prerequisites
Before you begin, ensure you have the following installed and configured:

Node.js: Version 18.x or higher
MongoDB Atlas Account: You will need a free MongoDB Atlas account and your connection string.
OpenRouter.ai API Key: You will need a free API key from OpenRouter. Get one here
Git: For cloning the repository.

Follow these steps to get the project up and running on your local machine.

1. Clone the Repository
bash
git clone https://github.com/your-username/ai-support-agent.git
cd ai-support-agent

2. Configure Environment Variables
 You need to create .env files for both the server and the client.

Backend (server/)
Navigate to the server directory: cd server
Create a new file named .env.
Copy the contents of .env.example into your new .env file and fill in your actual secret values.
File: server/.env

text
# MongoDB Atlas Connection String (get this from your Atlas cluster)
# Use the long "mongodb://" string for best compatibility
MONGO_URI=your_mongodb_atlas_connection_string_here

# A long, random, and secret string for signing JWTs
JWT_SECRET=your_super_secret_jwt_key

# The port for the backend server
PORT=5001

# Your API key from OpenRouter.ai
OPENROUTER_API_KEY=your_openrouter_api_key_here
Frontend (client/)
Navigate to the client directory: cd client
Create a new file named .env.local.
Add the following line. This tells your React app where to find the backend API.
File: client/.env.local

text
VITE_API_BASE_URL=http://localhost:5001/api

3. Install Dependencies
You need to install packages for both the server and the client.

Install Server Dependencies:
bash
cd server
npm install
Install Client Dependencies:
bash
cd client
npm install

To run the Application:

A) Local Development (Without Docker)
 You will need two separate terminals.

In Terminal 1 - Start the Backend:

bash
cd server
npm run dev
Your backend API will be running on http://localhost:5001.

In Terminal 2 - Start the Frontend:

bash
cd client
npm run dev
Your React application will be available at http://localhost:5173. Open this URL in your browser.



API Endpoints
The backend server exposes the following RESTful API endpoints.

Method	Route	                Description	                                 Protected
POST	/api/auth/signup	    Register a new user.	                      No
POST	/api/auth/login	        Authenticate a user and get a token.	      No
POST	/api/chat/send	        Send a message to the AI.	                 Yes
GET	/api/chat/history	        Get the user's chat history.	             Yes

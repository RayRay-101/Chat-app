Chat Application Documentation
Overview
This chat application is a full-stack project built with React, Node.js, and MongoDB. 
It supports real-time messaging, contact management, image uploads, and more. The project is designed to be scalable, responsive, and user-friendly.
Features
•	Instant Messaging: Real-time chat with live updates.
•	Contact Management: Update and manage contacts, with the latest message displayed.
•	Image Handling: Upload and retrieve images using MongoDB GridFS.
•	Emoji Picker: Integrated emoji picker for adding emojis to messages.
•	Cross-Platform: Compatible with desktop, tablet, and mobile devices.
Installation
Prerequisites
•	Node.js
•	MongoDB Atlas account
•	Git
Steps
1.	Clone the Repository
bash
Copy code
git clone  https://github.com/RayRay-101/Chat-app.git

2.	Navigate to the Project Directory
bash
Copy code
cd chat-app
3.	Install Dependencies
o	Frontend
bash
Copy code
cd frontend
npm install
o	Backend
bash
Copy code
cd ../backend
npm install
4.	Set Up Environment Variables
o	Create .env files in both the frontend and backend directories.
o	Add your environment variables according to the .env.example files.
5.	Run the Application
o	Start the backend server:
bash
Copy code
cd backend
npm start
o	Start the frontend application:
bash
Copy code
cd ../frontend
npm run dev
Usage
1.	Login/Sign Up: Create an account or log in to start chatting.
2.	Add Contacts: Add new contacts to your list.
3.	Send Messages: Start a conversation by sending messages.
4.	Upload Images: Share images in the chat by uploading them.
FAQ
Does the call button work?
The call button is not yet available. This feature is still in development and will be coming soon.
Can I create a group chat?
Group chat functionality will be added in a future update. Stay tuned for this feature!
Contributing
Contributions are welcome! Please follow the standard Git workflow:
1.	Fork the repository.
2.	Create a new branch (git checkout -b feature-branch).
3.	Commit your changes (git commit -m 'Add new feature').
4.	Push to the branch (git push origin feature-branch).
5.	Open a pull request.
Contact
For support or inquiries, contact Raymond at addoraymond123@example.com.


# Set up environment variables
# Create a .env file in both the frontend and backend directories
# Add your environment variables according to the .env.example files

# Start the backend server
npm start

# Start the frontend application
cd chat-frontend
npm run dev


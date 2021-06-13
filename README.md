# Memories
An app for memories to live forever!<br>
Built using MERN stack.

## Setup Instructions

### 1. For backend
```bash
cd server
npm i
```

### 2. For frontend
```bash
cd client
npm i
```

### 3. For database
Create a shared cluster on MongoDB Altas and use the connection key provided to connect to the database in the server/index.js file using Mongoose. Or create a database locally and connect with backend.
<br>


### 4. Add Credentials
Before starting the web server, make sure to add secret key to server/middleware/auth.js file for authentication.
<br>


## Run App 
To run the app, follow the given commands:
<br>


### Start Backend Server
To start the backend server you need to run the following sequence of commands.

```bash
cd server 
npm start
```

### Start Frontend Server
To view the frontend you need to run the following sequence of commands.

```bash
cd client 
npm start
```

View the app on localhost:3000. You can also view the api at localhost:5000 and localhost:5000/posts.
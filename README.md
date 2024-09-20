# Vegan Hub Server

This is the backend server for Vegan Hub, an application designed to connect users with vegan resources and communities.

## Features

- Connects to a MySQL database to manage user data.
- Allows users to submit their information, including email, password, age, gender, and delivery preferences.
- Passwords are securely hashed using bcrypt before storing in the database.
- Provides an endpoint to fetch all registered users.

## Requirements

- Node.js
- MySQL

## Installation

1. Clone the repository:

   ```bash
    git clone https://github.com/ShiwangPande/veganhubserver.git
    cd veganhubserver-main
   ```
2. Install dependencies:

   ```bash
    npm install
   ```
3. Create a .env file in the root directory and add the following environment variables:

```plaintext
DB_HOST=<your_database_host>
DB_USER=<your_database_user>
DB_PASSWORD=<your_database_password>
DB_NAME=<your_database_name>
PORT=<your_port> # optional, defaults to 8081
```
Running the Server
To start the server, run:

```bash
npm start
```
The server will be running on the specified port (default: 8081).

API Endpoints
GET /: Returns a welcome message.

POST /submit-form: Submits user data. Expects a JSON body with the following fields:

- email: User's email
- password: User's password
- age: User's age
- gender: User's gender
- delivery: User's delivery preference
- GET /api/users: Fetches all users from the database.

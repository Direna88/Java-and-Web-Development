# MyKepper Notes App

## Introduction
MyKeeper is a self-hosted note-taking application built with React, Node.js, and PostgreSQL. It allows users to create, manage, and delete notes securely with JWT authentication. Hosting the app is easy – all you need is Node.js, PostgreSQL, and a web browser.

## Requirements
Before setting up MyKeeper, ensure you have the following installed:

* Familiarity with a terminal/cmd

* Node.js (Install if not already installed)

* Npm (Usually bundled with Node.js)

* PostgreSQL (Ensure it's installed and running)

* All required dependencies will be installed via npm install.

## Setup Steps
* Clone the Repository
```bash
gh repo clone Direna88/Java-and-Web-Development
```
* Navigate into the project directory
  ```bash
  cd my-react-app
* Install all dependencies
  ```bash
  npm install
* Set up Environment Variables
  Create a .env file in the root directory and add:
  
  ```ini
  PG_USER=your_postgres_user
  PG_PASSWORD=your_postgres_password
  PG_DATABASE=your_database_name
  PG_HOST=your_database_host
  PG_PORT=5432
  JWT_KEY=your_secret_key
* In one termianl cd into and start the backend server
  ```bash
  nodemon index.js
* In another terminal cd into and start the frontend
   ```bash
  npm run dev
* Open MyKeeper in the Browser and navigate to:
  ```bash
  http://127.0.0.1:5173 or http://localhost:5173

## Authentication & Usage
* Create an account to store your notes securely.
* Login with your credentials to access your saved notes.
* Create, and delete notes easily.
* Logout when done for security (session data will be cleared automatically).

## Notes
* It is recommended to logout when you're done for security.
* If you encounter issues with PostgreSQL, check your .env file and database setup.

# Django JSON Web Token (JWT) Authentication with Django-RestFramework

## Introduction

This project is a complete Notes making app built with ReactJS for the frontend. It utilizes Django-RestFramework for user authentication using JSON Web Tokens (JWT). The authentication information is stored in an SQLite database, while the notes themselves are stored in MongoDB.

## Features

1. User authentication with JWT
1. SQLite database for user authentication
1. MongoDB for storing notes
1. ReactJS for the frontend
1. Fetch request or Axios for communication with the backend

### Branch-Specific Instructions

`main` Branch

1. The default branch using fetch requests.
1. Follow the general instructions for getting started.

`axios` Branch

1. Utilizes Axios for API requests with interceptors.
1. For enhanced functionality and request/response handling.
1. Follow the general instructions for getting started.

### Notes API Endpoints

`/api/notes/`: Retrieve all notes or create a new one.<br>
`/api/notes/:id/`: Retrieve, update, or delete a specific note.

## Getting Started

Clone the repository:

```
git clone https://github.com/Byte-Mystic/Django-JWT-Authentication
```

Switch to the desired branch:

```
git checkout branch-name
```

Install dependencies:<br>
In Frontend:

```
npm install
```

In backend:
Create a virtual environment for easy setup.

```
pip install -r requirements.txt
```

Run the development server: <br>

1. Client

   - `npm start`

1. Server

   - `python manage.py runserver` <br>

The app will be accessible at http://localhost:3000.

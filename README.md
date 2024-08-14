# Airbnb Clone

## Description

This project is a simplified clone of the Airbnb platform that demonstrates full CRUD (Create, Read, Update, Delete) operations. It allows users to create listings, browse available listings, update them, and delete them if necessary. This project is built with Node.js, Express, and MongoDB, and it focuses on backend functionality with basic front-end integration.

## Features

- **Create Listings**: Users can add new listings with details like title, description, price, and location.
- **Read Listings**: Users can browse and view details of all available listings.
- **Update Listings**: Users can update existing listings.
- **Delete Listings**: Users can remove listings they no longer want to be displayed.
- **User Authentication**: Secure authentication using JWT.
- **Database**: MongoDB is used to store user data, listings, and reviews.

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Web application framework for Node.js.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: ODM library for MongoDB and Node.js.
- **JWT**: JSON Web Tokens for secure authentication.
- **Cloudinary**: Used for storing and serving images of listings.

## Installation and Setup

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/airbnb-clone.git
   cd airbnb-clone
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Create a .env file**:
   ```bash
   touch .env
   ```
4. **Add the following environment variables to your .env file**:
   ```bash
   MONGO_URI=your_mongo_db_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_URL=your_cloudinary_url
   ```
5. **Run the application**:
   ```bash
   npm start
   ```
## Usage

- **Creating a Listing**: Use the `/listings` endpoint with a POST request to create a new listing.
- **Viewing Listings**: Use the `/listings` endpoint with a GET request to view all listings.
- **Updating a Listing**: Use the `/listings/:id` endpoint with a PUT request to update a listing.
- **Deleting a Listing**: Use the `/listings/:id` endpoint with a DELETE request to remove a listing.

## API Endpoints

- **POST /listings**: Create a new listing.
- **GET /listings**: Retrieve all listings.
- **GET /listings/:id**: Retrieve a single listing by ID.
- **PUT /listings/:id**: Update a listing by ID.
- **DELETE /listings/:id**: Delete a listing by ID.
- **POST /auth/register**: Register a new user.
- **POST /auth/login**: Authenticate a user.

## Contributing

If you'd like to contribute to this project, please fork the repository and use a feature branch. Pull requests are warmly welcome.


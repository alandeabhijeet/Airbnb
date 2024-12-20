# 🏠 Airbnb Clone  

**A Minimalistic Airbnb Clone for CRUD Operations**  

---

## ⚡ Description  
This project is a **backend-focused** Airbnb clone showcasing essential CRUD functionality. Built using **Node.js**, **Express**, and **MongoDB**, it enables users to create, browse, update, and delete listings. Secure user authentication is implemented with **JWT**, along with seamless image handling through **Cloudinary**.  

---

## 🚀 Features  
- **Create Listings** 🏠: Add listings with details like title, description, price, and location.  
- **Browse Listings** 🔍: View all available listings.  
- **Update Listings** ✏️: Modify existing entries.  
- **Delete Listings** 🗑️: Remove outdated or irrelevant entries.  
- **Secure Authentication** 🔒: Robust JWT-based user authentication.  
- **Cloudinary Integration** ☁️: Seamless image uploads.  

---

## 🛠️ Technologies Used  
- **Node.js**: Backend runtime environment  
- **Express.js**: Web application framework  
- **MongoDB**: NoSQL database for data storage  
- **Mongoose**: ODM for MongoDB and Node.js  
- **JWT**: Secure user authentication  
- **Cloudinary**: Image hosting and delivery  

---

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


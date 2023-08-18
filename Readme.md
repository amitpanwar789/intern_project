eCommerce Backend API Documentation
===================================

Welcome to the documentation for the eCommerce backend API. This API serves as the backend for an eCommerce website, providing various endpoints to manage categories, products, carts, orders, user authentication, and more.


Table of Contents
-----------------

1.  [Introduction](#introduction)
2.  [Authentication](#authentication)
3.  [API Endpoints](#api-endpoints)
    *   [Users](#users)
    *   [Categories](#categories)
    *   [Products](#products)
    *   [Cart](#cart)
    *   [Orders](#orders)
4.  [Error Handling](#error-handling)
5.  [Rate Limiting](#rate-limiting)


Introduction
------------

This backend API is designed to power an eCommerce website. It provides a range of endpoints to manage user authentication, categories, products, carts, and orders. Additionally, it includes security measures such as user authentication using JSON Web Tokens (JWT) and rate limiting to prevent abuse.

Authentication
--------------

User authentication is implemented using JSON Web Tokens (JWT). Users can register, log in, and obtain a token to authenticate API requests.

API Endpoints
-------------

### Users

*   `POST /login`: Log in with email and password.
*   `POST /register`: Register a new user with email, name, and password.
*   `GET /user`: Get user details.
*   `DELETE /user`: Delete user account.
*   `PUT /user`: Update user account details.

### Categories

*   `GET /categories`: Get a list of available categories.

### Products

*   `GET /products/category/:categoryId`: Get products by category ID.
*   `GET /products/:productId`: Get detailed information about a product by ID.

### Cart

*   `GET /cart`: Get current cart details for the authenticated user.
*   `POST /cart`: Add a product to the cart.
*   `PUT /cart`: Update the quantity of a product in the cart.
*   `DELETE /cart`: Delete a product from the cart.

### Orders

*   `GET /orders`: Get order history for the authenticated user.
*   `POST /orders`: Create a new order.
*   `GET /orders/:orderId`: Get detailed information about an order by ID.
*   `PUT /orders/:orderId/pay`: Pay for an order.
*   `PUT /orders/:orderId/deliver`: Mark an order as delivered.

Error Handling
--------------

The API is designed to handle errors gracefully. Meaningful error messages and appropriate HTTP status codes are returned when necessary.

Rate Limiting
-------------

For security purposes, the API implements rate limiting using the `express-rate-limit` middleware. This helps prevent abuse and maintain server stability.


### To Setup
* To install dependencies npm install
* create a .env file and add MONGO_URI and JWT_SECRET variable
* to add seed product and user you can use seeder.js file
* npm run data:import
* to run server npm run server

## You can interact with api using Postman or any api testing tool
* https://intern-project-rhez.onrender.com/api
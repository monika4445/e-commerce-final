# Introducing GigTech, Your Ultimate Destination for Seamless E-commerce Experience!

## Description
At GigTech, our mission is to provide a seamless online shopping experience for electronic accessories. 
Our target audience consists of tech enthusiasts, professionals, and individuals who appreciate cutting-edge electronic accessories.
This project is an eCommerce application built with Express.js, PostgreSQL, and Sequelize. It provides a boilerplate for creating an eCommerce full-stack application with features like user registration and authentication, product management, cart management, and order management.

## Scope and Scale of the Project
The scope of our e-commerce application encompasses the development of a feature-rich website that encompasses the following components:

* User Registration and Authentication: Enable users to create accounts, login securely, and manage their profiles.

* Product Catalog: Display a wide range of electronic accessories, categorized and searchable for easy navigation.

* Shopping Cart and Checkout: Allow users to add items to their cart, manage quantities, and proceed through a secure checkout process.

* Order Management: Provide users with order tracking, purchase history, and notifications.

* Responsive Design: Develop a mobile-friendly and responsive website that ensures optimal user experience across devices.

## Technologies Used

#### Server
* node js - version 18.13.0
* nodemon - version 2.0.22
* express - version 4.18.2
* cors - version 2.8.5
* dotenv - version 16.0.3
* jsonwebtoken - version 9.0.0
* express-validator - version 7.0.1
* nodemailer - version 6.9.2
* multer - version 1.4.5-lts.1
* sequelize - version 6.31.1
* sequelize-cli - version 6.6.0
* stripe - version 12.8.0

#### Database
* pg - version 8.10.0
* pg-hstore version 2.3.4

## Features

* User registration and login
* Authentication via JWT
* Email confirmation
* Product management (CRUD operations)
* Cart management (add/remove)
* CartItem management (add/remove/update items)
* Order management includes the ability to create an order and view order history.
* PostgreSQL database with Sequelize ORM
* Role-based access control (Admin and User Roles Ensuring Efficient User Management)
* Seeding

### Installing

```
git clone https://github.com/dianna-paronyan/e-commerece-final-backend.git
cd .. finalProject
npm install
```

## Getting Started

To test the application

* Install PostgreSQL database and create a new database for the project:
 ```npx sequelize-cli db:create```
* Update the database credentials in the config/config.js file.
* Run database migrations to create the required tables:
```npx sequelize-cli db:migrate```
* Make a temporary gmail account for testing purposes
* Enable 2 factor authentication and click on app passwords (article: https://mailtrap.io/blog/send-emails-with-nodejs/)
* Add your email and password for the app in the .env file
* Example
EMAIL_SENDER='yourchosenemail@gmail.com'
EMAIL_PASSWORD='password
* Create a random string as JWT secret from
```
https://codebeautify.org/generate-random-string
```
* Copy it and place in in your .env file
* Example
TOKEN_SECRET="yourrandomlygeneratedsecret"
* Start the application
```
nodemon server.js
```
* Register via http://localhost:5000/register with username, email, and password in the body as JSON format via Postman or any alternatives
* If successful, you should get a verification email
* Email link should look like this - http://localhost:5000/verify/token=somerandomlygeneratedjwttoken
* Opening the link will change your username confirmed field to true and show confirmed message in the response
* Login via http://localhost:5000/login with the same email and password
* Your response should have a JSON token
* Open Postman or any API testing tool and set the Authorization header with the value Token <token> (replace <token> with the copied JWT token).
* Make a request to http://localhost:5000/products (get all products)
* If you get 200 OK and {"products": []} as a result, everything was successul
* To manage the cart, cart items, and orders, you can add or remove items from the cart, update cart items and order products
* From there you can edit the app based on your needs
* If you want to seed your products database with some random information, run node products_seed.js in the seeds folder, click "y" to delete all previous products or anything else to just add data without deleting anything
# city-report-be

## Description

This project is web service application using Node.js, Express and Typescript, that provides an API for the CIty Report Angular front-end, managing municipal issues reported by users. It allows users to add, edit, and retrieve issues. Each issue has a title, description, latitude, longitude, and images. The project uses PostgreSQL for data storage and Cloudinary for image storage. For authentication it uses JWT.

## Installation

1. Clone the repository and install depencies:

  git clone https://github.com/Nuramene81/city-report-back-end.git
  npm install

2. Set up your PostgreSQL database and Cloudinary account.

3. Create a .env file in the root directory of the project and add   your environment variables:

CLOUDINARY_NAME=<your-cloudinary-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_SECRET=<your-cloudinary-secret>
DB_HOST=<your-database-host-url>
DB_PORT=<your-database-port>
DB_DATABASE_NAME=<your-database-name>
DB_USER=<your-database-username>
DB_PASSWORD=<your-database-password>
JWT_SECRET=<your-jwt-secret>

## Usage

1. Start the server:
npm run start


## Note

Remember to replace the environment variables <values> with your actual values.
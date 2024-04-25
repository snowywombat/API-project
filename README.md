
#  👑 Heirbnb
Heirbnb is a website clone of Airbnb. It is a platform to search for spaces to stay hosted by the property's owner. Live like an heir!
<br>
Live site: https://heirbnb.onrender.com/ 

# Wiki Link

- [API Documentation](https://github.com/snowywombat/API-project/wiki/API-Documentation)
- [Database Schema](https://github.com/snowywombat/API-project/wiki/Database-Schema)
- [Feature List](https://github.com/snowywombat/API-project/wiki/Feature-List)
- [Redux Store Shape](https://github.com/snowywombat/API-project/wiki/Redux-Store-Shape)

# Tech Stack
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

# Landing Page
Run frontend and backend with npm start command
=======
Welcome to the Landing Page! Here, you can log in as a demo user or create your own account. Host your own spot or leave reviews on other spots!
<br>
<br>
<img width="1715" alt="Screen Shot 2023-01-23 at 1 34 15 AM" src="https://user-images.githubusercontent.com/96889369/214007210-aa6cb914-cbc6-4360-b582-96df482cf4b9.png">

## Getting started
1. Clone this repository:
   `
   https://github.com/snowywombat/API-project.git
   `
2. Install dependencies in the front end and back end:
   * `npm install`

3. Create a **.env** file:
 - Example
   
   ```js
    PORT=8000
    DB_FILE=db/dev.db
    JWT_SECRET=super-secret-key
    JWT_EXPIRES_IN=expiration-number
    SCHEMA=schema_name

4. Set up your database within .env and then run the following steps: 
   * `npx dotenv sequelize db:create`
   * `npx dotenv sequelize db:migrate` 
   * `npx dotenv sequelize db:seed:all`

5. Start the app for both the backend and frontend:
   * `npm start`

6. Create an account or try out the demo on the website!

# Features 

## Spots
* Users can view spots
* Logged-in users can create a spot
* Logged-in owners can update their spot
* Logged-in owners can delete their spot

## Reviews
* Users can view reviews for a spot
* Logged-in users can create a review on a spot
* Logged-in owners can update their review
* Logged-in owners can delete their review

## Bookings
* Users can view bookings for a spot
* Logged-in users can create a booking for a spot
* Logged-in owners can update their booking 
* Logged-in owners can delete their booking

## Tags
* Users can view tags for a spot
* Logged-in owners can create tags
* Logged-in owners can delete their tags


## Future Features
### Users Page
* Logged-in users can change their user settings
### AWS
* Logged-in owners can upload images of their spot to AWS S3
### Google Maps Api
* Logged-in users can locate their booking with Google Maps API


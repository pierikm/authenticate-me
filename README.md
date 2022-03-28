# [Deals on Wheels](https://react-solo-mp.herokuapp.com/)

Deals on Wheels is a site that you can find a ride to rent or list a ride you own for someone else to rent.

Getting started:

1. Clone with ```https://github.com/pierikm/deals-on-wheels.git```
2. Run ```npm install``` in the root directory to install dependencies
3. Create a .env file in the backend folder, and fill in the details using the .env.example
4. Create a user in postgres with the same name and password as in the .env file ```CREATE <user> WITH PASSWORD <password> CREATEDB;```
5. Create a database in postgres with the same name as in the .env ```CREATE DATABASE <database> WITH OWNER <user>;```
6. cd into the backend folder in your terminal and run the command ```npx dotenv sequelize db:migrate``` to migrate your tables into the database.
7. Run the command ```npx dotenv sequelize db:seed:all``` to seed the database with the seeder files.
8. Run ```npm start``` in the backend folder to start the backend server.
9. Open a separate terminal and cd into the frontend folder, then run ```npm start``` to run the frontend server. If the site doesn't open in your browser you can navigate to http://localhost:3000 to visit the site.

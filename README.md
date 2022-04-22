# [Deals on Wheels](https://react-solo-mp.herokuapp.com/)

Deals on Wheels is a site that you can find a ride to rent or list a ride you own for someone else to rent.

## Home page

From the home page you can go to the login page, go to the signup page, or login as a demo user with the "Demo" button.

![image](https://user-images.githubusercontent.com/92738445/164756834-9a1666d7-b5e7-4622-84ce-d2ce0fbecadc.png)

Upon login, you are welcomed by username, and may hit the "Explore Some Rides!" button to continue.

![image](https://user-images.githubusercontent.com/92738445/164757106-45b1599b-c337-4edb-ba6c-8cda230dc4ea.png)

## Rides

On the rides page you see a list of all the rides available, with some details about them. Clicking on the picture takes you to the individual ride page.

![image](https://user-images.githubusercontent.com/92738445/164757176-7c74677b-5762-462c-b45a-3a8569e4a835.png)

## Create Ride

Clicking the "Create a Ride" button on the navbar pulls up a form where you can create your own ride.

![image](https://user-images.githubusercontent.com/92738445/164757381-034e9cfa-d725-4f6b-b007-b0f8747edaa0.png)

## Ride

If you own a ride, on its page you will see "Edit", "Delete", and "Add a Pic" buttons.

![image](https://user-images.githubusercontent.com/92738445/164757761-dee186b6-5f79-4f7b-971b-98393d6e69dd.png)

The "Edit" button opens a form that you can edit the details of the ride.

![image](https://user-images.githubusercontent.com/92738445/164757872-64831cb6-01a2-4bc6-a3be-35ef476dddda.png)

The "Add a Pic" button opens a form that allows you to add a link to a picture to the ride.

![image](https://user-images.githubusercontent.com/92738445/164757988-40e04e38-3a15-4dd5-92f1-dba9ffab2395.png)

The "Delete" button deletes the ride.

If you don't own a ride, you will see "Book this Ride" and "Review Ride" buttons.

![image](https://user-images.githubusercontent.com/92738445/164758216-01c2143d-224c-4050-931e-92861fd65330.png)

"Book this Ride" form, with overlapping date error handling shown below.

![image](https://user-images.githubusercontent.com/92738445/164758345-df51fc1d-c0db-424a-8121-89c8b94e87aa.png)

![image](https://user-images.githubusercontent.com/92738445/164758440-17805f35-5200-4c14-94d0-cdb0742ab4a7.png)

"Review Ride" opens a modal with a form to submit a review.

![image](https://user-images.githubusercontent.com/92738445/164758629-0639eff4-f162-4073-9f87-06ef792f8430.png)

After submitting a review, the "Review Ride" button disappears, and an editable, deletable review appears below, also updating the ride's average score.

![image](https://user-images.githubusercontent.com/92738445/164758915-1d52bb59-44a8-45b4-92b8-ed435ab1c2ca.png)

## Bookings

By clicking your username in the navbar, you can either logout or navigate to your bookings. On the bookings page you can see all the rides you've booked, sorted by start date. You can also delete a booking from this page.

![image](https://user-images.githubusercontent.com/92738445/164759195-c15f0ccd-70e7-4708-ba6e-cbd5aacf6f45.png)

![image](https://user-images.githubusercontent.com/92738445/164759236-8c0af54f-fbc3-48fb-bb0c-b3d84eaa29fa.png)


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

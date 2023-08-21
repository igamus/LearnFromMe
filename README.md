# LearnFromMe

[LearnFromMe](https://learnfromme.onrender.com) is an eCommerce application modeled upon Udemy made with **React** and **Flask** where users can purchases and publish courses.


## Getting started
Visit the [live site](https://learnfromme.onrender.com) or

1. Clone this repository

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. Open another terminal, navigate to the `react-app` directory, and install its dependencies

   ```bash
   cd react-app
   ```

   ```bash
   npm i
   ```

7. Then, run the frontend

   ```bash
   npm start
   ```


## Features

### Courses
Users that are not logged in can browse courses for sale.

![Browse all courses view](/readme-images/image.png)

A logged-in user can
* Upload courses
* View created courses (including their videos) from a course management page
* Update existing courses they own
* Delete existing courses they own

### Cart

![Cart view](/readme-images/image-1.png)

A logged in user can
* Add courses to a shopping cart
* Remove courses from their cart
* "Purchase" items (clear the cart)

### Upcoming Features
* Course categories
  * Add, remove, and update categories relevant to a course
  * Organize courses into categories for browsing
* Purchase courses
  * Users can view courses they have purchased
* Expanded user profiles
  * Users can update their profile information
  * Users can also add
     * a profile image
     * a bio
     * areas of expertise
* Review courses
  * All courses have a rating, averaged from individual user reviews that are, in turn, readable
  * Users can review courses they have purchased
  * Users can update and delete reviews they have written


## Endpoints

Coming soon!


## Contact the Developer
All questions and concerns can be addressed to myself, Isaac Gamus, at igamus@gmail.com.

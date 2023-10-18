# LearnFromMe

[LearnFromMe](https://learnfromme.onrender.com) is an eCommerce application modeled upon Udemy made with **React** and **Flask** where users can purchase and publish courses.

<div align="center">
      <img src="https://github.com/igamus/LearnFromMe/assets/80405823/751acb23-8201-424e-84bc-4f9e3debac29" />
</div>

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

<div align="center">
      <img src="/readme-images/image.png" />
</div>

A logged-in user can
* Upload courses
* View created courses (including their videos) from a course management page
* Update existing courses they own
* Delete existing courses they own

### Cart

<div align="center">
      <img src="/readme-images/image-1.png" />
</div>

A logged in user can
* Add courses to a shopping cart
* Remove courses from their cart
* "Purchase" items (clear the cart)

### Categories
<div align="center">
      <img src="https://github.com/igamus/LearnFromMe/assets/80405823/d0c05e07-c73f-45cd-85c9-2dc12c4c2ff8" /> 
</div>

When creating and updating a course, users can add, remove, and update relevant course categories. LearnFromMe then lists the course within the catalogue of courses for the category (or categories) provided. If none are provided, LearnFromMe lists the course under "Other Courses."

### Upcoming Features
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

<table>
   <th>Request</th><th>Purpose</th><th>Response (Success)</th>
   <tr>
      <td><code>GET /</code></td>
      <td>Direct to the home page</td>
      <td>Home page</td>
   </tr>
   <tr>
      <td><code>GET /api/auth/</code></td>
      <td>Authenticates a user</td>
      <td>

```json
{
   "email": "marnie@aa.io",
   "id": 2,
   "name": "Marnie Zucker"
}
```
   </td>
   </tr>
   <tr>
      <td><code>POST /api/auth/login</code></td>
      <td>Logs a user in</td>
      <td>

```json
{
   "email": "marnie@aa.io",
   "id": 2,
   "name": "Marnie Zucker"
}
```
   </td>
   </tr>
   <tr>
      <td><code>GET /api/auth/logout</code></td>
      <td>Logs a user out</td>
      <td>

```json
{
    "message": "User logged out"
}
```
   </td>
   </tr>
   <tr>
      <td><code>POST /api/auth/signup</code></td>
      <td>Creates a new user and logs them in</td>
      <td>

```json
{
    "email": "clyde@aa.io",
    "id": 10,
    "name": "Clyde Clydale"
}
```
   </td>
   </tr>
   </tr>
   <tr>
      <td><code>GET /api/auth/unauthorized</code></td>
      <td>Returns unauthorized JSON when login auth fails</td>
      <td>

```json
{
    "errors": [
        "Unauthorized"
    ]
}
```
   </td>
   </tr>
   <tr>
      <td><code>GET /api/cart/</code></td>
      <td>Returns all courses in cart</td>
      <td>

```json
[
    {
        "categories": [
            {
                "id": 7,
                "name": "Design"
            },
            {
                "id": 8,
                "name": "Marketing"
            }
        ],
        "courseImage": "https://s3.us-east-2.amazonaws.com/lfm.photo/3382fff5103840f082243bede6faf418.jpg",
        "courseVideo": "https://s3.us-east-2.amazonaws.com/lfm.video/8442a783790d45ff8418b36baa51817b.mp4",
        "description": "Continue to master vital skills to make your videos pop. Dominate the digital landscape with high-quality, stunning media",
        "id": 2,
        "instructor": {
            "email": "ooctavius@horizon.edu",
            "id": 5,
            "name": "Dr. Otto Octavius"
        },
        "level": "Intermediate",
        "name": "Video Editing Pro Series -- Color Correction",
        "price": 22.99,
        "whatYoullLearn": "Color correction"
    },
    // ...
]
```
   </td>
   </tr>
   <tr>
      <td><code>GET /api/cart/add/&lt;int:course_id&gt;</code></td>
      <td>Add course of specified id to cart</td>
      <td>

```json
{
    "addedCourse": {
        "categories": [
            {
                "id": 7,
                "name": "Design"
            },
            {
                "id": 8,
                "name": "Marketing"
            }
        ],
        "courseImage": "https://s3.us-east-2.amazonaws.com/lfm.photo/3382fff5103840f082243bede6faf418.jpg",
        "courseVideo": "https://s3.us-east-2.amazonaws.com/lfm.video/8442a783790d45ff8418b36baa51817b.mp4",
        "description": "Continue to master vital skills to make your videos pop. Dominate the digital landscape with high-quality, stunning media",
        "id": 2,
        "instructor": {
            "email": "ooctavius@horizon.edu",
            "id": 5,
            "name": "Dr. Otto Octavius"
        },
        "level": "Intermediate",
        "name": "Video Editing Pro Series -- Color Correction",
        "price": 22.99,
        "whatYoullLearn": "Color correction"
    }
}
```
   </td>
   </tr>
   <tr>
      <td><code>GET /api/cart/clear</code></td>
      <td>Clear currently logged-in user's cart of all courses</td>
      <td>

```json
{
    "message": "Cart is empty"
}
```
   </td>
   </tr>
   <tr>
      <td><code>GET /api/cart/remove/&lt;int:course_id&gt;</code></td>
      <td>Remove course of specified id from cart</td>
      <td>

```json
{
    "message": "Successfully removed course from cart"
}
```
   </td>
   </tr>
   <tr>
      <td><code>GET /api/category/</code></td>
      <td>Returns a list of all categories (excluding "Other")</td>
      <td>

```json
[
    {
        "id": 1,
        "name": "Development"
    },
    {
        "id": 2,
        "name": "Business"
    },
    // ...
]
```
   </td>
   </tr>
   <tr>
      <td><code>GET /api/category/&lt;int:category_id&gt;</code></td>
      <td>Returns a list of all courses for a given category</td>
      <td>

```json
[
    {
        "categories": [
            {
                "id": 1,
                "name": "Development"
            }
        ],
        "courseImage": "https://s3.us-east-2.amazonaws.com/lfm.photo/pexels-photo-1181373.jpeg",
        "courseVideo": "https://s3.us-east-2.amazonaws.com/lfm.video/pexels-koolshooters-8986521+(Original).mp4",
        "description": "Learn Python programming from scratch with hands-on examples.",
        "id": 1,
        "instructor": {
            "email": "marnie@aa.io",
            "id": 2,
            "name": "Marnie Zucker"
        },
        "level": "Beginner",
        "name": "Python for Beginners",
        "price": 19.99,
        "whatYoullLearn": "Basic Python syntax|Working with data types|Conditional statements"
    },
    // ...
]
```
   </td>
   </tr>
   <tr>
      <td><code>GET /api/category/other</code></td>
      <td>Returns a list of all courses without a category</td>
      <td>

```json
[
    {
        "categories": [],
        "courseImage": "https://s3.us-east-2.amazonaws.com/lfm.photo/dd63cc2a63414f82b732a99caa04300c.jpg",
        "courseVideo": "https://s3.us-east-2.amazonaws.com/lfm.video/d7a60dc845bd442f9cb4526e60dfff8b.mp4",
        "description": "You can tell your sweetie, \"That one is Victorian\" or a potential employer, \"Those sure are Ionian columns,\" and finally get the approval of your father when you tell him, \"Papa, I, too, feel blobitecture is overrated.\"",
        "id": 31,
        "instructor": {
            "email": "ooctavius@horizon.edu",
            "id": 5,
            "name": "Dr. Otto Octavius"
        },
        "level": "Beginner",
        "name": "Spotting Distinct Architectural Styles to Impress People on Walks Together",
        "price": 42.99,
        "whatYoullLearn": "To identify buildings by facades|To see past facades|To identify how likely it is that Spider-Man has recently swung by the buidling"
    },
    // ...
]
```
   </td>
   </tr>
   <tr>
      <td><code>POST /api/courses/</code></td>
      <td>Creates a new course</td>
      <td>

```json
{
   "categories": [
      {
            "id": 1,
            "name": "Development"
      }
   ],
   "courseImage": "https://s3.us-east-2.amazonaws.com/lfm.photo/4290ac1b99b748b8a6a35d06174c35c0.jpg",
   "courseVideo": "https://s3.us-east-2.amazonaws.com/lfm.video/7bfb479722ab4dc2bbbcbb34fa3011cc.mp4",
   "description": "In 50 seconds learn enough to get a 7 figure career",
   "id": 43,
   "instructor": {
      "email": "andy@aa.io",
      "id": 4,
      "name": "Andy Minhaj"
   },
   "level": "Beginner",
   "name": "Learn React in 50 seconds",
   "price": 19.99,
   "whatYoullLearn": "React|Redux|React Router"
}
```
   </td>
   </tr>
   <tr>
      <td><code>GET /api/courses/&lt;int:course_id&gt;</code></td>
      <td>Returns the details of the course with the provided id</td>
      <td>

```json
{
    "categories": [
        {
            "id": 1,
            "name": "Development"
        }
    ],
    "courseImage": "https://s3.us-east-2.amazonaws.com/lfm.photo/pexels-photo-1181373.jpeg",
    "courseVideo": "https://s3.us-east-2.amazonaws.com/lfm.video/pexels-koolshooters-8986521+(Original).mp4",
    "description": "Learn Python programming from scratch with hands-on examples.",
    "id": 1,
    "instructor": {
        "email": "marnie@aa.io",
        "id": 2,
        "name": "Marnie Zucker"
    },
    "level": "Beginner",
    "name": "Python for Beginners",
    "price": 19.99,
    "whatYoullLearn": "Basic Python syntax|Working with data types|Conditional statements"
}
```
   </td>
   </tr>
   <tr>
      <td><code>PUT /api/courses/&lt;int:course_id&gt;</code></td>
      <td>Updates the course of the specified id</td>
      <td>

```json
{
   "categories": [
      {
            "id": 1,
            "name": "Development"
      }
   ],
   "courseImage": "https://s3.us-east-2.amazonaws.com/lfm.photo/4290ac1b99b748b8a6a35d06174c35c0.jpg",
   "courseVideo": "https://s3.us-east-2.amazonaws.com/lfm.video/7bfb479722ab4dc2bbbcbb34fa3011cc.mp4",
   "description": "In 50 seconds learn enough to get a 7 figure career",
   "id": 43,
   "instructor": {
      "email": "andy@aa.io",
      "id": 4,
      "name": "Andy Minhaj"
   },
   "level": "Beginner",
   "name": "Learn React in 50 seconds",
   "price": 19.99,
   "whatYoullLearn": "React|Redux|React Router"
}
```
   </td>
   </tr>
   <tr>
      <td><code>DELETE /api/courses/&lt;int:course_id&gt;</code></td>
      <td>Deletes the course of the specified id</td>
      <td>

```json
{
   "message": "Successfully deleted Learn React in 50 seconds (course #43)"
}
```
   </td>
   </tr>
   <tr>
      <td><code>GET /api/courses/learn</code></td>
      <td>Get all courses owned (purchased) by the currently logged-in user</td>
      <td>

```json
[
    {
        "categories": [
            {
                "id": 1,
                "name": "Development"
            }
        ],
        "courseImage": "https://s3.us-east-2.amazonaws.com/lfm.photo/4290ac1b99b748b8a6a35d06174c35c0.jpg",
        "courseVideo": "https://s3.us-east-2.amazonaws.com/lfm.video/7bfb479722ab4dc2bbbcbb34fa3011cc.mp4",
        "description": "In 50 seconds learn enough to get a 7 figure career",
        "id": 43,
        "instructor": {
            "email": "andy@aa.io",
            "id": 4,
            "name": "Andy Minhaj"
        },
        "level": "Beginner",
        "name": "Learn React in 50 seconds",
        "price": 19.99,
        "whatYoullLearn": "React|Redux|React Router"
    },
    // ...
]
```
   </td>
   </tr>
   <tr>
      <td><code>GET /api/courses/teach</code></td>
      <td>Get all courses taught (created) by the currently logged-in user</td>
      <td>

```json
[
    {
        "categories": [
            {
                "id": 1,
                "name": "Development"
            }
        ],
        "courseImage": "https://s3.us-east-2.amazonaws.com/lfm.photo/pexels-photo-1181373.jpeg",
        "courseVideo": "https://s3.us-east-2.amazonaws.com/lfm.video/pexels-koolshooters-8986521+(Original).mp4",
        "description": "Learn Python programming from scratch with hands-on examples.",
        "id": 1,
        "instructor": {
            "email": "marnie@aa.io",
            "id": 2,
            "name": "Marnie Zucker"
        },
        "level": "Beginner",
        "name": "Python for Beginners",
        "price": 19.99,
        "whatYoullLearn": "Basic Python syntax|Working with data types|Conditional statements"
    },
    // ...
]
```
   </td>
   </tr>
</table>


## Contact the Developer
All questions and concerns can be addressed to myself, Isaac Gamus, at isaacgamusdev@gmail.com.

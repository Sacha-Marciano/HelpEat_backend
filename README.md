# HelpEat_backend

This is the back-end to the HelpEat app. It is the server that will handle requests from the front end regarding users and recipes data. The server is connected to a database were all the information is stored.

The server can be accessed via :
https://api.helpeat.jumpingcrab.com
https://www.helpeat.jumpingcrab.com
https://helpeat.jumpingcrab.com
or http

## Technical description

This code uses express npm package to create a server which by default listen to port 3001. It connectcs to a MongoDB database via the mongoose npm package and uses the cors npm package to allow domains origins.
The logic of the app is simple : listen to requests sent to server, check if the request match the conditions of routes, endpoints and models (default responses to unknown routes implemented), and sends a response based on the request. The app can read, modify or delete data in the database.

## Handled requests

No auth required :

- POST /signin : login users if email and password match database
- POST /signup : create a new user
- GET /recipes : returns all recipes from collection

Auth required :

- POST /recipes : create a new recipe and adds it to database
- DELETE/recipes : delete recipe from database if the user is the owner
- GET /users/me : return current user
- POST /users/favorite : add a recipe ID to the favorite array of user
- DELETE /users/favorite : delete a recipe ID from the favorite array of user
- POST /users/schedule : add a recipe ID to the correct key of the scheduled recipes object (inside schedule object of user)
- DELETE /users/schedule : delete a recipe ID from the correct key of the scheduled recipes object (inside schedule object of user)

DEFAULT: all unknown routes or endpoint will end in a 404 response

## Updates

From new to old:

- v1.1.1 : Update README after deployment
- v1.1.0 : fix before deployment
- v1.0.0 : initial commit

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

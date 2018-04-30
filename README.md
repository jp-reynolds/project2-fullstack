# project2-fullstack

For Project 2, I wanted to create a travel logger.  I always forget some of the dream vacations I want to go on or sometimes forget where I have even been!  This will allow users to plan a trip based on their starting city, and then plan more details of that trip as they see fit.  This is a way to organize vacations and see what other people are doing to get inspiration. 

User stories...
1. User starts at signup page, and creates account.  Upon signup button they will be redirected to the login page
2. At login page, user will enter username/password and upon login button be redirected to their profile page.
3. Here the User will see that they can enter in a place they want to go.
4. This place will show up underneath form with a remove or see map option.
5. Remove will remove it from their user data, see map will take them to a new page that displays the map with that location on it.
6. In the map page the user will be able to add more markers to places nearby that city, and see some stats about that place. 
7. (2.0) user will have an option to see what other User data looks like and compare places they have been/ want to go to other users.


Wireframe...


![](https://i.imgur.com/9N1U7VKl.jpg)

Approach Taken...

I started by getting the user to signup, login, and being operating within their session.  I knew all the data the user was going to be messing around with was embedded and stored within their user object so having this as the starting point made everything easier. Then it was a matter of how I wanted to display the information about the places they wanted to travel.  I played around with a few different things and realized that having the google map on a seperate page was the best option.  The user will be able to see the list of places they want to go (and have been) and then go into that trip and plan from a new page.  Connecting the new maps page with the unique 'city' the user clicked 'see map' on was a way of giving the user a starting point to plan their trip.



Technologies Used...

HTML/EJS...
  1. viewing pages for each site.  I have the google maps APIs inline coded to ensure functionality on that specific page. (main.js was getting a little hectic as well)
  2. Created empty divs to contain all data being entered.
  
CSS...
  1. Styling page that aligns text/buttons appropriately
  2. Added pictures
  3. used bootstrap
    
jQuery...
  1. Used jQuery to manipulate DOM based on certain events. (form inputs, buttons clicked... etc..)

JavaScript...
  1. Used Ajax to create new users and when logged in to post user to session.
  2. Also used Ajax to post and retrieve 'places' into user model then in success functions, displayed places on pages (in array).

Express...
 1. Set up full CRUD routes
 2. Required...Express, Body-Parser, Morgan, Mongoose, Path, Express-Session, bcrypt, and my models directories.
 3. Set... View Engine and ports (local and heroku)
 4. Use... Body-Parser, static-public dir, morgan-tiny, sessions.

Mongoose....
 1. Set up User schema and embedded placesSchema inside User
 2. Users get stored in database and the places are stored in an array in the user object. 
 3. methods: createSecure, authenticate, findOne, findOneAndUpdate, findOneAndRemove.

Google Geocoder API...
 1. Took custom city from params in url and retrieved place json data response. Parsed through response to acquire the lat, lng for maps locater.

Google Maps Api...
 1. Needs lat, lng coords to get location on map.
 2. took response from geocoder API and implemented to center of map and dropped a marker to that location.




Unsolved Problems...
1. Getting custom images for city that was inputted (User Cover Photo and Photo on city card).
2. Need to supple more information on the get maps page (city, country, continent, weather?)
3. Having a user data viewing screen to see most traveled to places and being able to compare user data with all users data.
4. Future Places - being able to complete a trip and move it to future places and also just listing all the places that you have been. 
5. Delete function deletes user but doesn't redirect to sign up page
6. Need more feedback to user when signing up (also what happens if user types in wrong password?)

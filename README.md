# FSJS-Project-10-Full-Stack-App-with-React-and-a-REST-API

Full Stack JavaScript Project 10 - Full Stack App with React and a REST API

## Structure and notes:

[08 Feb 2022] - Utilising the .jsx file extension for React components for better code completion.
[08 Feb 2022] - Adopting the Airbnb React / JSX Style Guide for naming conventions https://github.com/airbnb/javascript/blob/master/react/README.md

### Build log:

[08 Feb 2022] - Imported REST API files from Project 9 into /api directory
[08 Feb 2022] - Initialised basic file structure with create-react-app in /client directory
[08 Feb 2022] - Removed redundant files for project in /client directory
[08 Feb 2022] - Added CORS support to REST API with `cors npm package`, implemented in api/app.js
[08 Feb 2022] - Initialised client/src/config.js file to create connection config with REST API

### Operating logic:

1. REST API access point is stored in /config/config.js
2. This is loaded into /components/Data.jsx and accessed programmatically to access the proper URL for the api requests.
3. Data.jsx is a helper class representing utility methods to send GET, POST, PUT, and DELETE requests to the REST API
4.

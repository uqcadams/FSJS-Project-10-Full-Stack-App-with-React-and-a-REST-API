# FSJS-Project-10-Full-Stack-App-with-React-and-a-REST-API

## Description

**Project Title:** Full Stack JavaScript Project 10 - Full Stack App with React and a REST API.
**Author:** Chris Adams
**Date:** 13 Feb 2022

**Project Description:**
This course management system was developed as part of the Full Stack JavaScript Techdegree at Team Treehouse. It combines a bespoke and custom-built React.js front end with a Node.js and Express.js backend to allow users to sign up, sign in, and create course records - which are then added to a database configured with the Sequelize ORM. The server-side REST API includes authentication middleware, and tailors specific request responses based on authentication and user status. Validation is offered on the front-end and server-side, as well as within the database configuration.

## Structure and notes:

- [08 Feb 2022] - Utilising the .jsx file extension for React components for better code completion.
- [08 Feb 2022] - Adopting the Airbnb React / JSX Style Guide for naming conventions https://github.com/airbnb/javascript/blob/master/react/README.md

### Build log:

- [08 Feb 2022] - Imported REST API files from Project 9 into /api directory
- [08 Feb 2022] - Initialised basic file structure with create-react-app in /client directory
- [08 Feb 2022] - Removed redundant files for project in /client directory
- [08 Feb 2022] - Added CORS support to REST API with `cors npm package`, implemented in api/app.js
- [08 Feb 2022] - Initialised client/src/config.js file to create connection config with REST API
- [09 Feb 2022] - Implemented basic data fetching for core routes
- [09 Feb 2022] - Implemented private routes and Higher-Order Components
- [10 Feb 2022] - ALTERED FOLDER / FILE STRUCTURE (_NOTE_: Update build log and documentation )
- [10 Feb 2022] - Re-seeded database
- [10 Feb 2022] - Completed core routing functionalities
- [11 Feb 2022] - Fixed some routing and navigation issues
- [12 Feb 2022] - Added more meaningful code comments
- [12 Feb 2022] - Starting css styling modifications
- [13 Feb 2022] - Removed the conditional rendering of the <CreateCourse /> component to better fit the grading rubric
- [13 Feb 2022] - Clarified routing for <SignIn /> to redirect to home page if the user is already authenticated. This fixes a bug where a user who signs up after redirecting from the sign in page is then returned to sign in after authentication.
- [13 Feb 2022] - Keep and delete confirmation dialogue redesigned with proper functionalities.
- [13 Feb 2022] - Colour scheme finalised.

## Functionalities

### Redirect Timers

[10 Feb 2022] - Added custom redirect timer for sign-in and sign-out to improve the user experience and promote system feedback. Largely self-authored, but code structure and effectiveness was later cross referenced against James Dietrich's guide on using setInterval with React Hooks: https://upmostly.com/tutorials/setinterval-in-react-components-using-hooks/. The redirect timer will fulfil a user request after the timer condition is met and the interval is cleared, but temporarily permits users to correct any accidental input errors - for instance, in the event that they accidentally click the sign out button and want to cancel this behaviour before credentials are wiped.

### Conditional public routes

[13 Feb 2022] - Sign in should only be possible if the user is not already signed in and authenticated; the expected user behaviour would involve following the sign out process before attempting to sign in with a new account. As such, the sign in page is conditionally rendered only if there are no existing authentication credentials found. If authentication credentials exist, the user is redirected to the homepage. Future revisions would instead lead the user to a prompt informing them that there is currently a user signed in, and might invite them to sign out of that account.

### Implementing Private Routes with React Router v6

Due to syntax changes with React Router v6, older methods for implementing Private Routes with <Redirect /> are no longer possible, and implementation via React Hooks uses useNavigate() rather than useHistory() to programmatically define routes. React Router v6 offers a simplified approach to rendering protected routes according to specified conditions.

General routing composition in react-router v4/5 would take the following form and structure:

```
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
  let authenticated = useAuth(); // Custom useAuth() hook to determine auth status
  return (
    <Route
      {...rest}
      render={() =>
        authenticated ?
        children
        :
        <Redirect to="/signin" />
      }
    />
  );
}

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Index} />
        <PrivateRoute path="/authenticated" component={Authenticated} />
        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  );
}

```

Where the <Switch> component renders the first child <Route> or <Redirect> that matches the location (with the Error component rendering if no matching path is found). The PrivateRoute Higher-Order Component would render a <Route> component with a render prop, which tests for authentication before conditionally rendering either the requested resource or re-directing the user to the sign-in page.

In v6, <Switch> and <Redirect> are no longer valid syntax. <Switch> is replaced with the more semantically meaningful <Routes>, and documentation recommends that redirects on initial render should be handled server-side, or moved into a <Route render> prop.

Therefore, a simplified routing structure can read as follows:

```
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
  let authenticated = useAuth(); // Custom useAuth() hook to determine auth status
  return authenticated ? children : <Navigate to="/signin" />;
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/authenticated"
          element={
            <PrivateRoute>
              <Authenticated />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  )
}
```

Note that there are three other additional updates in v6 syntax. The `exact` path is no longer valid syntax, as it is not required (all paths now match exactly by default). A route defined with path="_" uses the _ wildcard to match any url in the specified structure and renders content - so, placing it at the end of the route list ensures that any paths that do not exactly match the intended structure will render an <Error /> component. Finally, <Route>s render an element={<Element />} instead of a component={Component}. The element prop accepts a JSX Element, and accepts custom props. As noted in the React Router dev blog, the component prop would trigger a call to `createElement(component)`, which could then only accept props via a manual render prop. Rendering an element takes advantage of <Route>s children property, providing an overall cleaner structure and more maintainable approach to element nesting.

### Implementing authentication redirect

In this implementation, I've opted to provide visual feedback for the user to reinforce actions and behaviour when signing in and singing out. When the user attempts to access a private route and there is no current authentication header, it will direct them to the sign in page. After successfully signing in, they will be returned to the resource they were attempting to access.

There are again some variations on how this would be implemented under react-router v4/5 and react-router v6.

Under react-router v4, the history object allowed developers to programmatically configure routing by mutating properties in the history stack. Using the push() method on the history object would add a new entry to the history stack, and allow for redirecting. However, the history object would be passed down via props, and would require a Class Component.

```
// Pushes the "/" route to the top of the history stack, navigating that route when called.
this.props.history.push('/');

// Shifts the current location to the specific index in the history stack. Passing an argument of -1 would effectively step one back in the history stack, returning the user to the previous page (akin to going "back").
this.props.history.go(-1);
```

Under v5, the useHistory() hook would enable access to a history object within functional components, in a similar manner to in previous versions - with somewhat simplified syntax.

```
import {useHistory} from "react-router-dom";

const UserSignIn = () => {
  let history = useHistory();

  const handleCancelSignIn = () => {
    // On cancel, push the '/' route and redirect user to the homepage.
    history.push('/');
  }

  const handleSignIn = () => {
    // On sign in, go back to the previous resource.
    history.go('-1');
  }
}
```

In React Router v6, the useHistory() hook is invalid syntax and has been replaced with the useNavigate() hook.

```
import {useNavigate} from "react-router-dom";

const UserSignIn = () => {
  let history = useNavigate();

  const handleCancelSignIn = () => {
    // On cancel, push the '/' route and redirect user to the homepage.
    history('/');
  }

  const handleSignIn = () => {
    // On sign in, go back to the previous resource.
    history('-1');
  }
}
```

Whereas the useHistory() hook would return the history object and allow users to access the history stack and associated history methods, the useNavigate() hook returns a function that allows programmatic navigation. The stored function accepts a "to" value (a route), or a delta in the history stack. The "to" value can accept an optional second {replace: boolean} arg to update the history stack.

### Operating logic:

1. REST API access point is stored in client/src/utils/config/config.js
2. This is loaded into client/src/utils/Data.jsx and accessed programmatically to access the proper URL for the api requests.
3. Data.jsx is a helper class representing utility methods to send GET, POST, PUT, and DELETE requests to the REST API
4. client/src/components/Context/index.jsx contains a Higher-Order Component that returns a Provider component with application state and method / actions. It establishes context for the app.

### Logo and Icons

Converted SVG code to JSX using https://svg2jsx.com/

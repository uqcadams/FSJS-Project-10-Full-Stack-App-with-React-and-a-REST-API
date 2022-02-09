# FSJS-Project-10-Full-Stack-App-with-React-and-a-REST-API

Full Stack JavaScript Project 10 - Full Stack App with React and a REST API

## Structure and notes:

[08 Feb 2022] - Utilising the .jsx file extension for React components for better code completion.
[08 Feb 2022] - Adopting the Airbnb React / JSX Style Guide for naming conventions https://github.com/airbnb/javascript/blob/master/react/README.md

#### Redirect Timers

[10 Feb 2022] - Added custom redirect timer for sign-in and sign-out to improve user feedback. Largely self-authored, but code structure and effectiveness was later cross referenced against James Dietrich's guide on using setInterval with React Hooks: https://upmostly.com/tutorials/setinterval-in-react-components-using-hooks/

#### Implementing Private Routes with React Router v6

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
4. components/Context/index.js contains a Higher-Order Component that returns a Provider component with application state and method / actions. It establishes context for the app.

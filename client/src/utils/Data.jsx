// Import REST API config pathway
import config from "../config/config";

/** Helper class representing utility methods to create, sign up, and authenticate a user. Provides utility methods to allow the React client to communicate with the Express server */
export default class Data {
  /**
   * Defines custom GET and POST requests to the REST API
   * @param {string} path - an API endpoint (eg "/users", "/users/:id")
   * @param {string} method - an HTTP method (eg "GET", "POST", "PUT", "DELETE")
   * @param {object} body - any data associated with the quest
   * @param {boolean} requiresAuth - a boolean indicating whether authorisation is required for the resource
   * @param {object} credentials - an object containing the emailAddress and password information of the user
   * @returns {promise} - a promise that resolves to a Response object representing the response to your request
   */
  api(
    path,
    method = "GET",
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    // Configures the request pathway according to defined REST API port
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    // Check if authorisation is required
    if (requiresAuth) {
      // Encode the user credentials
      // The btoa() method creates a base-64 encoded ASCII string
      const encodedCredentials = btoa(
        `${credentials.emailAddress}:${credentials.password}`
      );

      // Add an authorization header to the options to be provided
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  async getCourses() {
    const response = await this.api(`/courses`, "GET");
    if (response.status === 200) {
      console.log(`Data.jsx - Status 200`);
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      console.log(`Data.jsx - Status 401`);
      return null;
    } else {
      console.log(`Data.jsx - New error`);
      throw new Error();
    }
  }

  async getMyCourses(userId) {
    console.log(userId);
    const response = await this.api(`/mycourses/${userId}`, "GET");
    if (response.status === 200) {
      console.log(`Data.jsx - Status 200`);
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      console.log(`Data.jsx - Status 401`);
      return null;
    } else {
      console.log(`Data.jsx - New error`);
      throw new Error();
    }
  }

  /**
   * Sends a GET request to the REST API to fetch specific course details. The params are passed to the api function, which then communicates with the REST API to finalise the request and return the requested data.
   * @param {number} id - a course ID extracted via params to be associated with a course
   * @returns {object} representing the course details for the requested course (null, if it doesn't exist)
   */
  async getCourseById(id) {
    const response = await this.api(`/courses/${id}`, "GET", null);
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  /**
   * Utilises the custom api method to perform an async operation to GET an authenticated user
   * @param {*} emailAddress -
   * @param {*} password -
   * @returns {object} - JSON object containing user credentials
   */
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, "GET", null, true, {
      emailAddress,
      password,
    });
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      console.log(`Response status from Data.jsx: `, response.status);
      return null;
    } else {
      throw new Error();
    }
  }

  /**
   * Utilises the custom api method to perform an async operation to POST a new user
   * @param {object} user - new user data to be sent to the /users endpoint
   */
  async createUser(user) {
    const response = await this.api("/users", "POST", user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      console.log("There were errors");
      return response.json().then((data) => {
        console.log(data.errors);
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  /**
   * Utilises the custom api method to perform an async operation to POST a new user
   * @param {object} user - new user data to be sent to the /users endpoint
   */
  async createCourse(course, emailAddress, password) {
    console.log(
      `You are passing these credentials in Data.jsx: `,
      emailAddress
    );
    console.log(`You are passing these credentials in Data.jsx: `, password);
    const response = await this.api("/courses", "POST", course, true, {
      emailAddress,
      password,
    });
    console.log(response);
    if (response.status === 201) {
      console.log("A course was created");
      return [];
    } else if (response.status === 400) {
      console.log("There were errors");
      return response.json().then((data) => {
        console.log(data.errors);
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  /**
   * Utilises the custom api method to perform an async operation to POST a new user
   * @param {object} user - new user data to be sent to the /users endpoint
   */
  async updateCourse(course, emailAddress, password) {
    const response = await this.api(
      `/courses/${course.id}`,
      "PUT",
      course,
      true,
      { emailAddress, password }
    );
    if (response.status === 204) {
      console.log("A course was updated");
      return [];
    } else if (response.status === 400) {
      console.log("There were errors");
      return response.json().then((data) => {
        console.log(data.errors);
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  async deleteCourse(courseId, emailAddress, password) {
    const response = await this.api(
      `/courses/${courseId}`,
      "DELETE",
      null,
      true,
      {
        emailAddress,
        password,
      }
    );
    if (response.status === 204) {
      console.log("A course was updated");
      return [];
    } else if (response.status === 400) {
      console.log("There were errors");
      return response.json().then((data) => {
        console.log(data.errors);
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
}

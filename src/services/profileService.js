import axios from "axios";

const baseUrl = "https://slsports.anuda.me/profile";
const token =
  "omHdMoX8HVao6Ui6aTfLhg8m6CNY6eNqazJFcWOl63fiJwbPg8PFYVa836xuL9uzgjhpmEuQjSDYUZFIsKg9ZN6oARoFJu5Vxl59rfOVmS19jBUqYvWVnmv4NwGaf2GX";

/**
 * searchProfiles:
 *  fetches profiles filtered by the input query string
 *  if they are supplied
 *
 * @param {string} query     string which profile should contain
 * @return {Object}          on success, result has the same status
 *                            and data as the API response
 *                           on failure, result has the same status
 *                            as the error, with data containing
 *                            the error message
 *
 */
export async function searchProfiles(query = "", accountType = "") {
  const url = baseUrl + "/search";

  let body = {};

  // add keys to body if they have been specified
  body.query = query;
  if (accountType !== "") body.accountType = accountType;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Token: token,
    },
  };

  let result = {};

  console.log("Posting with body: ");
  console.log(body);

  await axios
    .post(url, body, config)
    .then((response) => {
      result.status = response.status;

      if (response.status === 200) {
        result.data = response.data;
      } else {
        result.data = response.data.message;
      }

      console.log(result);

      // return result;
    })
    .catch((err) => {
      result.status = err.response.status;
      result.data = err.response.data.message;

      // return result;
    });

  return result;
}

/**
 * advancedSearchProfiles:
 *  fetches profiles filtered by the input params
 *  if they are supplied
 *
 * @param {string} firstName first name of a profile
 * @param {string} lastName  last name of a profile
 * @param {string} preferredName preferred name of a profile
 * @return {Object}          on success, result has the same status
 *                            and data as the API response
 *                           on failure, result has the same status
 *                            as the error, with data containing
 *                            the error message
 *
 */
export async function advancedSearchProfiles(
  firstName = "",
  lastName = "",
  preferredName = ""
) {
  const url = baseUrl + "/advanced-search";

  let body = {};

  // add keys to body if they have been specified
  if (firstName !== "") body.firstName = firstName;
  if (lastName !== "") body.lastName = lastName;
  if (preferredName !== "") body.preferredName = preferredName;

  const config = {
    headers: {
      "Content-Type": "application/json",
      Token: token,
    },
  };

  let result = {};

  await axios
    .post(url, body, config)
    .then((response) => {
      result.status = response.status;

      if (response.status === 200) {
        result.data = response.data;
      } else {
        result.data = response.data.message;
      }

      console.log(result);

      // return result;
    })
    .catch((err) => {
      result.status = err.response.status;
      result.data = err.response.data.message;

      // return result;
    });

  return result;
}

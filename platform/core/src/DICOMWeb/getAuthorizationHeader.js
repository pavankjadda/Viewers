import user from '../user';

/**
 * Returns the Authorization header as part of an Object.
 *
 * @export
 * @param {Object} [server={}]
 * @param {Object} [server.requestOptions]
 * @param {string|function} [server.requestOptions.auth]
 * @returns {Object} { Authorization }
 */
export default function getAuthorizationHeader({ requestOptions } = {}) {
  const headers = {};

  // Check for OHIF.user since this can also be run on the server
  const accessToken = user && user.getAccessToken && user.getAccessToken();

  // Auth for a specific server
  if (requestOptions && requestOptions.auth) {
    if (typeof requestOptions.auth === 'function') {
      // Custom Auth Header
      headers.Authorization = requestOptions.auth(requestOptions);
    } else {
      // HTTP Basic Auth (user:password)
      headers.Authorization = `Basic ${btoa(requestOptions.auth)}`;
    }
  }
  // Auth for the user's default
  else if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  headers.Authorization = `Bearer eyJraWQiOiJiZWNlNDY4ZmI4ZWFmMjEzZDU4YjJiZTFhMmU3NTE4M2QxZWRiNGZhIiwiYWxnIjoiUlMyNTYifQ.eyJhdWQiOiJodHRwczovL2hlYWx0aGNhcmUuZ29vZ2xlYXBpcy5jb20vIiwiaXNzIjoibWliLWFpci1zZXJ2aWNlLWFjY291bnRAbmloLW5jaS1jY3ItZGljb20tc2JveC0zNGFkLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoibWliLWFpci1zZXJ2aWNlLWFjY291bnRAbmloLW5jaS1jY3ItZGljb20tc2JveC0zNGFkLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwiaWF0IjoxNjQ1NzU2ODM1LCJleHAiOjE2NDU3NTc0MzV9.Qhvfl77cRBqVBDFUv1E1l7XmeGeMDTkRoRaqbtPajZEANf57bDAD2iu-v2fhlmc02N1EIy_x7U4ItRxB5KjWbhZTGLf6gZKX9zHpRGJR9zCpwk3wUfUsCfxNPQD_vT0-JAlHvatYXhjW_Tm_KeWz9A0R8Ioktfb3Jr3E3pEqVgGmGdJ8wdkjuzM6twJowZ4-X7eeOzI_M_Iaka5_1YjERI4mL0Dh6xhpM-4NYdSsrafGWtYUhtilOc9koDoOD4E7Wg7GBC3jzVriEmpI-TK5IG5vb0FmxB0JQZCVpYNaYNV_4X9RKYhbduoXaskuo2qT7cMiVJUyEXlJqcJNLQq4lA`;
  return headers;
}

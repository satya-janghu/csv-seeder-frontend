export default {
  async fetch(request) {
    // Define your simple password
    const password = "doodoo";

    // Check for the Authorization header
    const authHeader = request.headers.get("Authorization");

    // If the Authorization header is missing or incorrect
    if (!authHeader || authHeader !== `Basic ${btoa(`user:${password}`)}`) {
      return new Response("Unauthorized", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Restricted Area"',
        },
      });
    }

    // If authorized, pass the request to the React app
    return fetch(request);
  },
};

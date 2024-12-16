// middleware.js
export function middleware(req) {
  const basicAuth = req.headers.get("authorization");

  // Check if Authorization header exists and is valid
  if (basicAuth) {
    const [username, password] = atob(basicAuth.split(" ")[1]).split(":");
    if (username === "satya" && password === "doodoo") {
      return new Response(null, { status: 200 }); // Allow access
    }
  }

  // If auth fails, return 401 response with Basic Auth challenge
  return new Response("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}

// Apply middleware to all routes
export const config = {
  matcher: "/:path*",
};

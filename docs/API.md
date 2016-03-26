# API Documentation

## Events API

- /api/events
  - GET: Returns all the events.
  - POST: Creates a new event.
- /api/events/:slug
  - GET: Returns the slug event.
  - POST: Update the slug event.
  - DELETE: Delete the slug event.
- /api/events/:slug/start
  - GET: Start the event sign up.
- /api/events/:slug/end
  - GET: End the event sign up.
- /api/events/:slug/state
  - GET: Current State of signup of slug event.
- /api/events/:slug/signup
  - POST: Add user to signup list.

# API Documentation

## Events API

- /api/events
  - GET: Returns all the events.
  - POST: Creates a new event.
- /api/events/:slug
  - GET: Returns the slug event.
  - POST: Update the slug event.
  - DELETE: Delete the slug event.
- /api/events/:slug/state
  - GET: Current State of Sign Up of slug event.
  - POST: Change current Sign Up state.
- /api/events/:slug/signup
  - POST: Add user to signup list.
- /api/events/:slug/picture
  - GET: Get the cover image of the event.

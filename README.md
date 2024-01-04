<h1 align="center" id="title">Reserve</h1>

<p align="center"><img src="https://socialify.git.ci/lokeshkavisth/reserve/image?font=Inter&amp;forks=1&amp;issues=1&amp;language=1&amp;name=1&amp;owner=1&amp;pattern=Plus&amp;pulls=1&amp;stargazers=1&amp;theme=Auto" alt="project-image">

<p id="description">Reserve is a sophisticated MERN (MongoDB Express.js React Node.js) stack project designed to revolutionize the bus reservation process. The platform caters to both travellers and bus operators offering a seamless experience for booking trips and listing buses.

<p align="center"><img src="https://img.shields.io/maintenance/yes/2024" alt="shields"> <img src="https://img.shields.io/website?url=https%3A%2F%2Freserve-your-bus.vercel.app" alt="shields"> <img src="https://img.shields.io/github/contributors/lokeshkavisth/Reserve" alt="shields">

## Features

- User authentication: Sign up, sign in, and secure access to features.
- Trip Booking: Users can browse and book trips.
- Bus/ Trip Listing: Owners can list their buses or trips.
- Filtering: Users can filter buses based on various criteria like time, date, location, amenities, and categories.
- Payment Integration: Integrated with Stripe for secure payment processing.
- Responsive Design: Optimized for various devices.

## Technologies Used

Frontend

- **React:** JavaScript library for building user interfaces.
- **Redux:** State management library for React.
- **React Router:** Declarative routing for React.js.
- **Firebase:** Authentication and cloud services.
- **Stripe:** Payment processing API.
- **Axios:** Promise-based HTTP client.

Backend

- **Node.js:** JavaScript runtime for server-side development.
- **Express:** Web application framework for Node.js.
- **MongoDB:** NoSQL database for storing data.
- **Mongoose:** ODM library for MongoDB and Node.js.
- **Stripe:** Payment processing API.
- **Cors:** Middleware for enabling CORS in Express.
- **Dotenv:** Environment variable management.

## Installation Steps

1. Clone the repository

```
git clone https://github.com/lokeshkavisth/Reserve
```

```
cd frontend
```

3. install dependencies

```
npm install
```

4. Create a .env file in the backend directory and set the following environment variables

```
VITE_STRIPE_PUBLISHABLE_KEY
```

```
VITE_BASE_URL
```

6. Run the development server

```
npm run dev
```

7. In a new terminal navigate to the root directory of the project

```
cd backend
```

8. Install dependencies

```
npm install
```

9. Create a .env file in the backend directory and set the following environment variables

```
PORT
```

```
MONGODB_URI
```

```
STRIPE_SECRET_KEY
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](/LICENSE.md) file for details.

## Contributors

Feel free to contribute or report issues!

Happy coding!

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';  // Nueva importación
import createShelterConnect from './server/config/ConnectMongodb-shelter.js';
import * as movieRoutes from './server/routes/RoutesMovie.js';
import * as reviewRoutes from './server/routes/RoutesReview.js';
import * as userRoutes from './server/routes/RoutesUser.js';

const app = express();
const port = 8110;
/*
const corsOptions = {
    credentials: true, // Allow credentials (cookies) to be sent to/from origin
    origin: 'http://localhost:3000', // Allow only this origin
    methods: 'GET, POST, PUT, DELETE', // Allow these methods
    // allowedHeaders: 'Content-Type, Authorization', // Allow these headers
};
*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(cookieParser());

createShelterConnect();

app.use(userRoutes.router);
app.use(movieRoutes.router);
app.use(reviewRoutes.router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

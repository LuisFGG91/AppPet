import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';
import createShelterConnect from './server/config/ConnectMongodb-shelter.js';
import * as PetRoutes from './server/routes/RoutesPet.js';
import * as UserRoutes from './server/routes/RoutesUser.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = 8110;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

createShelterConnect();

app.use((req, res, next) => {
    req.io = io;
    next();
});


app.use(UserRoutes.router);
app.use(PetRoutes.router);

io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);
    socket.on('adoptPet', (petId) => {
        io.emit('updatePets', updatedPets);
    });

    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
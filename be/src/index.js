import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from '../app/routes/auth.routes';
import postRoutes from '../app/routes/post.routes';


import { mongoURI } from '../config/config';


const app = express();
const port = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(cors());

mongoose.set('useCreateIndex', true)
mongoose.Promise = global.Promise


authRoutes(app);
postRoutes(app);

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to Database");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

app.listen(port, '0.0.0.0', () => {
    console.log('Backend is running on port: ' + port)
})
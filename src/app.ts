import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan';
import path from 'path';
import recipeRoutes from  './routes/recipeRoutes';
import userRoutes from './routes/userRoutes';
import commentRoutes from './routes/commentRoutes'
import { db } from './models';

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../src/public')));

const cors = require('cors');

app.use(cors());

app.use('/api/recipe', recipeRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/users', userRoutes)


app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).render('error', {
        message: "This is not the URL you are looking for!"
    });
});

// Syncing our database
db.sync().then(() => {
    console.info("connected to the database!")
});

app.listen(3000);
import express, { Express, Request, Response } from 'express';

const app: Express = express();
app.use(express.json());

app.post('/', (req: Request, res: Response) => {
    console.log(req.body);
    res.status(200).send('ok');
});

app.listen(5123, () => console.log('app is running'));

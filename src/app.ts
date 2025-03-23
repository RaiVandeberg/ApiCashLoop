import express from 'express';
import cors from 'cors';

import { errorHandling } from './middlewares/error-handling';
import { z } from "zod"

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    const BodySchema = z.object({
        age: z.number().min(18),
    })

    const { age } = BodySchema.parse(req.body);
    res.send("Hello World!");
})

app.use(errorHandling);

export { app }

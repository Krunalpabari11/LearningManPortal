import express from 'express';
import { create } from './controller/createcontroller.js';
import { getController } from './controller/getcontroller.js';
import { getAllController } from './controller/getcontroller.js';
import { deleteController } from './controller/deleteController.js';
import { updateController } from './controller/updatecontroller.js';
const app = express();
app.use(express.json());  // Middleware to parse JSON bodies

app.post('/org/create', create);
app.get('/org/get/:orgname',getController)
app.get('/org/delete/:orgname',deleteController)
app.get('/org/get',getAllController)
app.get('/org/update',updateController)
app.listen(5002, () => {
    console.log('Server listening on port 5002');
});

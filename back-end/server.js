import express from 'express';
import data from './data';
import cors from 'cors';
const app = express();
import dotenv from 'dotenv';
import mongoose from "mongoose";

import url from "./config";
import userRoute from "./routes/userRoute";

dotenv.config()
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoute)

// CONNECTION TO THE DB

const mongodbUrl = url.MONGODB_URL
mongoose.connect(mongodbUrl, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
	.then(() => console.log('connected to the db !'))
	.catch(error => console.log(error))

// CODING THE SERVER

app.get('/api/products', (req, res) => {
	res.send(data.products)
});

app.get('/api/products/:id', (req, res) => {
	const productId = req.params.id
	const product = data.products.find(product => product._id === productId);
	if (product) {
		res.send(product)
	} else {
		res.status(404).send({msg: "Product Not Found"});
	}
})


// CONNECTING TO THE SERVER

const port = 5000 || process.env.PORT;
app.listen(port, () => {
	console.log(`Server started on port : ${port}`);
})

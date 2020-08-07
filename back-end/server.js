import express from 'express';
import data from './data';
import cors from 'cors';
const app = express();

app.use(cors());

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


const port = 5000 || process.env.PORT;
app.listen(port, () => {
	console.log(`Server started on port : ${port}`);
})

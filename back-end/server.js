import express from 'express';
import data from './data';
const app = express();

app.get('/api/products', (req, res) => {
	res.send(data.products)
});


const port = 5000 || process.env.PORT;
app.listen(port, () => {
	console.log(`Server started on port : ${port}`);
})

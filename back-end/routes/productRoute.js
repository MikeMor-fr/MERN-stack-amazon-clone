import express from 'express';
import Product from "../models/productModel";
import { isAdmin, isAuth } from "../util";

const router = express.Router();

router.get("/", async (req, res) => {
	const products = await Product.find({});
	res.send(products);
})

router.get("/:id", async (req, res) => {
	const product = await Product.findOne({_id: req.params.id});
	if (product) {
		res.send(product);
	} else {
		res.status(404).send({msg: "Product not found"})
	}
	
})

router.post("/", async (req, res) => {

	const product = new Product({
		name: req.body.name,
		image: req.body.image,
		brand: req.body.brand,
		category: req.body.category,
		description: req.body.description,
		rating: req.body.rating,
		countInStock: req.body.countInStock,
		numReviews: req.body.numReviews,
		price: req.body.price,
	});

	const newProduct = await product.save();

	if (newProduct) {
		return res.status(201).send({ msg: "New product created", data: newProduct })

	} else {
		res.status(500).send({ msg: "Error in creating product" })
	}

});

router.put("/:id", async (req, res) => {

	const productId = req.params.id;
	const product = await Product.findOne({_id: productId});

	if (product) {
		product.name = req.body.name;
		product.image = req.body.image;
		product.brand = req.body.brand;
		product.category = req.body.category;
		product.description = req.body.description;
		product.price = req.body.price;
	}

	const updatedProduct = await product.save();

	if (updatedProduct) {
		return res.status(200).send({ msg: "Product Updated", data: updatedProduct })

	} else {
		res.status(500).send({ msg: "Error in updating product" })
	}
});

router.delete("/:id", async (req, res) => {

	const deletedProduct = await Product.findById(req.params.id);

	if (deletedProduct) {
		await deletedProduct.remove();
		res.send({msg: "Product deleted"})
	} else {
		res.send("Error in Deletion");
	}

});


export default router;
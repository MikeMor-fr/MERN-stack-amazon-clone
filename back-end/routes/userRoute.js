import express from 'express';
import User from "../models/userModel";
import {getToken} from "../util";

const router = express.Router();


// SIGNIN
router.post("/signin", async (req, res) => {

	const signinUser = await User.findOne ({
		email: req.body.email,
		password: req.body.password
	})

	if  (signinUser) {
		res.send({
			_id: signinUser._id,
			name: signinUser.name,
			email: signinUser.email,
			isAdmin: signinUser.isAdmin,
			token: getToken(signinUser)
		})

	} else {
		res.status(401).send("Invalid Email or Password");
	}
})

// REGISTER
router.post("/register", async (req, res) => {

	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	});

	const newUser = await user.save()

	if  (newUser) {
		res.send({
			_id: newUser._id,
			name: newUser.name,
			email: newUser.email,
			isAdmin: newUser.isAdmin,
			token: getToken(newUser)
		})

	} else {
		res.status(401).send("Invalid User Data");
	}
})

router.get("/createadmin", async (req, res) => {

	try {
		const user = new User({
			name: 'Basir',
			email: "myameil",
			password: "123",
			isAdmin: true
		});

		const newUser = await user.save();
		res.send(newUser);

	} catch(error) {
		res.send(error);

	}
})

export default router;
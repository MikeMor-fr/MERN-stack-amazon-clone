export default {
	MONGODB_URL: process.env.DATABASE_URL || "mongodb://localhost:27017/amazonia",
	JWT_SECRET: process.env.JWT_SECRET || "somethingsecret"
}
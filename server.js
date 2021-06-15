const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const multiparty = require("connect-multiparty");
const path = require("path");
const fs = require("fs");

const MultipartyMiddleware = multiparty({ uploadDir: "./images" });
require("dotenv").config();
const PORT = process.env.PORT || 5000;

// Express App
const app = express();

// Middle Ware Cookie Parser
app.use(cookieParser());

// Middle Ware Body Parser
app.use(express.json());

// DB Connection
mongoose.connect(
	process.env.MONGODB_CONNECTION_STRING,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => {
		console.log("Mongo DB connected Successfully");
	}
);

app.use(express.static("uploads"));

app.post("/uploads", MultipartyMiddleware, (req, res) => {
	var TempFile = req.files.upload;
	var TempPathFile = TempFile.path;
	const targetPathUrl = path.join(__dirname, "./uploads/" + TempFile.name);
	if (
		path.extname(TempFile.originalFilename).toLowerCase() === ".png" ||
		".jpg" ||
		".jpeg" ||
		".svg"
	) {
		fs.rename(TempPathFile, targetPathUrl, err => {
			if (err) return console.log(err);
			res.status(200).json({
				uploaded: true,
				url: `${TempFile.originalFilename}`,
			});
		});
	}
	// console.log(req.files.upload);
});

// Routes
const userRouter = require("./routes/User");
app.use("/user", userRouter);

// Listen To Server
app.listen(PORT, () => {
	console.log("Server is running on port ------->>> ", PORT);
});

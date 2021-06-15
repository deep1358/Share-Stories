const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
require("dotenv").config();
const passportConfig = require("../config/passport");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const User = require("../models/UserModel");
const Story = require("../models/StoryModel");
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");
const { OAuth2Client } = require("google-auth-library");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const signToken = userID => {
	return JWT.sign(
		{
			iss: "ShareStories",
			sub: userID,
		},
		process.env.JWT_SECRET_OR_KEYS,
		{ expiresIn: "2000h" }
	);
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

userRouter.post("/googleauth", (req, res) => {
	const { tokenId } = req.body;
	client
		.verifyIdToken({
			idToken: tokenId,
			audience: process.env.GOOGLE_CLIENT_ID,
		})
		.then(response => {
			console.log(response);
			const { email_verified, name, email, picture } = response.payload;
			if (email_verified) {
				User.findOne({ email }).exec((err, user) => {
					if (err)
						res.status(500).json({
							message: { msgBody: "Error has occured", msgError: true },
						});
					if (user) {
						const token = signToken(user._id);
						console.log(token);
						res.cookie("access_token", token, {
							httpOnly: true,
							sameSite: true,
						});
						res.status(200).json({
							isAuthenticated: true,
							user: {
								_id: user._id,
								username: user.username,
								email: user.email,
								picture: user.picture,
								date: user.date,
							},
							message: {
								msgBody: "You are Logged in Successfully!",
								msgError: false,
							},
						});
					} else {
						let password = email + process.env.JWT_SECRET_OR_KEYS;
						let newUser = new User({
							username: name,
							email,
							password,
							picture,
							date,
							isVerified: true,
						});
						newUser.save((err, user) => {
							if (err) {
								res.status(400).json({
									message: { msgBody: "Error has occured", msgError: true },
								});
							}

							const token = signToken(user._id);
							console.log(token);
							res.cookie("access_token", token, {
								httpOnly: true,
								sameSite: true,
							});
							res.status(200).json({
								isAuthenticated: true,
								user: {
									_id: user._id,
									username: user.username,
									email: user.email,
									picture: user.picture,
									date: user.date,
								},
								message: {
									msgBody: "You are Logged in Successfully!",
									msgError: false,
								},
							});
						});
					}
				});
			}
		});
});

userRouter.post("/register", (req, res) => {
	const { username, email, password, confirmPassword } = req.body;
	if (password !== confirmPassword) {
		res.status(400).json({
			message: { msgBody: "Password does not match", msgError: true },
		});
	} else {
		User.findOne({ email }, async (err, user) => {
			if (err)
				res
					.status(500)
					.json({ message: { msgBody: "Error has occured", msgError: true } });
			if (user)
				res.status(400).json({
					message: {
						msgBody: "User of this Email already exists",
						msgError: true,
					},
				});
			else {
				const emailToken = crypto.randomBytes(64).toString("hex");
				const isVerified = false;
				const newUser = new User({
					username,
					email,
					password,
					emailToken,
					isVerified,
				});
				const msg = {
					from: "legally834@gmail.com",
					to: email,
					subject: "Please Verify Your Email Here!",
					html: `
						<h1>Hello ${username}</h1>
						<h4>Thanks For Registeration in Our Website</h4>
						<a href="http://${req.headers.host}/user/verify-email?token=${emailToken}/">Please Verify Your Email Here</a>
					`,
				};
				try {
					await sgMail.send(msg);
					newUser.save(err => {
						if (err)
							res.status(500).json({
								message: { msgBody: "Error has occured", msgError: true },
							});
						else {
							res.status(201).json({
								message: {
									msgBody: "Please Verify Your Email to Login",
									msgError: false,
								},
							});
						}
					});
				} catch (e) {
					return res.status(400).json({
						message: { msgBody: "Invalid Email", msgError: true },
					});
				}
			}
		});
	}
});

userRouter.get("/verify-email", (req, res) => {
	const emailToken = req.query.token.slice(0, -1);
	// const user = User.findOne({ emailToken });
	User.findOneAndUpdate(
		{ emailToken },
		{ $set: { emailToken: null, isVerified: true } },
		{ new: true },
		(err, doc) => {
			if (err) {
				console.log(err);
			}

			if (doc) {
				// res.send(`<h1>Your Email has been Verified SuccessFully!</h1>
				// 		<a href="http://localhost:3000/signin">Login</a>
				res.redirect("http://localhost:3000/signin");
				// `);
			} else {
				res.send("Invalid Url");
			}
		}
	);
});

userRouter.post("/login", (req, res) => {
	const { email, password } = req.body;
	// console.log(email);
	User.findOne({ email }, (err, user) => {
		// console.log(user);
		if (err) console.log(err);
		else if (!user) {
			return res.status(202).json({
				isAuthenticated: false,
				user: { username: "", email: "", picture: "" },
				message: {
					msgBody: "No User Found, Please Register !",
					msgError: true,
				},
			});
		} else if (!user.isVerified) {
			return res.status(201).json({
				isAuthenticated: false,
				user: { username: "", email: "", picture: "" },
				message: {
					msgBody: "Please Verify Your Email First !",
					msgError: true,
				},
			});
		} else {
			bcrypt.compare(password, user.password, (err, isMatch) => {
				if (err)
					return res.status(500).json({
						message: { msgBody: "Error has occured here", msgError: true, err },
					});
				else {
					if (!isMatch)
						return res.status(202).json({
							isAuthenticated: false,
							user: { username: "", email: "", picture: "" },
							message: {
								msgBody: "Wrong Password!",
								msgError: true,
							},
						});
					else {
						const token = signToken(user._id);
						// httpOnly : For protecting against cross site scripting attack You can not access token using js
						// sameSite : For protecting against cross site request foregery attack
						res.cookie("access_token", token, {
							httpOnly: true,
							sameSite: true,
						});
						return res.status(200).json({
							isAuthenticated: true,
							user: {
								_id: user._id,
								username: user.username,
								email: user.email,
								picture: user.picture,
								date: user.date,
							},
							message: {
								msgBody: "You are Logged in Successfully!",
								msgError: false,
							},
						});
					}
				}
			});
		}
	});
});

userRouter.get(
	"/logout",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		res.clearCookie("access_token");
		res.json({
			user: { username: "", email: "", picture: "", date: "" },
			success: true,
		});
	}
);

userRouter.get(
	"/authenticated",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const { _id, username, email, picture, date } = req.user;
		res.status(200).json({
			isAuthenticated: true,
			user: { _id, username, email, picture, date },
		});
	}
);

userRouter.post(
	"/createstory",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		var { storyTitle, storyCategory, story, picture } = req.body;
		// console.log(storyTitle);
		// console.log(storyCategory);
		// console.log(story);
		if (!story) {
			return res.status(400).json({
				message: {
					msgBody: "Story Content can not be empty!",
					msgError: true,
				},
			});
		} else if (!storyTitle) {
			return res.status(400).json({
				message: { msgBody: "Story Title can not be empty!", msgError: true },
			});
		} else if (!storyCategory) {
			return res.status(400).json({
				message: { msgBody: "Please Select Story Category!", msgError: true },
			});
		} else {
			const newStory = new Story({
				userID: req.user._id,
				userName: req.user.username,
				userEmail: req.user.email,
				userPicture: req.user.picture,
				story: story,
				storyTitle: storyTitle,
				storyCategory: storyCategory,
			});
			newStory.save(err => {
				if (err)
					res.status(500).json({
						message: { msgBody: "Error has occured here", msgError: true, err },
					});
				else {
					req.user.stories.push(newStory);
					req.user.save(err => {
						if (err)
							res.status(500).json({
								message: { msgBody: "Error has occured Now", msgError: true },
							});
						else
							res.status(200).json({
								storyId: newStory._id,
								message: {
									msgBody: "Story created Successfully",
									msgError: false,
								},
							});
					});
				}
			});
		}
	}
);

userRouter.get(
	"/stories",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		User.findById({ _id: req.user._id })
			.populate("stories")
			.exec((err, document) => {
				if (err)
					res.status(500).json({
						message: { msgBody: "Error has occured", msgError: true },
					});
				else {
					res
						.status(200)
						.json({ stories: document.stories, authenticated: true });
				}
			});
	}
);

userRouter.delete(
	"/deletestory/:_id",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		Story.findByIdAndRemove(req.params._id, (err, data) => {
			if (err)
				res.status(500).json({
					message: { msgBody: "Error has occured", msgError: true },
				});
			if (data) {
				User.findOneAndUpdate(
					{ _id: req.user._id },
					{ $pullAll: { stories: [data._id] } },
					{ new: true },
					function (err, userData) {
						if (err)
							res.status(500).json({
								message: { msgBody: "Error has occured", msgError: true },
							});
						if (userData) {
							res.status(200).json({
								message: {
									msgBody: "Story Deleted Successfully !",
									msgError: false,
								},
							});
						}
					}
				);
			} else {
				res.status(400).json({
					message: { msgBody: "Invalid ID", msgError: true },
				});
			}
		});
	}
);

// userRouter.post(
// 	"/createstory",
// 	passport.authenticate("jwt", { session: false }),
// 	(req, res) => {
// 		const story = new Story(req.body);
// 		story.save(err => {
// 			if (err)
// 				res
// 					.status(500)
// 					.json({ message: { msgBody: "Error has occured", msgError: true } });
// 			else {
// 				req.user.stories.push(story);
// 				req.user.save(err => {
// 					if (err)
// 						res.status(500).json({
// 							message: { msgBody: "Error has occured", msgError: true },
// 						});
// 					else
// 						res.status(200).json({
// 							message: {
// 								msgBody: "Successfully created Story",
// 								msgError: false,
// 							},
// 						});
// 				});
// 			}
// 		});
// 	}
// );

userRouter.get("/story/:_id", (req, res) => {
	Story.findOne({ _id: req.params._id }, (err, story) => {
		if (err)
			return res.status(400).json({
				message: { msgBody: "Error has occured", msgError: true },
			});
		if (story)
			res.status(200).json({
				story: story,
				message: {
					msgBody: "Story Loaded Successfully !",
					msgError: false,
				},
			});
		if (!story)
			res.status(400).json({
				message: { msgBody: "Story Not Found!", msgError: true },
			});
	});
});

userRouter.put(
	"/like",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		if (req.user) {
			Story.findByIdAndUpdate(
				req.body.storyId,
				{
					$push: { storyClaps: req.user._id },
				},
				{
					new: true,
				},
				function (err, result) {
					if (err) {
						return res
							.status(422)
							.json({ message: { msgBody: err, msgError: true } });
					} else {
						return res.status(200).json({
							result,
							message: { msgBody: "Liked the Story", msgError: true },
						});
					}
				}
			);
		} else {
			return res.status(422).json({
				message: {
					msgBody: "Please Login to Appreciate the Story",
					msgError: true,
				},
			});
		}
	}
);

userRouter.put(
	"/unlike",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		if (req.user) {
			Story.findByIdAndUpdate(
				req.body.storyId,
				{
					$pull: { storyClaps: req.user._id },
				},
				{
					new: true,
				},
				function (err, result) {
					if (err) {
						return res
							.status(422)
							.json({ message: { msgBody: err, msgError: true } });
					} else {
						return res.status(200).json({
							result,
							message: { msgBody: "Disliked the Story", msgError: true },
						});
					}
				}
			);
		} else {
			return res.status(422).json({
				message: {
					msgBody: "Please Login to Appreciate the Story",
					msgError: true,
				},
			});
		}
	}
);

userRouter.put(
	"/comment",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const comment = {
			comment: req.body.comment,
			postedBy: req.user._id,
			name: req.user.username,
			userPicture: req.user.picture,
		};
		Story.findByIdAndUpdate(
			req.body.storyId,
			{
				$push: { comments: comment },
			},
			{
				new: true,
			}
		)
			.populate("comment.postedBy", "_id username userPicture")
			.exec((err, result) => {
				if (err)
					return res.status(422).json({
						message: {
							msgBody: err,
							msgError: true,
						},
					});
				else return res.json(result);
			});
	}
);

userRouter.get("/allStories", (req, res) => {
	Story.find({}, (err, data) => {
		if (err)
			return res.status(401).json({
				message: {
					msgBody: "Something went wrong",
					msgError: true,
				},
			});
		return res.status(200).json({
			data,
			message: { msgBody: "Fetched all Data", msgError: false },
		});
	});
});

module.exports = userRouter;

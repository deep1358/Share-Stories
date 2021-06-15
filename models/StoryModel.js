const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const StorySchema = new mongoose.Schema({
	userID: {
		type: String,
	},
	userName: {
		type: String,
	},
	userEmail: {},
	userPicture: {
		type: String,
		default: "",
	},
	storyTitle: {
		type: String,
		required: true,
	},
	storyCategory: {
		type: String,
		required: true,
	},
	comments: [
		{
			name: String,
			comment: String,
			userPicture: String,
			postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
			date: {
				type: Date,
				default: Date.now,
			},
		},
	],
	storyClaps: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	story: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Story", StorySchema);

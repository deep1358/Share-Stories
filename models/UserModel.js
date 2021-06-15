const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
mongoose.set("useFindAndModify", false);
const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	emailToken: {
		type: String,
	},
	isVerified: {
		type: Boolean,
		required: true,
	},
	picture: {
		type: String,
		default: "",
	},
	password: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	stories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Story" }],
});

UserSchema.pre("save", function (next) {
	if (!this.isModified("password")) return next();
	bcrypt.hash(this.password, 10, (err, passwordHash) => {
		if (err) return next(err);
		this.password = passwordHash;
		next();
	});
});

// UserSchema.methods.comparePassword = function (password, cb) {
// 	bcrypt.compare(password, this.password, (err, isMatch) => {
// 		if (err) return cb(err);
// 		else {
// 			// If password not match
// 			if (!isMatch) return cb(null, isMatch);
// 			// If password match
// 			return cb(null, this);
// 		}
// 	});
// };

module.exports = mongoose.model("User", UserSchema);

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
// var GoogleStrategy = require("passport-google-oauth2").Strategy;
require("dotenv").config();
const User = require("../models/UserModel");

const cookieExtractor = req => {
	let token = null;
	if (req && req.cookies) {
		token = req.cookies["access_token"];
	}
	return token;
};

// Authorization using JWT Strategy
passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: cookieExtractor,
			secretOrKey: process.env.JWT_SECRET_OR_KEYS,
		},
		(payload, done) => {
			User.findById({ _id: payload.sub }, (err, user) => {
				if (err) return done(err, false);
				if (user) return done(null, user);
				else return done(null, false);
			});
		}
	)
);

// passport.use(
// 	new GoogleStrategy(
// 		{
// 			clientID: process.env.GOOGLE_CLIENT_ID,
// 			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// 			callbackURL: "http://localhost:5000/user/auth/google/callback",
// 			passReqToCallback: true,
// 		},
// 		function (request, accessToken, refreshToken, profile, done) {
// 			console.log(profile);
// 			// User.findOrCreate({ googleId: profile.id }, function (err, user) {
// 			// var userData = {
// 			// 	email: user.emails[0].value,
// 			// 	name: user.displayName,
// 			// 	token: accessToken,
// 			// };
// 			return done(err, profile);
// 			// });
// 		}
// 	)
// );

// Authentication using Local Strategy
// passport.use(
// 	new LocalStrategy((username, password, done) => {
// 		User.findOne({ username }, (err, user) => {
// 			// Verify User Email
// 			if (user.isVerified === false)
// 				return done("Please Verify Your Email!", false);
// 			// When Something went wrong with Database
// 			if (err) return done(err);
// 			// If No user Exists
// 			if (!user) return done(null, false);
// 			// Check if password is Correct
// 			user.comparePassword(password, done);
// 		});
// 	})
// );

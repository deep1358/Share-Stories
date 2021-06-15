import React from "react";
import { Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import motivationImage from "./motivation.jpg";
import "./Story.css";

function Story({
	date,
	claps,
	story,
	title,
	category,
	username,
	userPicture,
	storyId,
}) {
	var history = useHistory();
	const readStory = () => {
		history.push("/" + storyId);
	};
	var op;
	var image;
	if (story.includes("<img")) {
		var i = story.split('<img src="')[1];
		image = i.split('"')[0];
	}
	if (image === undefined) {
		if (category === "Education")
			op =
				"https://static.vecteezy.com/system/resources/previews/001/217/195/non_2x/e-learning-online-education-vector.jpg";
		if (category === "Kid")
			op =
				"https://www.kindpng.com/picc/m/61-614052_gorilla-kids-logo-logo-kids-png-transparent-png.png";
		if (category === "History")
			op =
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMkqt_scunTNXiyTFtXONzA30DDctpF8gW8w&usqp=CAU";
		if (category === "Phylosophy")
			op =
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_kEXBvY0tNs9i6LNpbX6opFBSoOtwv16Ygg&usqp=CAU";
		if (category === "Motivation") op = motivationImage;
		if (category === "Life Experiance")
			op =
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRbBhY5jE8dKug3DHQfmxg631hN_No72ME1w&usqp=CAU";
	}
	return (
		<div className="explore-story" onClick={readStory}>
			<div className="first">
				{image !== undefined ? (
					<img src={image} alt="img" />
				) : (
					<img src={op} alt="img" />
				)}
			</div>
			<div className="second">
				<p>{category}</p>
				<p>{date.slice(0, 10)}</p>
			</div>
			<div className="third">
				<h3>
					{title.slice(0, 55)}
					{title.length > 55 && "..."}
				</h3>
			</div>
			<div className="fourth">
				<div className="fourth-user-info">
					{userPicture === "" ? (
						<Avatar>{username[0]}</Avatar>
					) : (
						<Avatar src={userPicture} alt={username} />
					)}
					<p>{username}</p>
				</div>
				<div>
					<img
						alt="appreciation"
						src="https://img.icons8.com/ios/50/000000/applause.png"
					/>
					<p>{claps.length}</p>
				</div>
			</div>
		</div>
	);
}

export default Story;

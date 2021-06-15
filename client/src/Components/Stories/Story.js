import React, { useState } from "react";
import "./Story.css";
import { Avatar } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import { useHistory } from "react-router-dom";
import Loader1 from "../Loder1/Loader1";

const Story = ({
	username,
	useremail,
	userPicture,
	date,
	storyTitle,
	storyCategory,
	storyId,
	story,
	storyClaps,
	storyComments,
	deleteStory,
}) => {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const [loading, setLoading] = useState(false);

	const history = useHistory();

	var d = new Date(date);
	var date1 = d.getDate();
	var month = months[d.getMonth()];
	var year = d.getFullYear();

	const readStory = storyId => {
		history.push(storyId);
	};

	setTimeout(() => {
		setLoading(true);
	}, 1000);

	return (
		<>
			<div className="story">
				{!loading ? (
					<Loader1 />
				) : (
					<>
						<div className="story-header">
							<div className="story-header-avatar">
								{userPicture === "" ? (
									<Avatar>{username[0]}</Avatar>
								) : (
									<Avatar src={userPicture} alt={username} />
								)}
							</div>

							<div className="story-header-date">
								Written On {date1} {month} {year}
							</div>
						</div>
						<div className="story-category"> Category: {storyCategory} </div>
						<div className="story-title">{storyTitle}</div>
						<div className="story-footer">
							<div className="story-footer-author">Written By {username}</div>
							<div className="story-footer-button">
								<div className="story-footer-delete-button">
									<Button
										onClick={() => deleteStory(storyId)}
										variant="contained"
										color="alert"
										endIcon={<DeleteIcon />}>
										Delete
									</Button>
								</div>
								<div className="story-footer-read-button">
									<Button
										variant="contained"
										color="primary"
										endIcon={<SendIcon />}
										onClick={() => readStory(storyId)}>
										Read
									</Button>
								</div>
							</div>
						</div>
						<div className="footer-bottom">
							<div className="claps1">
								<img
									alt="appreciation"
									src="https://img.icons8.com/ios/50/000000/applause.png"
								/>
								<p>{storyClaps.length}</p>
							</div>
							<div className="comments1">
								<img
									alt="comments"
									src="https://img.icons8.com/ios/50/000000/send-comment.png"
								/>
								<p>{Object.keys(storyComments).length}</p>
							</div>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default Story;

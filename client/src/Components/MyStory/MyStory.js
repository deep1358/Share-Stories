import React, { useEffect, useState, useContext } from "react";
import "./MyStory.css";
import { useLocation } from "react-router-dom";
import StoryService from "../../Services/StoryService";
import { Avatar } from "@material-ui/core";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import StoryContent from "./StoryContent";
import Modal from "react-animated-modal";
import * as Scroll from "react-scroll";
import { Link, Element, animateScroll as scroll } from "react-scroll";
import TextField from "@material-ui/core/TextField";
import BackToTop from "../Back-to-top/BackToTop";

import {
	EmailIcon,
	EmailShareButton,
	FacebookIcon,
	FacebookShareButton,
	WhatsappShareButton,
	WhatsappIcon,
} from "react-share";
import "./MyStory.css";
import PageNotFound from "../PageNotFound/PageNotFound";

const MyStory = () => {
	const authContext = useContext(AuthContext);
	const [claps, setClaps] = useState([]);
	const [storyTitle, setStoryTitle] = useState("");
	const [storyContent, setStoryContent] = useState("");
	const [storyAuthor, setStoryAuthor] = useState("");
	const [storyAuthorPicture, setStoryAuthorPicture] = useState("");
	const [storyCategory, setStoryCategory] = useState("");
	const [appreciation, setAppreciation] = useState(false);
	const [date, setDate] = useState("");
	const [url, setUrl] = useState("");
	const [comment, setComment] = useState("");
	const [allComment, setAllComment] = useState([]);

	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);

	const location = useLocation();
	const storyId = location.pathname.slice(1);
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	const Fun = () => {
		setAppreciation(claps.includes(authContext.user._id));
	};

	useEffect(() => {
		setUrl(String(window.location.href));
		StoryService.fetchSpecificStory(storyId).then(data => {
			setError(data.message.msgError);
			if (data.message.msgError === false) {
				setStoryTitle(data.story.storyTitle);
				setStoryContent(data.story.story);
				setStoryAuthor(data.story.userName);
				setStoryCategory(data.story.storyCategory);
				setStoryAuthorPicture(data.story.userPicture);
				setClaps(data.story.storyClaps);
				setAllComment(data.story.comments);
				var d = new Date(data.story.date);
				var date1 = d.getDate();
				var month = months[d.getMonth()];
				var year = d.getFullYear();
				setDate(`${date1} ${month} ${year}`);
			}
			Fun();
			setLoading(false);
		});
	}, [claps.length, appreciation, allComment.length]);

	const Appreciation = () => {
		if (authContext.user.username.length === 0) {
			alert("Please SignIn");
		} else {
			setAppreciation(!appreciation);
			if (!appreciation) {
				axios
					.put("/user/like", {
						storyId: storyId,
					})
					.then(res => {})
					.catch(e => console.log(e.message));
			} else {
				axios
					.put("/user/unlike", {
						storyId: storyId,
					})
					.catch(e => console.log(e));
			}
		}
	};

	const Submit = e => {
		e.preventDefault();
		if (authContext.user.username.length === 0) {
			alert("Please SignIn");
		} else if (comment.length === 0) {
			alert("Empty Comment is not allowed.");
		} else {
			axios
				.put("/user/comment", {
					storyId,
					comment,
				})
				.then(res => {
					setComment("");
					setAllComment(res.data.comments);
					console.log(res.data.comments);
				})
				.catch(e => console.log(e.message));
		}
	};

	const commentDate = date => {
		let dt = new Date(date);
		return dt.toLocaleString();
	};

	return (
		<>
			{loading ? (
				<>
					<span className="cssload-loader">
						<span className="cssload-loader-inner"></span>
					</span>
				</>
			) : error ? (
				<PageNotFound />
			) : (
				<>
					<div className="mystory">
						<BackToTop />
						<div className="mystory-container">
							<div className="mystory-container-title">{storyTitle}</div>

							<div className="mystory-container-header">
								<div className="story-container-header-left">
									<div className="story-container-header-left-avatar">
										{storyAuthorPicture === "" ? (
											<Avatar>{storyAuthor[0]}</Avatar>
										) : (
											<Avatar src={storyAuthorPicture} alt={storyAuthor} />
										)}
									</div>

									<div className="story-container-header-left-name">
										<p>{storyAuthor}</p>
										<p>{date}</p>
									</div>
								</div>

								<div className="story-container-header-right">
									<div className="story-container-header-right-icons">
										<EmailShareButton
											className="network__share-button icons"
											url={url}
											subject={"ShareStories:- " + storyTitle}
											body={"Story Category:- " + storyCategory}>
											<EmailIcon size={32} round={true} />
										</EmailShareButton>
										<FacebookShareButton
											className="network__share-button icons"
											url={url}
											title={storyTitle}>
											<FacebookIcon size={32} round={true} />
										</FacebookShareButton>
										<WhatsappShareButton
											className="network__share-button icons"
											url={url}
											title={storyTitle}>
											<WhatsappIcon size={32} round={true} />
										</WhatsappShareButton>
									</div>
								</div>
							</div>

							<div className="mystory-container-category">
								<p> Category: {storyCategory}</p>
							</div>

							<StoryContent story={storyContent} />

							<div className="mystory-container-footer"></div>

							<div className="icons1">
								<div className="appreciation">
									<div className="appreciations">
										<img
											onClick={Appreciation}
											src={
												appreciation
													? "https://img.icons8.com/ios-filled/50/000000/applause.png"
													: "https://img.icons8.com/ios/50/000000/applause.png"
											}
											alt=""
										/>
									</div>
									<p>
										<b>{claps.length}</b>
									</p>
								</div>
								<div className="comment">
									<div className="comments">
										<Link
											activeClass="active"
											to="modal"
											spy={true}
											smooth={true}
											offset={-70}
											duration={700}>
											<img
												alt=""
												src="https://img.icons8.com/ios/50/000000/send-comment.png"
											/>
										</Link>
									</div>
									<p>
										<b>{allComment.length}</b>
									</p>
								</div>
							</div>

							<div className="comment-modal" id="modal">
								<form onSubmit={Submit} className="comment-modal-form">
									<div className="comment-modal-form-avatar">
										{authContext.user.picture === "" ? (
											<Avatar style={{ marginRight: "5px" }}>
												{authContext.user.username[0]}
											</Avatar>
										) : (
											<Avatar
												style={{ marginRight: "5px" }}
												src={authContext.user.picture}
												alt={storyAuthor}
											/>
										)}
									</div>
									<div className="comment-modal-form-input">
										<TextField
											style={{ flex: 1 }}
											id="standard-multiline-flexible"
											multiline
											rowsMax={500}
											placeholder="Write a Comment"
											value={comment}
											onChange={e => setComment(e.target.value)}
										/>
										<div className="comment-modal-form-input-button">
											<img
												onClick={Submit}
												src="https://cdn.iconscout.com/icon/premium/png-512-thumb/send-message-6-663814.png"
											/>
										</div>
									</div>
								</form>

								{allComment
									.slice(0)
									.reverse()
									.map((comment, index) => (
										<div key={index} className="comment-modal-comments">
											<div className="comment-modal-comments-header">
												<div className="comment-modal-comments-avatar">
													{comment.userPicture === "" ? (
														<Avatar style={{ marginRight: "5px" }}>
															{comment.name[0]}
														</Avatar>
													) : (
														<Avatar
															style={{ marginRight: "5px" }}
															src={comment.userPicture}
															alt={storyAuthor}
														/>
													)}
													<p>{comment.name}</p>
												</div>
												<div className="comment-modal-comments-avatar-date">
													<p>{commentDate(comment.date)}</p>
												</div>
											</div>
											<div className="comment-modal-comments-content">
												<p>{comment.comment}</p>
											</div>
										</div>
									))}
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default MyStory;

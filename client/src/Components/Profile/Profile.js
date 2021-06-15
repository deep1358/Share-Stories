import React, { useEffect, useState, useContext } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import StoryService from "../../Services/StoryService";
import { AuthContext } from "../../Context/AuthContext";
import { Avatar } from "@material-ui/core";

function Profile() {
	const [data, setData] = useState([]);
	const [totalStories, setTotalStories] = useState(0);
	const [totalAppreciations, setTotalAppreciations] = useState(0);
	const [totalComments, setTotalComments] = useState(0);
	const [loading, setLoading] = useState(true);
	const [date, setDate] = useState([]);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		setLoading(true);
		StoryService.fetchAllStoryOfUser().then(data => {
			var d = data.stories;
			setData(d);
			var comments = 0;
			var likes = 0;
			d.map(item => {
				comments += item.comments.length;
				likes += item.storyClaps.length;
				setDate([...date, item.date]);
			});
			setTotalComments(comments);
			setTotalAppreciations(likes);
			setTotalStories(d.length);
			setLoading(false);
		});
	}, [data.length]);
	console.log(date);
	if (loading)
		return (
			<span className="cssload-loader">
				<span className="cssload-loader-inner"></span>
			</span>
		);
	else {
		return (
			<div className="profile">
				<div className="profile-top">
					<div className="profile-top-image">
						{user.picture !== "" ? (
							<img src={user.picture} alt="profile photo" />
						) : (
							<Avatar>{user.username[0]}</Avatar>
						)}
					</div>
					<div className="profile-top-info">
						<div className="profile-top-info-top">
							<div className="profile-h1">
								<h1>{user.username}</h1>
							</div>
							<div className="profile-h5">
								<h5>Email: {user.email}</h5>
								<h5>Joined on {user.date.slice(0, 10)}</h5>
							</div>
						</div>
						<div className="profile-top-info-bottom">
							<div className="profile-follow">
								<div className="following">
									<p className="following-p">Following</p>
									<p>100000</p>
								</div>
								<div className="followers">
									<p className="followers-p">Followers</p>
									<p>100000</p>
								</div>
								<div className="stories-button">
									<Link to="/mystories">My Stories</Link>
								</div>
							</div>
							<div className="profile-line"></div>
						</div>
					</div>
				</div>
				<div className="profile-bottom">
					<div className="profile-bottom-left">
						<div className="profile-bottom-left-div">
							<p style={{ marginRight: "1vw" }}>Total Stories: </p>
							<p>{totalStories}</p>
						</div>
						<div className="profile-bottom-left-div">
							<p style={{ marginRight: "1vw" }}>Total Appreciations: </p>
							<p>{totalAppreciations}</p>
						</div>
						<div className="profile-bottom-left-div">
							<p style={{ marginRight: "1vw" }}>Total Comments: </p>
							<p>{totalComments}</p>
						</div>
					</div>
					<div className="profile-bottom-right"></div>
				</div>
			</div>
		);
	}
}

export default Profile;

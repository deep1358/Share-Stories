import React, { useState, useEffect } from "react";
import StoryService from "../../Services/StoryService";
import authContext from "../../Context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-modal";
import "react-toastify/dist/ReactToastify.css";
import "./Stories.css";
import Story from "./Story";
import { useHistory } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import BackToTop from "../Back-to-top/BackToTop";

function StoriesPage() {
	const [flag, setFlag] = useState(false);
	const [allStory, setAllStory] = useState([]);
	const [message, setMessage] = useState(null);
	const [newStory, setNewStory] = useState("");
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [confirm, setConfirm] = useState(false);
	const [delId, setDelId] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage, setPostsPerPage] = useState(1);
	const [search, setSearch] = useState("");
	const [searchResult, setSearchResult] = useState([]);

	const history = useHistory();

	const notifySuccess = message => {
		toast.success(message.msgBody, {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};
	const notifyError = message => {
		toast.error(message.msgBody, {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};

	function closeModal() {
		setModalIsOpen(false);
	}

	const delete1 = () => {
		StoryService.deleteUserStory(delId).then(data => {
			console.log(data);
			const { message } = data;
			if (!message.msgError) {
				notifySuccess(message);

				setFlag(false);
			} else if (message.msgBody === "UnAuthorised") {
				setMessage(message);
				authContext.setUser({ username: "", email: "" });
				authContext.setIsAuthenticated(false);
				notifyError(message);
			} else {
				notifyError(message);
			}
			setMessage("");
			closeModal();
		});
	};

	const deleteStory = deleteStoryId => {
		setMessage(null);
		setModalIsOpen(true);
		setDelId(deleteStoryId);
	};

	useEffect(() => {
		StoryService.fetchAllStoryOfUser().then(data => {
			var d = data.stories;
			console.log(data);
			setAllStory(d.slice(0).reverse());
			if (d.length > 100) {
				setPostsPerPage(20);
			} else {
				setPostsPerPage(10);
			}
			setFlag(true);
		});
	}, [flag]);

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;

	var currentStories;

	if (searchResult.length > 0) {
		currentStories = searchResult.slice(indexOfFirstPost, indexOfLastPost);
	} else {
		currentStories = allStory.slice(indexOfFirstPost, indexOfLastPost);
	}

	const paginate = pageNumber => setCurrentPage(pageNumber);

	const Search = e => {
		var d = e.target.value;
		setSearch(d);
		const filtered = allStory.filter(story => {
			return story.storyTitle.toLowerCase().includes(d.toLowerCase());
		});
		setSearchResult(filtered);
	};

	return (
		<>
			<Modal
				className="delete-modal"
				isOpen={modalIsOpen}
				isClose={closeModal}
				onRequestClose={closeModal}>
				<div className="delete-modal-title">
					<h3>Are you sure you wanted to delete this Story?</h3>
				</div>
				<div className="delete-modal-button">
					<button onClick={delete1}>Ok</button>
					<button
						onClick={() => {
							closeModal();
							setConfirm(false);
						}}>
						Cancel
					</button>
				</div>
			</Modal>
			<ToastContainer
				style={{ width: "50%" }}
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<div className="stories">
				<BackToTop />
				<div className="stories-container">
					{allStory.length > 0 && (
						<input
							className="stories-container-search"
							value={search}
							onChange={Search}
							type="search"
							placeholder="Search Your Stories"
						/>
					)}
					{search.length !== 0 ? (
						<>
							{searchResult.length !== 0 ? (
								<h3>search result for "{search}"</h3>
							) : (
								<h3>no result found</h3>
							)}

							{searchResult.length > 0 &&
								currentStories.map((value, index) => (
									<div key={index}>
										<Story
											posts={currentStories}
											username={value.userName}
											useremail={value.userEmail}
											userPicture={value.userPicture}
											date={value.date}
											storyTitle={value.storyTitle}
											storyCategory={value.storyCategory}
											story={value.story}
											storyId={value._id}
											storyClaps={value.storyClaps}
											storyComments={value.comments}
											deleteStory={deleteStory}
										/>
									</div>
								))}
							<Pagination
								postsPerPage={postsPerPage}
								totalPosts={searchResult.length}
								paginate={paginate}
							/>
						</>
					) : allStory.length > 0 ? (
						<>
							{currentStories.map((value, index) => (
								<div key={index}>
									<Story
										posts={currentStories}
										username={value.userName}
										useremail={value.userEmail}
										userPicture={value.userPicture}
										date={value.date}
										storyTitle={value.storyTitle}
										storyCategory={value.storyCategory}
										story={value.story}
										storyId={value._id}
										storyClaps={value.storyClaps}
										storyComments={value.comments}
										deleteStory={deleteStory}
									/>
								</div>
							))}
							<Pagination
								postsPerPage={postsPerPage}
								totalPosts={allStory.length}
								paginate={paginate}
							/>
						</>
					) : (
						flag && (
							<div className="nostory">
								<div className="nostory-body">
									<div className="nostory-body-title">Hmm.</div>
									<div className="nostory-body-paragraph">
										It seems that you havent't created a story yet. Please Write
										a Story.
									</div>
									<div className="nostory-body-button">
										<button
											className="button type1"
											onClick={() => {
												history.push("/createstory");
											}}>
											Write Story
										</button>
									</div>
								</div>
								<div className="nostory-image">
									<img
										src="https://d338t8kmirgyke.cloudfront.net/icons/icon_pngs/000/001/923/original/article.png"
										alt=""
									/>
								</div>
							</div>
						)
					)}
				</div>
			</div>
		</>
	);
}

export default StoriesPage;

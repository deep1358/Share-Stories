import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import StoryService from "../../Services/StoryService";
import authContext from "../../Context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Dashboard.css";
import { useHistory } from "react-router-dom";
import Loader1 from "../Loder1/Loader1";

ClassicEditor.defaultConfig = {
	toolbar: {
		items: [
			"heading",
			"|",
			"alignment:left",
			"alignment:center",
			"alignment:right",
			"bold",
			"italic",
			"link",
			"bulletedList",
			"numberedList",
			"|",
			"indent",
			"outdent",
			"|",
			"imageUpload",
			"blockQuote",
			"insertTable",
			"undo",
			"redo",
		],
	},
	image: {
		styles: ["full", "side", "alignLeft", "alignCenter", "alignRight"],
		resizeOptions: [
			{
				name: "imageResize:original",
				label: "Original",
				value: null,
			},
			{
				name: "imageResize:50",
				label: "50%",
				value: "50",
			},
			{
				name: "imageResize:75",
				label: "75%",
				value: "75",
			},
		],

		toolbar: [
			"imageStyle:alignLeft",
			"imageStyle:alignCenter",
			"imageStyle:alignRight",
			"|",
			"imageResize",
			"|",
			"imageTextAlternative",
			"|",
			"imageStyle:full",
		],
	},
	table: {
		contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
	},
	// This value must be kept in sync with the language defined in webpack.config.js.
	language: "en",
};

function Dashboard() {
	const [newStory, setNewStory] = useState("");
	const [message, setMessage] = useState(null);

	const [storyTitle, setStoryTitle] = useState("");

	const [storyCategory, setStoryCategory] = useState("");

	const [loader, setLoader] = useState(false);
	const history = useHistory();

	const handleOnChange = (e, editor) => {
		const data = editor.getData();
		setNewStory(data);
	};

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

	const createStory = e => {
		e.preventDefault();
		setLoader(true);
		if (storyCategory.length > 0) {
			setMessage(null);
			const dataOfNewStory = {
				storyTitle: storyTitle,
				storyCategory: storyCategory,
				story: newStory,
			};
			StoryService.createStory(dataOfNewStory).then(data => {
				const { message } = data;
				setMessage(message);

				if (!message.msgError) {
					setLoader(false);
					notifySuccess(message);
					history.push(data.storyId);
				} else if (message.msgBody === "UnAuthorised") {
					setLoader(false);
					setMessage(message);
					authContext.setUser({ username: "", email: "" });
					authContext.setIsAuthenticated(false);
					notifyError(message);
				} else {
					setLoader(false);
					notifyError(message);
				}
			});
			setStoryTitle("");
			setNewStory("");
			setMessage("");
		} else {
			alert("Please Select the Category.");
			setLoader(false);
		}
	};

	const handleStoryTitleChange = e => {
		setStoryTitle(e.target.value);
	};
	const handleDropdownChange = e => {
		setStoryCategory(e.target.value);
	};

	if (loader) {
		return <Loader1 />;
	} else {
		return (
			<>
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
				<div className="createstory">
					<div className="container createstory-container">
						<div className="createstory-form">
							<form onSubmit={createStory}>
								<input
									className="createstory-form-title"
									type="text"
									name="storyTitle"
									onChange={handleStoryTitleChange}
									value={storyTitle}
									required
									placeholder="Story Title..."
								/>
								<CKEditor
									className="createstory-form-editor"
									data={newStory}
									editor={ClassicEditor}
									onInit={editor => {
										// This Initializes our application //
									}}
									config={{
										ckfinder: {
											uploadUrl: "/uploads",
										},
									}}
									onChange={handleOnChange}
									required
								/>
								<select
									className="browser-default custom-select createstory-form-select"
									onChange={handleDropdownChange}
									required>
									<option selected>Select Category</option>
									<option value="Kid">Kid</option>
									<option value="Education">Education</option>
									<option value="History">History</option>
									<option value="Phylosophy">Phylosophy</option>
									<option value="Life Experiance">Life Experiance</option>
									<option value="Motivation">Motivation</option>
								</select>
								<div className="createstory-form-button">
									<button type="submit">Publish Story</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default Dashboard;

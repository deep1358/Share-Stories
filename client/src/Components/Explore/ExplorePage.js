import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Story from "./Story";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import StoryService from "../../Services/StoryService";
import "./ExplorePage.css";
import Loader from "../Loader/Loader";
import BackToTop from "../Back-to-top/BackToTop";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-auto-tabpanel-${index}`}
			aria-labelledby={`scrollable-auto-tab-${index}`}
			{...other}>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function ExplorePage() {
	const [data, setData] = useState([]);
	const [education, setEducation] = useState([]);
	const [history1, setHistory1] = useState([]);
	const [phylosophy, setPhylosophy] = useState([]);
	const [lifeExperience, setLifeExperience] = useState([]);
	const [motivation, setMotivation] = useState([]);
	const [kid, setKid] = useState([]);
	const [liked, setLiked] = useState([]);
	const [value, setValue] = useState(0);
	const [loading, setLoading] = useState(true);

	const [search, setSearch] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const Search = e => {
		var d = e.target.value;
		setSearch(d);
		const filtered = data.filter(story => {
			return story.storyTitle.toLowerCase().includes(d.toLowerCase());
		});
		setSearchResult(filtered);
	};

	useEffect(() => {
		StoryService.fetchStories()
			.then(res => {
				var temp = res.data;
				temp.reverse();
				setData(temp);
				setEducation(temp.filter(item => item.storyCategory === "Education"));
				setHistory1(temp.filter(item => item.storyCategory === "History"));
				setPhylosophy(temp.filter(item => item.storyCategory === "Phylosophy"));
				setMotivation(temp.filter(item => item.storyCategory === "Motivation"));
				setLifeExperience(
					temp.filter(item => item.storyCategory === "Life Experiance")
				);
				setKid(temp.filter(item => item.storyCategory === "Kid"));
				var temp1 = temp.map(x => x);
				temp1.sort(function (a, b) {
					return b.storyClaps.length - a.storyClaps.length;
				});
				setLiked(temp1);
				setLoading(false);
			})
			.catch(err => {
				console.log(err);
				setLoading(false);
			});
	}, [data.length]);

	TabPanel.propTypes = {
		children: PropTypes.node,
		index: PropTypes.any.isRequired,
		value: PropTypes.any.isRequired,
	};

	function a11yProps(index) {
		return {
			id: `scrollable-auto-tab-${index}`,
			"aria-controls": `scrollable-auto-tabpanel-${index}`,
		};
	}

	if (loading) return <Loader />;
	return (
		<div className="explore">
			<BackToTop />
			<AppBar position="static" color="default" style={{ zIndex: "10" }}>
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
					variant="scrollable"
					scrollButtons="auto"
					aria-label="scrollable auto tabs example">
					<Tab label="Most Recent" {...a11yProps(0)} />
					<Tab label="Most Liked" {...a11yProps(1)} />
					<Tab label="Education" {...a11yProps(2)} />
					<Tab label="History" {...a11yProps(3)} />
					<Tab label="Phylosophy" {...a11yProps(4)} />
					<Tab label="Kid" {...a11yProps(5)} />
					<Tab label="Motivation" {...a11yProps(6)} />
					<Tab label="Life Experience" {...a11yProps(7)} />
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				<input
					className="stories-container-search1"
					type="search"
					placeholder="Search Your Stories"
					onChange={Search}
					value={search}
				/>
				{search.length > 0 ? (
					searchResult.length > 0 ? (
						<div className="explore-stories">
							{searchResult.map(item => {
								return (
									<Story
										key={item._id}
										date={item.date}
										claps={item.storyClaps}
										story={item.story}
										title={item.storyTitle}
										category={item.storyCategory}
										username={item.userName}
										userPicture={item.userPicture}
										storyId={item._id}
									/>
								);
							})}
						</div>
					) : (
						<h1
							style={{
								position: "absolute",
								width: "100%",
								top: "30vh",
								textAlign: "center",
								left: "-1vw",
							}}>
							no result found
						</h1>
					)
				) : (
					<div className="explore-stories">
						{data.length > 0 &&
							data.map(item => {
								return (
									<Story
										key={item._id}
										date={item.date}
										claps={item.storyClaps}
										story={item.story}
										title={item.storyTitle}
										category={item.storyCategory}
										username={item.userName}
										userPicture={item.userPicture}
										storyId={item._id}
									/>
								);
							})}
					</div>
				)}
			</TabPanel>
			<TabPanel value={value} index={1}>
				<div className="explore-stories">
					{liked.length > 0 &&
						liked.map(item => {
							return (
								<Story
									key={item._id}
									date={item.date}
									claps={item.storyClaps}
									story={item.story}
									title={item.storyTitle}
									category={item.storyCategory}
									username={item.userName}
									userPicture={item.userPicture}
									storyId={item._id}
								/>
							);
						})}
				</div>
			</TabPanel>
			<TabPanel value={value} index={2}>
				<div className="explore-stories">
					{education.length > 0 &&
						education.map(item => {
							return (
								<Story
									key={item._id}
									date={item.date}
									claps={item.storyClaps}
									story={item.story}
									title={item.storyTitle}
									category={item.storyCategory}
									username={item.userName}
									userPicture={item.userPicture}
									storyId={item._id}
								/>
							);
						})}
				</div>
			</TabPanel>
			<TabPanel value={value} index={3}>
				<div className="explore-stories">
					{history1.length > 0 &&
						history1.map(item => {
							return (
								<Story
									key={item._id}
									date={item.date}
									claps={item.storyClaps}
									story={item.story}
									title={item.storyTitle}
									category={item.storyCategory}
									username={item.userName}
									userPicture={item.userPicture}
									storyId={item._id}
								/>
							);
						})}
				</div>
			</TabPanel>
			<TabPanel value={value} index={4}>
				<div className="explore-stories">
					{phylosophy.length > 0 &&
						phylosophy.map(item => {
							return (
								<Story
									key={item._id}
									date={item.date}
									claps={item.storyClaps}
									story={item.story}
									title={item.storyTitle}
									category={item.storyCategory}
									username={item.userName}
									userPicture={item.userPicture}
									storyId={item._id}
								/>
							);
						})}
				</div>
			</TabPanel>
			<TabPanel value={value} index={5}>
				<div className="explore-stories">
					{kid.length > 0 &&
						kid.map(item => {
							return (
								<Story
									key={item._id}
									date={item.date}
									claps={item.storyClaps}
									story={item.story}
									title={item.storyTitle}
									category={item.storyCategory}
									username={item.userName}
									userPicture={item.userPicture}
									storyId={item._id}
								/>
							);
						})}
				</div>
			</TabPanel>
			<TabPanel value={value} index={6}>
				<div className="explore-stories">
					{motivation.length > 0 &&
						motivation.map(item => {
							return (
								<Story
									key={item._id}
									date={item.date}
									claps={item.storyClaps}
									story={item.story}
									title={item.storyTitle}
									category={item.storyCategory}
									username={item.userName}
									userPicture={item.userPicture}
									storyId={item._id}
								/>
							);
						})}
				</div>
			</TabPanel>
			<TabPanel value={value} index={7}>
				<div className="explore-stories">
					{lifeExperience.length > 0 &&
						lifeExperience.map(item => {
							return (
								<Story
									key={item._id}
									date={item.date}
									claps={item.storyClaps}
									story={item.story}
									title={item.storyTitle}
									category={item.storyCategory}
									username={item.userName}
									userPicture={item.userPicture}
									storyId={item._id}
								/>
							);
						})}
				</div>
			</TabPanel>
		</div>
	);
}

export default ExplorePage;

import React from "react";
import {
	StoryDiv,
	StoryTitle,
	StoryDate,
	StoryHeader,
	StoryFooter,
	StorySubHeader,
	StoryCategory,
	StoryClaps,
} from "./UserStoryStyle";

import ReactHtmlParser, {
	processNodes,
	convertNodeToElement,
	htmlparser2,
} from "react-html-parser";

function UserStory({
	storyTitle,
	storyCategory,
	story,
	date,
	storyId,
	storyClaps,
	deleteStory,
}) {
	return (
		<StoryDiv>
			<StoryHeader>
				<StoryTitle>{storyTitle}</StoryTitle>
				<StorySubHeader>
					<StoryCategory>Category: {storyCategory}</StoryCategory>
					<StoryDate>
						Created On: {date.substr(0, 10) + " " + date.substr(11, 12)}
					</StoryDate>
				</StorySubHeader>
			</StoryHeader>
			{ReactHtmlParser(story)}
			<StoryClaps>
				<img src="clapping.svg" alt="Clap Image From Free Vector Icons" />
				<h1> 0</h1>
			</StoryClaps>
			<StoryFooter>
				<button onClick={() => deleteStory(storyId)}>Delete</button>
				<button>See Story</button>
			</StoryFooter>
		</StoryDiv>
	);
}

export default UserStory;

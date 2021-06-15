import React from "react";
import ReactHtmlParser, {
	processNodes,
	convertNodeToElement,
	htmlparser2,
} from "react-html-parser";

function StoryContent({ story }) {
	return (
		<div className="mystory-container-content">{ReactHtmlParser(story)}</div>
	);
}

export default StoryContent;

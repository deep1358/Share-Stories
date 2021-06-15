export default {
	// getStories: () => {
	// 	return fetch("/user/getStories").then(response => {
	// 		if (response.status !== 401) {
	// 			return response.json().then(data => data);
	// 		} else return { message: { msgBody: "UnAuthorized", msgError: true } };
	// 	});
	// },
	createStory: async story => {
		const response = await fetch("/user/createstory", {
			method: "post",
			body: JSON.stringify(story),
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});
		// console.log(response);
		if (response.status !== 401) {
			return response.json().then(data => data);
		} else return { message: { msgBody: "UnAuthorized" }, msgError: true };
	},
	fetchAllStoryOfUser: async () => {
		const response = await fetch("/user/stories", {
			method: "get",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});
		// console.log(response);
		if (response.status !== 401) {
			return response.json().then(data => data);
		} else return { message: { msgBody: "UnAuthorized" }, msgError: true };
	},
	deleteUserStory: _id => {
		console.log("/user/" + _id);
		// axios.delete("/user/" + _id).then(response => {
		// 	console.log(response);
		// 	if (response.status !== 401) {
		// 		return response.json().then(data => data);
		// 	} else return { message: { msgBody: "UnAuthorized" }, msgError: true };
		// });
		return fetch("/user/deletestory/" + _id, {
			method: "delete",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		}).then(response => {
			console.log(response);
			if (response.status !== 401) {
				return response.json().then(data => data);
			} else return { message: { msgBody: "UnAuthorized" }, msgError: true };
		});
	},
	fetchSpecificStory: storyId => {
		return fetch("/user/story/" + storyId, {
			method: "get",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		}).then(response => {
			// console.log(response);
			if (response.status === 400) {
				return response.json().then(data => data);
			}
			if (response.status !== 401) {
				return response.json().then(data => data);
			} else return { message: { msgBody: "UnAuthorized" }, msgError: true };
		});
	},
	fetchStories: async () => {
		const response = await fetch("/user/allStories", {
			method: "get",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});
		if (response.status === 400) {
			return response.json().then(data => data);
		}
		if (response.status !== 401) {
			return response.json().then(data_1 => data_1);
		} else return { message: { msgBody: "UnAuthorized" }, msgError: true };
	},
};

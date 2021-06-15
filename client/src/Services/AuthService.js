export default {
	login: user => {
		return fetch("/user/login", {
			method: "post",
			body: JSON.stringify(user),
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		}).then(res => {
			console.log(res);
			if (res.status === 202) {
				return {
					isAuthenticated: false,
					user: { username: "", email: "" },
					message: {
						msgBody: "Invalid Email Or Password!",
						msgError: true,
					},
				};
			} else if (res.status === 201)
				return {
					isAuthenticated: false,
					user: { username: "", email: "" },
					message: {
						msgBody: "Please Verify Your Email First!",
						msgError: true,
					},
				};
			else return res.json().then(data => data);
		});
	},

	register: user => {
		// console.log(user);
		return fetch("/user/register", {
			method: "post",
			body: JSON.stringify(user),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(res => res.json())
			.then(data => data);
	},

	logout: () => {
		return fetch("/user/logout")
			.then(res => res.json())
			.then(data => data);
	},

	// It will sink our react application with backend to check authentication
	isAuthenticated: () => {
		return fetch("/user/authenticated").then(res => {
			if (res.status !== 401) return res.json().then(data => data);
			else return { isAuthenticated: false, user: { username: "", email: "" } };
		});
	},
};

const users = document.getElementById("mappedUsers");
const userPosts = document.getElementById("mappedPost");
const table = document.getElementById("table");

const baseUrl = "https://jsonplaceholder.typicode.com/";

let posts = [];

// console.log(data);

const getPosts = async () => {
	try {
		const response = await fetch(`${baseUrl}posts`, {
			headers: {
				method: "GET",
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		posts = data;
		console.log(data);
	} catch (err) {
		console.log(err);
	}
};
getPosts();

console.log(posts);

const getUsers = async () => {
	try {
		const response = await fetch(`${baseUrl}users`, {
			headers: {
				method: "GET",
				"Content-Type": "application/json",
			},
		});
		const data = await response.json();
		console.log(data);
		const p = [];

		const html = data
			.map((user) => {
				const userText = posts
					.filter((post) => {
						if (post.userId === user.id) {
							return post;
						}
					})
					.map(
						(post) =>
							`&nbspTitle: ${post.title} </br>Post: ${post.body}</br> &nbsp  `,
					)
					.join("");
				return `<tr>
          <td id=${user.id}>${user.name}</td>
          <td bgcolor="grey" id="mappedPost">&nbsp${userText}</td>
        </tr>`;
			})
			.join("");
		users.insertAdjacentHTML("beforebegin", html);
	} catch (err) {
		console.log(err);
	} finally {
		await getPosts();
	}
};
getUsers();

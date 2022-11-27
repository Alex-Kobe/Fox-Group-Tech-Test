/**
 * This function initialises the fectch function when the DOM content is loaded. This 
 * makes sure that js is executed before the table exists.
 */
document.addEventListener("DOMContentLoaded", function (event) {
	fetch_commit_data().then(commit_data => refactor_commit_data(commit_data)).finally(() => document.getElementById('loading_container').classList.add('hidden'));
});


/**
 * This function refactors the fetched commit data into a fomat that the populate_tables
 * table will accept.
 */
function refactor_commit_data(commit_data) {
	const refactored_commit_data = [];
	commit_data.forEach(commit => {
		const author_name = commit['commit']['author']['name'];
		const author_commit_date = reformat_date(commit['commit']['author']['date']);
		const message = commit['commit']['message'];
		const commit_url = commit['commit']['url'];

		refactored_commit_data.push({
			author_name: author_name,
			author_commit_date: author_commit_date,
			message: message,
			commit_url: commit_url
		});
	});

	populate_tables(refactored_commit_data);
}


/**
 * This function reformats the date into a readable date.
 */
function reformat_date(commit_date) {
	const date = new Date(commit_date);
	const author_commit_date =
		("00" + date.getDate()).slice(-2) + "/" +
		("00" + (date.getMonth() + 1)).slice(-2) + "/" +
		date.getFullYear() + " " +
		("00" + date.getHours()).slice(-2) + ":" +
		("00" + date.getMinutes()).slice(-2) + ":" +
		("00" + date.getSeconds()).slice(-2);

	return author_commit_date;
}


/**
 * This function is used to fetch all the commit data from the url.
 */
function fetch_commit_data() {
	return fetch('https://api.github.com/repositories/19438/commits', {
		method: "GET",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	}).then((response) => response.json())
		.then((response_data) => {
			return response_data;
		});
}


/**
 * This function is used for populating the tables with the data passed.
 */
function populate_tables(commit_data) {
	const table_body = document.querySelector('tbody');

	// Setting the inner html of the table body to null so this function can be called again in the future
	table_body.innerHTML = null;

	commit_data.forEach(commit => {
		// Creating new table row
		const row = table_body.insertRow();

		// Inserting new table rows
		const cell1 = row.insertCell(0);
		const cell2 = row.insertCell(1);
		const cell3 = row.insertCell(2);
		const cell4 = row.insertCell(3);

		//populating new table rows
		cell1.innerHTML = commit['author_name'];
		cell2.innerHTML = commit['author_commit_date'];
		cell3.innerHTML = commit['message'];
		cell4.innerHTML = commit['commit_url'];
	});
}


/**
 * This function is used for deciding how the table data will be ordered.
 */
function order_by(x) {
	// x is the value passed when you click on one of the table headings. Depending on what heading is clicked, decides what we will sort.
	const author_name = document.querySelector('#author_name');
	const author_commit_date = document.querySelector('#author_commit_date');
	switch (x) {
		case 'author_name':
			if (author_name.dataset.order == 'asc') {
				populate_tables(sort_author_name_decending(convert_table_to_array()));
				author_name.dataset.order = 'dsc';
				author_commit_date.dataset.order = null;
			} else if (author_name.dataset.order == 'dsc') {
				populate_tables(sort_author_name_ascending(convert_table_to_array()));
				author_name.dataset.order = 'asc';
				author_commit_date.dataset.order = null;
			} else {
				populate_tables(sort_author_name_ascending(convert_table_to_array()));
				author_name.dataset.order = 'asc';
				author_commit_date.dataset.order = null;
			}
			break;

		case 'author_commit_date':
			if (author_commit_date.dataset.order == 'asc') {
				populate_tables(sort_date_decending(convert_table_to_array()));
				author_commit_date.dataset.order = 'dsc';
				author_name.dataset.order = null;
			} else if (author_commit_date.dataset.order == 'dsc') {
				populate_tables(sort_date_ascending(convert_table_to_array()));
				author_commit_date.dataset.order = 'asc';
				author_name.dataset.order = null;
			} else {
				populate_tables(sort_date_ascending(convert_table_to_array()));
				author_commit_date.dataset.order = 'asc';
				author_name.dataset.order = null;
			}
			break;
	}
}


/**
 * This function is used for taking the table data and converting it into an array that we can use to sort.
 */
function convert_table_to_array() {
	const table = document.querySelector('#commits_table');
	const table_data = [];

	for (let i = 1; i < table.rows.length; i++) {
		table_data.push({
			author_name: table.rows[i].cells[0].innerHTML,
			author_commit_date: table.rows[i].cells[1].innerHTML,
			message: table.rows[i].cells[2].innerHTML,
			commit_url: table.rows[i].cells[3].innerHTML
		});
	}
	return (table_data);
}


/**
 * This function is to convert the "Author Commit Date" table header data to a format that "Date" Date Constructor will accept.
 */
String.prototype.to_new_date_format = function () {
	var date_time_split = this.split(' ');
	var date_split = date_time_split[0].split('/');
	var time_split = date_time_split[1].split(':');

	// year, month, day, hours, minutes, seconds (in this order)
	return new Date(date_split[2], date_split[1], date_split[0], time_split[0], time_split[1], time_split[2]);
};


/**
 * This function sorts the commit date in acending order.
 */
function sort_date_ascending(commits) {
	return commits.sort((a, b) => (a.author_commit_date).to_new_date_format() - (b.author_commit_date).to_new_date_format());
}


/**
 * This function sorts the commit date in decending order.
 */
function sort_date_decending(commits) {
	return commits.sort((a, b) => (b.author_commit_date).to_new_date_format() - (a.author_commit_date).to_new_date_format());
}


/**
 * This function sorts the commit author name in acending order.
 */
function sort_author_name_ascending(commits) {
	return commits.sort((a, b) => a.author_name.localeCompare(b.author_name));
}


/**
 * This function sorts the commit author name in decending order.
 */
function sort_author_name_decending(commits) {
	return commits.sort((a, b) => b.author_name.localeCompare(a.author_name));
}
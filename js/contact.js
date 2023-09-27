let contactId = 0;

function addContactPanel() {
	contactPanel = document.getElementById("contact-panel");
	contactPanel.style.display = "block";
	sidebarTitle = document.getElementById("sidebar-title");
	sidebarTitle.innerHTML = "Create Contact";
	sidebarSave = document.getElementById("save-contact");
	sidebarSave.setAttribute("onclick", "addContact()");
	sidebarCancel = document.getElementById("cancel-contact");
	sidebarCancel.innerHTML = "Cancel";

	const formList = ["form-first-name", "form-last-name", "form-phone", "form-email"];
	for (elem of formList) {
		formElement = document.getElementById(elem);
		formElement.value = "";
		formElement.setAttribute("required", "true");
	}
}

function editContactPanel(editButton) {
	contactPanel = document.getElementById("contact-panel");
	contactPanel.style.display = "block";
	sidebarTitle = document.getElementById("sidebar-title");
	sidebarTitle.innerHTML = "Edit Contact";
	sidebarSave = document.getElementById("save-contact");
	sidebarSave.innerHTML = "Save";
	sidebarSave.setAttribute("onclick", "editContact()");
	sidebarCancel = document.getElementById("cancel-contact");
	sidebarCancel.innerHTML = "Discard";

	tableRow = editButton.parentElement.parentElement;
	tableChildren = tableRow.children;
	contactId = tableRow.getAttribute('data-id');

	const formList = ["form-first-name", "form-last-name", "form-phone", "form-email"];
	for (var i = 0; i < formList.length; i++) {
		formElement = document.getElementById(formList[i]);
		formElement.value = tableChildren[i].innerText;
		formElement.setAttribute("required", "true");
	}
}

function closeForm() {
	contactPanel = document.getElementById("contact-panel");
	contactPanel.style.display = "none";
	const formList = ["form-first-name", "form-last-name", "form-phone", "form-email"];
	for (var i = 0; i < formList.length; i++) {
		formElement = document.getElementById(formList[i]);
		formElement.setAttribute("required", "false");
	}
}

function createAlert(alertType, message) {
	$('#alert-spot').html('<div class="alert ' + alertType + ' alert-dismissable" role="alert"><button class="btn-close me-3" aria-label="close" data-bs-dismiss="alert"></button>' + message + '</div>');
}

var deleteModal = document.getElementById('confirm-delete-modal');

deleteModal.addEventListener('show.bs.modal', function (event) {
  var button = event.relatedTarget;
  var recipient = button.getAttribute('data-bs-id');
	deleteModal.setAttribute('data-bs-id', recipient);
});


function addContact() {
	let addContactForm = document.getElementById("contact-form");
	if (!addContactForm.checkValidity()) {
		return;
	}
	let newFirstName = document.getElementById("form-first-name").value;
	let newLastName = document.getElementById("form-last-name").value;
	let phone = document.getElementById("form-phone").value;
	let email = document.getElementById("form-email").value;

	let tmp = { firstName: newFirstName, lastName: newLastName, email: email, phone: phone, userID: userId };
	let jsonPayload = JSON.stringify(tmp);

	let url = urlBase + '/AddContact.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				closeForm();
				searchContact();
				createAlert('alert-success', "Contact successfully added!");
			}
		};
		xhr.send(jsonPayload);
	}
	catch (err) {
		createAlert('alert-danger', "An error occurred while creating this contact");
	}

}

function editContact() {
	let editContactForm = document.getElementById("contact-form");
	if (!editContactForm.checkValidity()) {
		return;
	}
	let newFirstName = document.getElementById("form-first-name").value;
	let newLastName = document.getElementById("form-last-name").value;
	let phone = document.getElementById("form-phone").value;
	let email = document.getElementById("form-email").value;

	let tmp = { firstName: newFirstName, lastName: newLastName, email: email, phone: phone, ID: contactId };
	let jsonPayload = JSON.stringify(tmp);

	let url = urlBase + '/UpdateContacts.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				closeForm();
				searchContact();
				createAlert('alert-success', "Saved changes");
			}
		};
		xhr.send(jsonPayload);
	}
	catch (err) {
		createAlert('alert-danger', "An error occurred while saving changes to this contact");
	}
}

function deleteContact() {
	let deleteModal = document.getElementById("confirm-delete-modal");
	var deleteId = deleteModal.getAttribute("data-bs-id");
	$('#confirm-delete-modal').modal('hide');

	let tmp = { contactID: deleteId };
	let jsonPayload = JSON.stringify(tmp);

	let url = urlBase + '/DeleteContact.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				searchContact();
				closeForm();
				createAlert('alert-success', "Deleted contact");
			}
		};
		xhr.send(jsonPayload);
	}
	catch (err) {
		createAlert('alert-danger', "An error occurred while attempting to delete this contact");
	}
}

function searchContact() {
	let srch = document.getElementById("contact-search").value;
	var table = document.getElementById("contact-table-body");

	let tmp = { search: srch, userID: userId };
	let jsonPayload = JSON.stringify(tmp);

	let url = urlBase + '/SearchContacts.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				let jsonObject = JSON.parse(xhr.responseText);

				var tableBody = document.getElementById('contact-table-body');
				tableBody.innerHTML = '';

				if (jsonObject.error) {
					return;
				}

				for (let i = 0; i < jsonObject.results.length; i++) {
					let tr = document.createElement("tr");
					tr.setAttribute("class", "align-middle");
					let vals = Object.values(jsonObject.results[i]);

					tr.setAttribute("data-id", vals[vals.length - 1]);

					for (let i = 0; i < vals.length - 1; i++) {
						let td = document.createElement("td");
						td.innerText = vals[i];
						tr.appendChild(td);
					}

					tableEdit = document.createElement("td");
					tableEdit.setAttribute("id", "edit-button");
					editButton = document.createElement("button");
					editButton.setAttribute("class", "btn");
					editButton.setAttribute("onclick", "editContactPanel(this)");
					editIcon = document.createElement("i");
					editIcon.setAttribute("class", "bi bi-pencil-square text-white");
					editButton.appendChild(editIcon);
					tableEdit.appendChild(editButton);
					tr.appendChild(tableEdit);

					tableDelete = document.createElement("td");
					tableDelete.setAttribute("id", "delete-button");
					deleteButton = document.createElement("button");
					deleteButton.setAttribute("class", "btn");
					deleteButton.setAttribute("data-bs-toggle", "modal");
					deleteButton.setAttribute("data-bs-target", "#confirm-delete-modal");
					deleteButton.setAttribute("data-bs-id", vals[vals.length - 1]);
					deleteIcon = document.createElement("i");
					deleteIcon.setAttribute("class", "bi bi-trash text-white");
					deleteButton.appendChild(deleteIcon);
					tableDelete.appendChild(deleteButton);
					tr.appendChild(tableDelete);

					table.appendChild(tr);
				}
			}
		};
		xhr.send(jsonPayload);
	}
	catch (err) {
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}

}
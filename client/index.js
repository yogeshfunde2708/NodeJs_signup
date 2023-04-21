// const { response } = require("express");

// const { reset } = require("nodemon");

// const { response } = require("express");

// const { response } = require("express");

// const { response } = require("express");

document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:5000/getAll")
    .then((response) => response.json())
    .then((data) => loadHTMLTable(data["data"]));
});

document
  .querySelector("table tbody")
  .addEventListener("click", function (event) {
    if (event.target.className === "delete-row-btn btn btn-danger") {
      deleteRowById(event.target.dataset.id);
    }
    // console.log(event.target.dataset)
    if (event.target.className === "edit-row-btn btn btn-success") {
      handleEditRow(
        event.target.dataset.id,
        event.target.dataset.name,
        event.target.dataset.email,
        event.target.dataset.gender,
        event.target.dataset.password,
        event.target.dataset.confirmpassword,
        console.log(event.target.dataset.gender)
      );
    }
  });

const updateBtn = document.querySelector("#update-row-btn");
const searchBtn = document.querySelector("#search-btn");

searchBtn.onclick = function () {
  const searchValue = document.querySelector("#search-input").value;

  fetch("http://localhost:5000/search/" + searchValue)
    .then((response) => response.json())
    .then((data) => loadHTMLTable(data["data"]));
  document.querySelector("#search-input").value = "";
};

function deleteRowById(id) {
  fetch("http://localhost:5000/delete/" + id, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        location.reload();
      }
    });
}

function handleEditRow(id, name, email, gender, password, confirmpassword) {
  const updateSection = document.querySelector("#update-row");
  updateSection.hidden = false;
  // console.log(gender);
  document.querySelector("#update-name-input").dataset.id = id;
  document.querySelector("#update-name-input").value = name;
  console.log(name);

  document.querySelector("#update-email-input").dataset.id = id;
  document.querySelector("#update-email-input").value = email;
  console.log(email);

  if (gender == "Male") {
    document.querySelector("#update-male").dataset.id = id;
    document.querySelector("#update-male").checked = true;
  } else if (gender == "Female") {
    document.querySelector("#update-female").dataset.id = id;
    document.querySelector("#update-female").checked = true;
  }
  console.log(gender);

  document.querySelector("#update-password-input").dataset.id = id;
  document.querySelector("#update-password-input").value = password;
  console.log(password);

  document.querySelector("#update-confirm-password").dataset.id = id;
  document.querySelector("#update-confirm-password").value = confirmpassword;
  console.log(confirmpassword);
}

updateBtn.onclick = function () {
  const updateNameInput = document.querySelector("#update-name-input");
  const updateEmailInput = document.querySelector("#update-email-input");
  let gender;
  if (document.querySelector("#update-male").checked == true) {
    gender = "Male";
  } else if (document.querySelector("#update-female").checked == true) {
    gender = "Female";
  }

  const updatePasswodInput = document.querySelector("#update-password-input");
  const updateConfirmPasswordInput = document.querySelector(
    "#update-confirm-password"
  );

  if (updateNameInput.value == "") {
    alert("Please enter update name");
    return false;
  } else if (updateEmailInput.value == "") {
    alert("please enter update email");
  } else if (!gender) {
    alert("Please enter gender");
  } else if (updatePasswodInput.value == "") {
    alert("Please enter password");
  } else if (updateConfirmPasswordInput.value == "") {
    alert("Please enter confirm password");
  } else if (updatePasswodInput.value != updateConfirmPasswordInput.value) {
    alert("Password did not match, Please try again");
  } else {
    fetch("http://localhost:5000/update", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      // update into table
      body: JSON.stringify({
        id: updateNameInput.dataset.id,
        name: updateNameInput.value,

        id: updateEmailInput.dataset.id,
        email: updateEmailInput.value,

        gender: gender,

        id: updatePasswodInput.dataset.id,
        password: updatePasswodInput.value,

        id: updateConfirmPasswordInput.dataset.id,
        confirmpassword: updateConfirmPasswordInput.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          location.reload();
        }
      });
  }
};

const addBtn = document.querySelector("#add-name-btn");
addBtn.onclick = function () {
  const emailInput = document.querySelector("#email-input");
  const nameInput = document.querySelector("#name-input");

  if (document.querySelector("#male").checked) {
    genderSelect = "Male";
  } else if (document.querySelector("#female").checked) {
    genderSelect = "Female";
  }
  const passwordInput = document.querySelector("#password-input");
  const confirmPasswordInput = document.querySelector(
    "#confirm-password-input"
  );

  const email = emailInput.value;
  const name = nameInput.value;
  // const gender = genderSelect;
  const password = passwordInput.value;
  const confirmpassword = confirmPasswordInput.value;

  console.log(email);
  console.log(name);
  console.log(genderSelect);
  // console.log(gender);
  console.log(password);
  console.log(confirmpassword);
  if (emailInput.value == "") {
    alert("Please enter email");
  } else if (nameInput.value == "") {
    alert("Please enetr Username");
  } else if (!genderSelect) {
    alert("Please select gender");
  } else if (passwordInput.value == "") {
    alert("Please enter password");
  } else if (confirmPasswordInput.value == "") {
    alert("Please enetr confirm password");
  } else if (passwordInput.value != confirmPasswordInput.value) {
    alert("Password did not match, Please try again");
  } else {
    fetch("http://localhost:5000/insert", {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        gender: genderSelect,
        password: password,
        confirmpassword: confirmpassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => insertRowIntoTable(data["data"]));
  }
  emailInput.value = "";
  nameInput.value = "";
  document.querySelector("#male").checked = false;
  document.querySelector("#female").checked = false;
  passwordInput.value = "";
  confirmPasswordInput.value = "";
};

let count = 0;
function loadHTMLTable(data) {
  const table = document.querySelector("table tbody");
  console.log(data);
  if (data.length === 0) {
    table.innerHTML =
      "<tr><td class = 'no-data' colspan = '10'>No Data</td></tr>";
    return;
  }

  let tableHtml = "";
  data.forEach(function ({
    ID,
    email,
    name,
    gender,
    password,
    confirmpassword,
    date_added,
  }) {
    count = count + 1;
    tableHtml += "<tr>";
    tableHtml += `<td>${count}</td>`;
    tableHtml += `<td>${ID}</td>`;
    tableHtml += `<td>${email}</td>`;
    tableHtml += `<td>${name}</td>`;
    tableHtml += `<td>${gender}</td>`;
    tableHtml += `<td>${password}</td>`;
    tableHtml += `<td>${confirmpassword}</td>`;
    tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`;
    tableHtml += `<td><button class="edit-row-btn btn btn-success" data-id=${ID} data-email="${email}" data-name="${name}" data-gender="${gender}" data-password="${password}" data-confirmpassword="${confirmpassword}">Edit-Input-Fields</td>`;
    tableHtml += `<td><button class="delete-row-btn btn btn-danger" data-id=${ID}>Delete</td>`;
    tableHtml += "</tr>";
  });
  table.innerHTML = tableHtml;
}

function insertRowIntoTable(data) {
  console.log(data);
  const table = document.querySelector("table tbody");
  const isTableData = table.querySelector(".no-data");
  count = count + 1; 
  let tableHtml = "<tr>";
  tableHtml += `<td>${count}</td>`;
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      if (key === "dateAdded") {
        data[key] = new Date(data[key]).toLocaleString();
      }
      tableHtml += `<td>${data[key]}</td>`;
    }
  }

  tableHtml += `<td><button class="edit-row-btn btn btn-success" data-id=${data.id} data-email="${email}" data-name="${name}" data-gender="${gender}" data-password="${password}" data-confirmpassword="${confirmpassword}>Edit-input-fields</td>`;
  tableHtml += `<td><button class="delete-row-btn btn btn-danger" data-id=${data.id}>Delete</td>`;

  tableHtml += "</tr>";

  if (isTableData) {
    table.innerHTML = tableHtml;
  } else {
    const newRow = table.insertRow();
    newRow.innerHTML = tableHtml;
  }
}

// (() => {
//   'use strict'

//   // Fetch all the forms we want to apply custom Bootstrap validation styles to
//   const forms = document.querySelectorAll('.needs-validation')

//   // Loop over them and prevent submission
//   Array.from(forms).forEach(form => {
//       form.addEventListener('submit', event => {
//           if (!form.checkValidity()) {
//               event.preventDefault()
//               event.stopPropagation()
//           }

//           form.classList.add('was-validated')
//       }, false)
//   })
// })()

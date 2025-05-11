const API_URL = "https://employee-api-using-nodejs.onrender.com/employee";

function fetchEmployeeData() {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("showData").innerHTML = "";
      data.map((e, index) => {
        document.getElementById("showData").innerHTML += `
                <tr>
                    <td>${e._id}</td>
                    <td>${e.name}</td>
                    <td>${e.email}</td>
                    <td>${e.role}</td>
                    <td>$${e.salary}</td>
                    <td>
                        <button onclick="openModal('${e._id}')" type="button" class="btn btn-edit btn-sm me-1" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <i class="fas fa-edit me-1"></i>Edit
                        </button>
                        <button onclick="handleDelete('${e._id}')" class="btn btn-delete btn-sm">
                            <i class="fas fa-trash me-1"></i>Delete
                        </button>
                    </td>
                </tr>`;
      });
    });
}

fetchEmployeeData();

function handleDelete(id) {
  fetch(API_URL + "/" + id, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Delete Function Executed...");
      fetchEmployeeData();
    });
}

function handleSubmit() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var role = document.getElementById("role").value;
  var salary = document.getElementById("salary").value;
  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, role, salary }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setTimeout(() => {
        window.location.href = "employee.html";
      }, 2000);
    });
}

function openModal(id) {
  console.log("OpenModal Function executed...");
  fetch(API_URL + "/" + id)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("modal-id").value = data._id;
      document.getElementById("modal-name").value = data.name;
      document.getElementById("modal-email").value = data.email;
      document.getElementById("modal-role").value = data.role;
      document.getElementById("modal-salary").value = data.salary;
    });
}

function handleEdit() {
  let id = document.getElementById("modal-id").value;
  let name = document.getElementById("modal-name").value;
  let email = document.getElementById("modal-email").value;
  let role = document.getElementById("modal-role").value;
  let salary = document.getElementById("modal-salary").value;
  fetch(API_URL + "/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, role, salary }),
  })
    .then((response) => response.json())
    .then((data) => {
      setTimeout(() => {
        window.location.href = "employee.html";
      }, 2000);
    });
}

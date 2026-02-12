const API = "http://192.168.31.8:5000";

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(API + "/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      college_email: email,
      password: password
    })
  });

  const data = await res.json();

  if (data.accessToken) {
    localStorage.setItem("adminToken", data.accessToken);
    window.location.href = "index.html";
  } else {
    alert(data.message || "Login failed");
  }
}

async function loadBookings() {
  const token = localStorage.getItem("adminToken");
  if (!token) return;

  const res = await fetch(API + "/api/admin/bookings", {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  const bookings = await res.json();
  const container = document.getElementById("bookings");
  container.innerHTML = "";

  bookings.forEach(b => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <p><b>${b.full_name}</b> - ${b.game_name}</p>
      <p>${b.day_of_week} ${b.start_time} - ${b.end_time}</p>
      <p>Status: ${b.status}</p>
      <button class="approve" onclick="update(${b.id}, 'approved')">Approve</button>
      <button class="reject" onclick="update(${b.id}, 'rejected')">Reject</button>
    `;
    container.appendChild(div);
  });
}

async function update(id, status) {
  const token = localStorage.getItem("adminToken");

  await fetch(API + `/api/admin/bookings/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({
      status,
      remark: ""
    })
  });

  loadBookings();
}

if (window.location.pathname.includes("index.html")) {
  loadBookings();
}

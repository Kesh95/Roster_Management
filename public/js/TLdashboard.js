console.log("Script loaded!");

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const resSession = await fetch('/tl/getLoggedInOlmId');
    const sessionData = await resSession.json();
    const olmId = sessionData.olmId;
    if (olmId) {
      console.log("Type of fetch:", typeof fetch);

      fetch(`/tl/search-user/${olmId}`)
        .then(res => {
          if (!res.ok) {
            if (res.status === 404) {
              alert("User not found.");
            } else {
              console.error("Fetch error:", res.status);
              alert("Error fetching user details.");
            }
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then(user => {
          data=user[0];
          const modalBody = document.querySelector("#viewdetails .data-modal");
          modalBody.innerHTML = `
            <p><strong>Name:</strong> ${data.username}</p>
            <p><strong>OLM ID:</strong> ${data.olmid}</p>
            <p><strong>Contact Number:</strong> ${data.contact_no}</p>
            <p><strong>LOB:</strong> ${data.lob}</p>
            <p><strong>Team:</strong> ${data.team}</p>
          `;
        })
        .catch(err => console.error("Fetch error:", err));
    }
  } catch (err) {
    console.error("Error fetching session OLM ID:", err);
  }
let offcanvasElement = document.getElementById("offcanvasNavbar");
let offcanvasInstance = new bootstrap.Offcanvas(offcanvasElement);

document.querySelectorAll(".open-modal-link").forEach(link => {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    let targetModalId = this.getAttribute("data-bs-target");
    offcanvasInstance.hide();

    offcanvasElement.addEventListener("hidden.bs.offcanvas", function () {
      let modal = new bootstrap.Modal(document.querySelector(targetModalId));
      modal.show();
    }, { once: true });
  });
});

document.getElementById('searchBtn').addEventListener('click', async function () {
  const olmid = document.getElementById('modifyolmsearch').value.trim();

  if (!olmid) {
    alert('Please enter an OLM ID to search.');
    return;
  }
  try {
    const response = await fetch(`/tl/search-user/${olmid}`);
    const data = await response.json();
    const users = data[0];
    if (response.ok) {
      document.getElementById('modifyname').value = users.username || '';
      document.getElementById('modifyolm').value = users.olmid || '';
      document.getElementById('modifycontact').value = users.contact_no || '';
      document.getElementById('modifygender').value = users.gender || '';
      document.getElementById('teamDropdown').value = users.team || '';
      document.getElementById('roledropdown').value = users.role || '';
      document.getElementById('modifypass').value = users.pass || '';
    } else {
      alert(data.message || 'User not found.');
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    alert('Olmid is incorrect.');
  }
});

document.getElementById('searchfordelete').addEventListener('click', async function (e) {
  e.preventDefault(); // Prevent form from reloading

  const olmid = document.getElementById('removeolm').value.trim();
  if (!olmid) {
    alert('Please enter an OLM ID.');
    return;
  }

  try {
    const response = await fetch(`/tl/search-user/${olmid}`);
    const data = await response.json();
    const user = data[0];

    if (response.ok && user) {
      document.getElementById('deletename').value = user.username || '';
      document.getElementById('deleteolm').value = user.olmid || '';
    } else {
      alert(data.message || 'User not found.');
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    alert('Something went wrong while searching.');
  }
});

document.getElementById('deleteBtn').addEventListener('click', async function (e) {
  e.preventDefault();
  const olmid = document.getElementById('removeolm').value.trim();
  if (!olmid) {
    alert('Please enter an OLM ID before deleting.');
    return;
  }

  if (!confirm('Are you sure you want to set status to resign?')) return;

  try {
    const response = await fetch(`/tl/remove-user/${olmid}`, {
      method: 'PUT'
    });

    const result = await response.json();

    if (response.ok) {
      alert('User status updated to resign.');
    } else {
      alert(result.message || 'Failed to update status.');
    }
  } catch (error) {
    console.error('Error updating status:', error);
    alert('Something went wrong during deletion.');
  }
});

document.getElementById('viewModal').addEventListener('show.bs.modal', async function () {
  try {
    const response = await fetch('/tl/all-engineers');
    const engineers = await response.json();
    const tbody = document.querySelector('#viewModal tbody');
    tbody.innerHTML = '';
    engineers.forEach((eng, index) => {
      const row = `
          <tr>
            <th scope="row">${index + 1}</th>
            <td>${eng.olmid}</td>
            <td>${eng.username}</td>                                                                               
            <td>${eng.gender}</td>
            <td>${eng.contact_no}</td>
            <td>${eng.lob}</td>
            <td>${eng.team}</td>
          </tr>`;
      tbody.insertAdjacentHTML('beforeend', row);
    });
  } catch (err) {
    console.error('Error loading engineer data:', err);
    alert('Failed to load engineer data.');
  }
});
  
});
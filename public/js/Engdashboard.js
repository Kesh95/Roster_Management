  let leaveEntries = [];

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const resSession = await fetch('/eng/getLoggedInOlmId');
    const sessionData = await resSession.json();
    // document.getElementById('navbarOlmid').innerText = sessionData.olmId;
    const olmId = sessionData.olmId;
    if (olmId) {
      console.log("Type of fetch:", typeof fetch);

      fetch(`/eng/search-user/${olmId}`)
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
          console.log("User data:", user);
          const modalBody = document.querySelector("#viewdetails .data-modal");
          modalBody.innerHTML = `
            <p><strong>Name:</strong> ${user.data.username}</p>
            <p><strong>OLM ID:</strong> ${user.data.olmid}</p>
            <p><strong>Contact Number:</strong> ${user.data.contact_no}</p>
            <p><strong>LOB:</strong> ${user.data.lob}</p>
            <p><strong>Team:</strong> ${user.data.team}</p>
          `;
        })
        .catch(err => console.error("Fetch error:", err));
    }
  } catch (err) {
    console.error("Error fetching session OLM ID:", err);
  }
  const submitbtn = document.getElementById('submitleave');


document.getElementById('addLeaveBtn').addEventListener('click', function () {
      const start = document.getElementById('leaveStart').value;
      const end = document.getElementById('leaveEnd').value;
      const reason = document.getElementById('leaveReason').value;

      if (!start || !end || !reason) {
        alert("All fields are required!");
        return;
      }
      if (new Date(end) < new Date(start)) {
        alert("End date cannot be before start date.");
        return;
      }

      leaveEntries.push({ start, end, reason });
      renderLeaveTable();

      // Clear inputs after adding
      document.getElementById('leaveStart').value = '';
      document.getElementById('leaveEnd').value = '';
      document.getElementById('leaveReason').value = '';
    });


    // Submit all leaves to backend
 document.getElementById('submitAllLeaves').addEventListener('click', async () => {
  if (leaveEntries.length === 0) {
    alert('No leave records to submit.');
    return;
  }

  try {
    // 1. Get logged-in user's OLM ID
    const resSession = await fetch('/eng/getLoggedInOlmId');
    if (!resSession.ok) throw new Error('Failed to get user session');
    const sessionData = await resSession.json();
    const olmId = sessionData.olmId;
    if (!olmId) {
      alert('User not logged in.');
      return;
    }
    const response = await fetch('/eng/leavedata', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ olmId, leaveRequests: leaveEntries }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      alert(`Failed to submit leaves: ${errorText}`);
      return;
    }
    leaveEntries = [];
    renderLeaveTable();

    document.getElementById('leaveStart').value = '';
    document.getElementById('leaveEnd').value = '';
    document.getElementById('leaveReason').value = '';

const modalEl = document.getElementById('applyleave');
    const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
    modalInstance.hide();


    alert('Saved Successfully!');
  } catch (error) {
    console.error('Error submitting leaves:', error);
    alert('Failed to submit leaves due to a network or server error.');
  }
});


});

    // Render the leave entries table
    function renderLeaveTable() {
      const tbody = document.getElementById('leaveList');
      tbody.innerHTML = '';

      leaveEntries.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${entry.start}</td>
          <td>${entry.end}</td>
          <td>${entry.reason}</td>
          <td><button class="btn btn-danger btn-sm" onclick="removeLeave(${index})">Remove</button></td>
        `;
        tbody.appendChild(row);
      });
    }

    // Remove a leave entry by index
    window.removeLeave = function (index) {
      leaveEntries.splice(index, 1);
      renderLeaveTable();
    };
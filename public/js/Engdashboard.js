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

submitbtn.addEventListener('click', async function (e) {
    e.preventDefault();

    // Get the form element
    const leaveForm = document.getElementById('leave-form');
    const formData = new FormData(leaveForm);
    const data = Object.fromEntries(formData);
    const resSession = await fetch('/eng/getLoggedInOlmId');

    const sessionData = await resSession.json();
    const olmId = sessionData.olmId;
    console.log("Form Data:", data); 

    // Check if all fields are filled before continuing
    if (!data.startdate || !data.enddate || !data.reason) {
        alert("All fields are required!");
        return;
    }

    if (new Date(data.enddate) < new Date(data.startdate)) {
        alert("Error: End date cannot be before start date");
        return;
    }
    const leaveData = {
        olmid:olmId,
        startdate: data.startdate,
        enddate: data.enddate,
        reason: data.reason,
    };

    console.log("Leave Data to Send:", leaveData);

    try {
        const response = await fetch(`/eng/leavedata`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(leaveData),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            alert(`Error submitting leave: ${errorMessage}`);
            return;
        }

        const result = await response.json();
        alert(result.message);

        // Optionally close the modal after successful submission
        const modalCloseButton = document.getElementById('modalclose');
        if (modalCloseButton) {
            modalCloseButton.click();
        }
        // Optionally reset the form
        leaveForm.reset();

    } catch (error) {
        console.error("There was an error submitting the leave:", error);
        alert("An error occurred while submitting your leave. Please try again later.");
    }
});
});
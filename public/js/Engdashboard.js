document.addEventListener("DOMContentLoaded", async function () {
  try {
    const resSession = await fetch('/eng/getLoggedInOlmId');
    const sessionData = await resSession.json();
    document.getElementById('navbarOlmid').innerText = sessionData.olmId;

    const olmId = sessionData.olmId;
    if (olmId) {
      console.log("Type of fetch:", typeof fetch); // Add this line

      fetch(`/eng/search-user/${olmId}`)
        .then(res => {
          if (!res.ok) { // Check if the response status is not OK (e.g., 404)
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
        .then(user => { // The resolved data is now the user object directly
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
});
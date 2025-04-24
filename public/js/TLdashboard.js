console.log("Script loaded!");

document.addEventListener("DOMContentLoaded", async function () {
  //Fetch OLM ID from session and update navbar
  try {
    const res = await fetch('/getLoggedInOlmId');
    const data = await res.json();
    console.log(data);
    document.getElementById('navbarOlmid').innerHTML = data.olmId; // Display OLM ID in navbar
  } catch (err) {
    console.error("Error fetching session OLM ID:", err);
  }

  //Handle modal open from offcanvas menu
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

  const searchButton = document.getElementById("searchBtn");
    if (searchButton) {
        console.log("Search button element found.");
        searchButton.addEventListener("click", function () {
            const olmidInput = document.getElementById("modifyolmsearch");
            if (olmidInput) {
                const olmid = olmidInput.value.trim();
                console.log("Search button clicked. OLM ID to search:", olmid); // <--- ADD THIS LOG

                if (!olmid) {
                    alert("Please enter an OLM ID.");
                    return;
                }

                fetch(`/tl/search-user/${olmid}`)
                    .then(response => {
                        console.log("Fetch request initiated."); // <--- ADD THIS LOG
                        if (!response.ok) {
                            throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log("Search Response Data:", data);
                        if (data && data.success && data.user) {
                            document.getElementById("modifyname").value = data.user.username || '';
                            document.getElementById("modifyolm").value = data.user.olmid || '';
                            document.getElementById("modifycontact").value = data.user.contact_no || '';
                            document.getElementById("modifypass").value = data.user.pass || '';
                            // ... (set other fields) ...
                        } else {
                            alert("User not found!");
                            // ... (clear fields) ...
                        }
                    })
                    .catch(error => {
                        console.error("Error fetching user:", error);
                        alert("Something went wrong while searching for the user.");
                        // ... (clear fields) ...
                    });
            } else {
                console.error("Input field 'modifyolmsearch' not found!");
            }
        });
    } else {
        console.error("Search button with ID 'searchBtn' not found!");
    }
  //Modify Modal
  // document.getElementById("searchBtn").addEventListener("click", function () {
  //   const olmid = document.getElementById("modifyolmsearch").value;

  //   if (!olmid) {
  //     alert("Please enter an OLM ID.");
  //     return;
  //   }

  //   fetch(`/tl/search-user/${olmid}`)
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok ' + response.statusText);
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       console.log("Response Data:", data);
  //       if (data.success && data.user) {
  //         document.getElementById("modifyname").value = data.user.username;
  //         document.getElementById("modifyolm").value = data.user.olmid;
  //         document.getElementById("modifycontact").value = data.user.contact_no;
  //         // document.getElementById("modifygender").value = data.user.gender;
  //         // document.getElementById("lobbtn").value = data.user.lob;
  //         // document.getElementById("teambtn").value = data.user.team;
  //         // document.getElementById("roledropdown").value = data.user.role;
  //         document.getElementById("modifypass").value = data.user.pass;
  //       } else {
  //         alert("User not found!");
  //       }
  //     })
  //     .catch(error => {
  //       console.error("Error fetching user:", error);
  //       alert("Something went wrong.");
  //     });
  // });
});
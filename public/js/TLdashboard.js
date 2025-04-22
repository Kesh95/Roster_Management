console.log("Script loaded!"); // ✅ To confirm JS file is running

document.addEventListener("DOMContentLoaded", function () {
  let offcanvasElement = document.getElementById("offcanvasNavbar");
  let offcanvasInstance = new bootstrap.Offcanvas(offcanvasElement);

  document.querySelectorAll(".open-modal-link").forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      let targetModalId = this.getAttribute("data-bs-target");
      console.log(targetModalId);
      offcanvasInstance.hide();

      offcanvasElement.addEventListener("hidden.bs.offcanvas", function () {
        let modal = new bootstrap.Modal(document.querySelector(targetModalId));
        console.log(modal);
        modal.show();
      }, { once: true });
    });
  });

  document.getElementById('searchBtn').addEventListener('click', async function () {
    const olmid = document.getElementById('modifyolmsearch').value.trim();
  
    console.log("OLM ID Entered:", olmid); // Check if value is fetched
  
    if (!olmid) {
      alert("Please enter an OLM ID");
      return;  // Stop further execution if no OLM ID entered
    }
  
    console.log("Making fetch request to:", `/searchUser/${olmid}`);  // Debug log to see if we are hitting this line
  
    try {
      const res = await fetch(`/searchUser/${olmid}`);
      console.log('Backend response:', res);  // Debugging: Check the raw response
  
      if (!res.ok) {
        throw new Error("User not found");
      }
  
      const data = await res.json();
      console.log('Data received from backend:', data);  // Debugging received data
  
      // Populate fields
      document.getElementById('modifyname').value = data.username;
      document.getElementById('modifyolm').value = data.olmid;
      document.getElementById('modifygender').value = data.gender;
      document.getElementById('modifycontact').value = data.contact_no;
      document.getElementById('lobbtn').value = data.lob;
      document.getElementById('teambtn').value = data.team;
      document.getElementById('roledropdown').value = data.role;
      document.getElementById('modifypass').value = data.pass;
  
    } catch (err) {
      console.error('Error:', err.message);  // Log the error message if fetch fails
      alert(err.message);  // Alert user on failure
      return;  // Terminate function early if error occurs
    }
  });
  
  
  
});


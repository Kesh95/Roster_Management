document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async function (e) {
            e.preventDefault(); // Prevent default form submission

            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            console.log("Form Data:", data); // Log the data being sent

            // Check if all fields are filled before continuing
            if (!data.username || !data.olmid || !data.contact_no || !data.gender || !data.lob || !data.team || !data.pass || !data.confirmpass) {
                alert("All fields are required!");
                return; // Exit the function if any field is empty
            }

            // Check if passwords match before sending data to the backend
            if (data.pass !== data.confirmpass) {
                alert("Passwords don't match!");
                return;
            }

            // Remove confirm_password before sending to the backend
            delete data.confirmpass;

            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            alert(result.message);
        });
    }
});

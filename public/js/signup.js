document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            console.log("Form Data:", data);
            if (!data.username || !data.olmid || !data.contact_no || !data.gender || !data.lob || !data.team || !data.pass || !data.confirmpass) {
                alert("All fields are required!");
                return; 
            }
            if (data.pass !== data.confirmpass) {
                alert("Passwords don't match!");
                return;
            }
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

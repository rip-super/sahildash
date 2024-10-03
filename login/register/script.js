document.addEventListener('DOMContentLoaded', () => {
    const registerButton = document.getElementById("register");
    const content = document.getElementById('content');
    const errorDisplay = document.getElementById("error-display");

    function animate() {
        content.classList.remove('slide-in-animation');
        content.classList.add('slide-out-animation');
    }

    registerButton.addEventListener("click", () => {
        // Hide existing error messages
        document.getElementById("password-mismatch-error").style.display = "none";
        document.getElementById("username-error").style.display = "none";
        errorDisplay.style.display = "none";

        let user = document.getElementById("user").value;
        let pass = document.getElementById("pass").value;
        let pass_conf = document.getElementById("pass-conf").value;

        // Check for missing username
        if (user === "") {
            document.getElementById("username-error").style.display = "";
            return;
        }

        // Check if passwords match
        if (pass !== pass_conf) {
            document.getElementById("password-mismatch-error").style.display = "";
            return;
        }

        // Make the registration request
        fetch('https://sahildash.adamenglish.net/accounts/register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'username': user,
                'password': pass
            })
        }).then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        }).then((data) => {
            if (data["status"]["status-code"] == 0) {
                // Account created successfully
                animate();
                setTimeout(() => {
                    window.location.href = "https://sahildash.uk.to/login/"; // Redirect to login page
                }, 400);
            } else {
                // Handle registration error and display in HTML
                const errorMessage = "Registration failed: " + data["status"]["status-description"];
                console.error(errorMessage);
                errorDisplay.textContent = errorMessage;
                errorDisplay.style.display = "";
            }
        }).catch((error) => {
            // Display any network or fetch errors
            console.error(error.message);
            errorDisplay.textContent = "An error occurred: " + error.message;
            errorDisplay.style.display = "";
        });

        // Handle Enter key press to submit
        document.body.addEventListener("keypress", (event) => {
            if (event.keyCode == 13) {
                registerButton.click();
            }
        });
    });
});
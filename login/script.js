document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById("login-button");
    const content = document.getElementById('content');

    function animate() {
        content.classList.remove('slide-in-animation');
        content.classList.add('slide-out-animation');
    }

    function confirmCredentials() {
        let correct = false;
        let user = document.getElementById("username-field").value;
        let pass = document.getElementById("password-field").value;

        fetch('https://sahildash.adamenglish.net/accounts/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'username': user,
                'password': pass
            })
        }).then((response) => {
            if (!response["status"]["status-code"] == 0) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            else {
                correct = true
            }
        });

        if (!correct) {
            window.sessionStorage.setItem("e", "1");
            window.sessionStorage.setItem("username", document.getElementById("username-field").value)
            window.location.reload();
        }

        else {
            window.location.href = "https://sahildash.uk.to/";
        }
    }

    loginButton.addEventListener('click', () => {
        document.getElementById("username-error").style.display = "none";
        document.getElementById("password-error").style.display = "none";
        document.getElementById("incorrect-error").style.display = "none";

        if (document.getElementById('username-field').value == "") {
            document.getElementById("username-error").style.display = "";
        }

        if (document.getElementById('password-field').value == "") {
            document.getElementById("password-error").style.display = "";
        }

        if (document.getElementById('username-field').value == "" || document.getElementById('password-field').value == "") {
            return;
        }

        animate();
        setTimeout(() => { confirmCredentials(); }, 400);
    });

    if (window.sessionStorage.getItem("e") == "1") {
        document.getElementById("incorrect-error").style.display = "";
        document.getElementById("username-field").value = window.sessionStorage.getItem("username");
        window.sessionStorage.setItem("e", "");
        window.sessionStorage.setItem("username", "");
        setTimeout(() => { document.getElementById("password-field").focus(); }, 400);
    }

    document.body.addEventListener("keypress", (event) => {
        if (event.keyCode == 13) {
            loginButton.click();
        }
    });
});
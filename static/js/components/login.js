const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});


function login() {
    const sessionMessageElement = document.getElementById("session_message")
    sessionMessageElement.innerText = "Logging in..."

    axios.post('/api/sessions', {
        user_name: "user",
        password: "password",
    }).then((response) => {
        sessionMessageElement.innerText = "Logged in"
    }).catch(() => {
        sessionMessageElement.innerText = "Unable to log in"
    })
}


//MODAL CONTROL - FRONT END
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});


//LOGIN BACKEND

const logInForm = document.getElementById('login')
logInForm.addEventListener('submit', function (event){

    event.preventDefault()
    const formData = new FormData(document.getElementById('login'))
    console.log(event)
    const data = {
        email: formData.get("email"),
        password_hash: formData.get("password")
    }
    console.log(data)
    document.forms['login'].reset()

    const loginErrors = document.getElementById("login-errors")
    loginErrors.innerText = "Logging in..."

    axios
        .post('/api/sessions', data)
        .then((response) => {
            loginErrors.innerText = "Logged in"
            window.location.reload()
        }).catch((status) => {
            const statusCode = status.response['status']
            
            if(statusCode === 404){
                loginErrors.innerText = "Youll need to signup"
            }
            if(statusCode === 401){
                loginErrors.innerText = "Incorrect Password"
            }
            if(statusCode === 200){
                document.getElementById('modal-container').style.display = 'none'
            }
            
        })
        
})








const signUpForm = document.getElementById('signup')
signUpForm.addEventListener('submit', function (event){

    //CREATS DATA JSON USING FORM INPUTS
    event.preventDefault()
    const formData = new FormData(document.getElementById('signup'))
    console.log(event)
    const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password")
    }
    
    //RESETS FORM
    document.forms['signup'].reset()

    //POST DATA
    const statusText = document.getElementById('errors')
    axios
        .post("/api/users", data)
        .then((response) => {
            statusText.innerHTML = `<p>Success!</p>`

        }).catch((status) => {
            const statusCode = status.response['status']

            if( statusCode == 400){
                statusText.innerHTML = `
                <p color='red' > Passwords must be 8 characters long</p>`
            }
            if(statusCode == 403){
                statusText.innerHTML = `
                <p color='red' > Email already in use</p>`
            }
            

        })

})



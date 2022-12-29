

const signUpForm = document.getElementById('signup')
signUpForm.addEventListener('submit', function (event){

    event.preventDefault()
    const formData = new FormData(document.getElementById('signup'))
    console.log(event)
    const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password")
    }
    
    axios
        .post("/api/users", data)
        .then((response) => {


        }).catch((err) => {
            const errors = document.getElementById('errors')
            const error = err.response['status']
            
            if( error == 400){
                errors.innerHTML = `
                <h2 color='red' > All fields must be filled / Passwords must be 8 characters long</h2>`
            }if(error == 403){
                errors.innerHTML = `
                <h2 color='red' > Password already in use</h2>`
            }
            

        })

})



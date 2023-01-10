import { renderHeader } from "./components/header.js";
axios.get('/api/sessions').then(apiRes => {
    const email = apiRes.data.email
    const isLoggedIn = Boolean(email)
    const name = apiRes.data.name
    const userName = name.toUpperCase()
    console.log(email)
    renderHeader(email, isLoggedIn, userName)
}).catch(err => {
    renderHeader()
})

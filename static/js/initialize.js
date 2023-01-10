import { renderHeader } from "./components/header.js";
axios.get('/api/sessions').then(apiRes => {
    const email = apiRes.data.email
    const isLoggedIn = Boolean(email)
    renderHeader(email, isLoggedIn)
}).catch(err => {
    
})

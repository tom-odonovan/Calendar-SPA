import { renderMonth } from './month.js'
import { renderWeek } from './weekly.js'
import { renderCurrentDay } from './render_daily.js'


export function renderHeader(email, session, userName){

    const header = document.getElementById('header')
    header.innerHTML = ''

    // Render logo
    const logoContainer = document.createElement('div')
    logoContainer.className = 'logo'
    header.appendChild(logoContainer)
    const logo = document.createElement('img')
    logo.setAttribute('src', '/images/logo.png')
    logoContainer.appendChild(logo)

    

    // Render dropdown menu
    const menuContainer = document.createElement('div')
    menuContainer.className = 'menu-container'
    header.appendChild(menuContainer)

    const menuButton = document.createElement('div')
    menuButton.id = 'menu-button'
    menuButton.classList.add('menu-toggle')
    menuContainer.appendChild(menuButton)

    const menu = document.createElement('div')
    menu.className = 'dropdown-menu hidden'
    menu.id = 'menu'
    menuContainer.appendChild(menu)
    

    //CHANGE DROP DOWN DEPENDING ON LOGIN
    if(session){
        menu.innerHTML = `
            <a href='#'>CALENDAR</a>
            <a href='#'>CONTACT</a>
            <a href='#'>LOGOUT</a>
        `
    }else {
        menu.innerHTML = `
            <a href='#'>CALENDAR</a>
            <a href='#'>CONTACT</a>
            <a href='#'>SIGN IN</a>
        `
    }
    

    for (let i = 1; i <= 3; i++) {
        let bar = document.createElement('div')
        bar.className = `bar${i}`
        menuButton.appendChild(bar)
    }

    // Render nav buttons
    const navButtons = document.createElement('nav')
    navButtons.id = 'navigation'
    navButtons.className = 'navigation'

    // IF SESSIONS EXISTS NAV MENU
    if(session){
        let viewNames = [ userName, 'DAY', 'WEEK', 'MONTH']
        for (let name of viewNames) {
            if(name === userName){
                let navButton = document.createElement('button')
                navButton.className = 'name-button'
                navButton.innerHTML = name
                navButtons.appendChild(navButton)
            }if(name !== userName){
                let navButton = document.createElement('button')
                navButton.className = 'nav-button'
                navButton.innerHTML = name
                navButtons.appendChild(navButton)
            }
        }
        header.appendChild(navButtons)
    }else{
        let viewNames = [ 'SIGN IN']
        for (let name of viewNames) {
            let navButton = document.createElement('button')
            navButton.className = 'nav-button'
            navButton.innerHTML = name
            navButtons.appendChild(navButton)
        }
        header.appendChild(navButtons)
    }
        
        
    // Alow user to change view using nav buttons 
    navButtons.addEventListener('click', (e) => {
        const button = e.target.innerHTML
        if (button === 'SIGN IN') {
            const modal = document.getElementById('modal-container')
            modal.style.display = 'block'
        }
        if (button === 'MONTH') {
            renderMonth(0)
        }
        if (button === 'WEEK') {
            renderWeek()
        }
        if (button === 'DAY') {
            renderCurrentDay(0)
        }
    })

    //LOGIN/SIGNUP MODAL 
    window.addEventListener('click',  (e) => {
        const modal = document.getElementById('modal-container')
        const errors = document.getElementById('errors')
        if(e.target == modal){
            modal.style.display = 'none'
            errors.innerHTML = ``
        }
        
    })

    // Render dropdown menu when user clicks menu button
    menuButton.addEventListener('click', () => {
        menuButton.classList.toggle('change')
        menu.classList.toggle('hidden')
        menu.classList.toggle('active')
       
        const menuButtons = document.getElementById('menu')
        menuButtons.addEventListener('click', (e) => {
        const btnClicked = e.target.innerHTML

        if(btnClicked === 'LOGOUT'){
            axios
            .delete('/api/sessions')
            .then((response) => {
                window.location.reload()
            })
        }if(btnClicked === 'CALENDAR'){
            renderMonth(0)
        }
        if (btnClicked === 'SIGN IN') {
            const modal = document.getElementById('modal-container')
            modal.style.display = 'block'
        }
        
        
    })
        
    })

    
}

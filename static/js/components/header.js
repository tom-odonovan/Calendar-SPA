
export function renderHeader(){

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
    menuContainer.appendChild(menu)

    menu.innerHTML = `
        <a href='#'>CALENDAR</>
        <a href='#'>PROFILE</>
        <a href='#'>ABOUT</>
        <a href='#'>CONTACT</>
        <a href='#'>LOGOUT</>
    `

    for (let i = 1; i <= 3; i++) {
        let bar = document.createElement('div')
        bar.className = `bar${i}`
        menuButton.appendChild(bar)
    }

    // Render nav buttons
    const navButtons = document.createElement('nav')
    navButtons.id = 'navigation'
    navButtons.className = 'navigation'
    let viewNames = ['SIGN IN', 'DAY', 'WEEK', 'MONTH']
    for (let name of viewNames) {
        let navButton = document.createElement('button')
        navButton.className = 'nav-button'
        navButton.innerHTML = name
        navButtons.appendChild(navButton)
    }
    header.appendChild(navButtons)

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
        
    })
}


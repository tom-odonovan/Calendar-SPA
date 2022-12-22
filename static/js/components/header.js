export function renderHeader(){
        const header = document.getElementById('header')
        
        header.innerHTML = `
    <div class="logo">
        <img src="/images/logo.png">
    </div>
    <!--- MENU BUTTON -->
    <div class="menu-toggle" onclick="menuFunction(this)">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
    </div>

    <nav id="navigation" class="navigation">
        <button id='nav-button' class="nav-button">Day</button>
        <button id='nav-button' class="nav-button">Week</button>
        <button id='nav-button' class="nav-button">Month</button>
        <!-- <button class="nav-button">Year</button> -->
    </nav>
    `
    const navButtons = document.getElementById('navigation')
    navButtons.addEventListener('click', (e) => {
        const button = e.target.innerHTML
        if(button === 'Month'){
            renderMonth()
        }
        if(button === 'Week'){
            renderWeek()
        }
        if(button === 'Day'){
            renderCurrentDay()
        }
    })
}


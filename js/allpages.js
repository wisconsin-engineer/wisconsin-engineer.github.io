/**
 * Dropdown menu logic
 */
document.addEventListener("DOMContentLoaded", function() {
    const menuButton = document.getElementById("navDrop");
    const buttons = document.querySelectorAll(".dropdown-content");
    const scrollButton = document.getElementById("scrollbutton");

    // collapsed by default
    buttons.forEach(button => {
        button.style.display = 'none';
    });
    menuButton.style.borderBottom = 'none';

    /**
     * toggle open or collapsed
     */ 
    function dropdown() {
        menuButton.classList.toggle("show");
        const buttons = document.querySelectorAll(".dropdown-content");
        buttons.forEach(button => {
            button.style.display = menuButton.classList.contains("show") ? 'block' : 'none';
        });
        menuButton.style.borderBottom = menuButton.classList.contains("show") ? '1px solid #bbb' : 'none';
    }

    // collapse menu if user clicks outside of it
    window.onclick = function(e) {
        if (!e.target.matches('.drop-button') && !e.target.matches('.navbarelements')) {
            if (menuButton.classList.contains('show')) {
                menuButton.classList.remove('show');
                menuButton.style.borderBottom = menuButton.classList.contains("show") ? '1px solid #bbb' : 'none';
            }
            const buttons = document.querySelectorAll(".dropdown-content");
            buttons.forEach(button => {
                button.style.display = menuButton.classList.contains("show") ? 'block' : 'none';
            });
        } else {
        }
    }

    scrollButton.onclick = function(e) {
        window.scrollTo(0, 0);
    }

    menuButton.addEventListener('click', dropdown);
});

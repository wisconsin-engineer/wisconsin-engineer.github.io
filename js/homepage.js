/*
 * Collapses home page content into a single column in windowed mode and on mobile
 */

// after page is loaded, edit layout of grid to match size of screen
document.addEventListener("DOMContentLoaded", function() {

    if (!isMobile()) {
        window.addEventListener('resize', handleResize);
        handleResize();
    } else {
        const contentContainer = document.querySelector('.content-container');
        contentContainer.style.display = 'flex';
        contentContainer.style.flexDirection = 'column';
        contentContainer.style.width = '75%';
        const IGEmbed = document.querySelector('.instagram-embed');
        IGEmbed.style.width = '50%';
    }

    // updates a few size things
    function handleResize() {
        if (!isMobile()) {
            const contentContainer = document.querySelector('.content-container');
            contentContainer.style.display = lessThan90() ? 'flex' : 'grid';
            contentContainer.style.width = lessThan90() ? '50%' : '75%';
            contentContainer.style.flexDirection = lessThan90() ? 'column' : 'none';
            const IGEmbed = document.querySelector('.instagram-embed');
            IGEmbed.style.width = '75%';
        }
    }

    function lessThan90(){
        const screenWidth = window.screen.width;
        const windowWidth = window.innerWidth;
        const threshold = 0.25 * screenWidth;
    
        // less than 90% of the max screen width, then set as columns
        return (windowWidth < screenWidth - threshold);
    }

    function isMobile() {
        const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        return regex.test(navigator.userAgent);
    }
});


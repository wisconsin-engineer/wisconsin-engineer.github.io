// after page is loaded, edit layout of grid to match size of screen
document.addEventListener("DOMContentLoaded", function() {

    if (!isMobile()) {
        window.addEventListener('resize', handleResize);
        handleResize();
    } else {
        const biographyContainer = document.querySelector('.biography-container');
        biographyContainer.style.display = 'flex';
        biographyContainer.style.flexDirection = 'column';
        biographyContainer.style.width = '50%';
        biographyContainer.style.paddingLeft = '25%';
    }


    // updates a few size things
    function handleResize() {
        if (!isMobile()) {
            const biographyContainer = document.querySelector('.biography-container');
            biographyContainer.style.display = lessThan90() ? 'flex' : 'grid';
            biographyContainer.style.width = lessThan90() ? '50%' : '75%';
            biographyContainer.style.paddingLeft = lessThan90() ? '25%' : '12.5%';
            biographyContainer.style.flexDirection = lessThan90() ? 'column' : 'none';
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


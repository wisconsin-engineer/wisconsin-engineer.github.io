/*
 * Used for the team page, will collapse grid into single cell wide on mobile and windowed mode
 *
 */

// after page is loaded, edit layout of grid to match size of screen
document.addEventListener("DOMContentLoaded", function() {

    if (!isMobile()) {
        window.addEventListener('resize', handleResize);
        handleResize();
    } else {
        const biographyContainer = document.querySelector('.biography-container');
        biographyContainer.style.display = 'flex';
        biographyContainer.style.flexDirection = 'column';
        biographyContainer.style.width = '75%';
        biographyContainer.style.paddingLeft = '12.5%';
    }

    // updates a few size things
    function handleResize() {
        if (!isMobile()) {
            const biographyContainer = document.querySelector('.biography-container');
            biographyContainer.style.display = lessThan90() ? 'flex' : 'grid';
            biographyContainer.style.width = lessThan90() ? '50%' : '75%';
            biographyContainer.style.margin = '0 auto 50px';            
            biographyContainer.style.flexDirection = lessThan90() ? 'column' : 'none';
            const pictureCards = document.querySelectorAll('.picture-card');
            pictureCards.forEach(pictureCard => {
                pictureCard.style.height = lessThan90() ? '250px' : '300px';
            });
            const pictures = document.querySelectorAll('.picture');
            pictures.forEach(picture => {
                picture.style.width = lessThan90() ? '250px' : '300px';
            });
        }
    }

    function lessThan90(){
        const screenWidth = window.screen.width;
        const windowWidth = window.innerWidth;
        const threshold = 0.25 * screenWidth;
    
        // less than 75% of the max screen width, then set as columns (i didnt feel like changing the name)
        return (windowWidth < screenWidth - threshold);
    }

    function isMobile() {
        const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        return regex.test(navigator.userAgent);
    }
});


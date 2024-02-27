/*
 * Used for the about page, will collapse grid into single cell wide on mobile and windowed mode
 *
 */

// after page is loaded, edit layout of grid to match size of screen
document.addEventListener("DOMContentLoaded", function() {

    if (!isMobile()) {
        window.addEventListener('resize', handleResize);
        handleResize();
    } else {
        const imageGrid = document.querySelector('.image-grid');
        imageGrid.style.display = 'flex';
        imageGrid.style.flexDirection = 'column';
        imageGrid.style.width = '75%';
        imageGrid.style.paddingLeft = '12.5%';
        const pictures = document.querySelectorAll('.image-grid .teamimage');
        pictures.forEach(picture => {
            picture.style.width = '250px';
        });
    }

    // updates a few size things
    function handleResize() {
        if (!isMobile()) {
            const imageGrid = document.querySelector('.image-grid');
            imageGrid.style.display = lessThan90() ? 'flex' : 'grid';
            imageGrid.style.width = lessThan90() ? '50%' : '75%';
            imageGrid.style.margin = '0 auto 50px';            
            imageGrid.style.flexDirection = lessThan90() ? 'column' : 'none';
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


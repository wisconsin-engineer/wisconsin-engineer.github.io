/*
 * Collapses connect page content into one column in windowed mode and on mobile
 */

// after page is loaded, edit layout of grid to match size of screen
document.addEventListener("DOMContentLoaded", function() {

    if (!isMobile()) {
        window.addEventListener('resize', handleResize);
        handleResize();
        createPaypal();
    } else {
        const contentContainer = document.querySelector('.content-container');
        contentContainer.style.display = 'flex';
        contentContainer.style.flexDirection = 'column';
        contentContainer.style.width = '75%';
        contentContainer.style.paddingLeft = '12.5%';
    }

    // updates a few size things
    function handleResize() {
        if (!isMobile()) {
            const contentContainer = document.querySelector('.content-container');
            contentContainer.style.display = lessThan90() ? 'flex' : 'grid';
            contentContainer.style.width = lessThan90() ? '50%' : '75%';
            contentContainer.style.paddingLeft = lessThan90() ? '25%' : '12.5%';
            contentContainer.style.flexDirection = lessThan90() ? 'column' : 'none';
            const mapEmbed = document.querySelector('.map-embed');
            mapEmbed.style.height = lessThan90() ? '400px' : '50%';
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

    function createPaypal() {
        paypal.Buttons({
            style: {
                shape: 'rect',
                color: 'gold',
                layout: 'vertical',
                label: 'paypal'
            },
            createSubscription: function(data, actions) {
                return actions.subscription.create({
                /* Creates the subscription */
                plan_id: 'P-8AG83334XM641921KMVXKO5Y'
                });
            },
            onApprove: function(data, actions) {
                alert(data.subscriptionID); // You can add optional success message for the subscriber here
            }
        }).render('#paypal-button-container-P-8AG83334XM641921KMVXKO5Y'); // Renders the PayPal button
    }  
});


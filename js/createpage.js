/**************************************************************************************   
    dynamic creation of page navbar and footer using javascript 
    did this so that these wouldn't have to be copied and pasted into every single page
    and can be edited in one convenient place albeit a little more complicated
    also has some other logic specific to the navbar and footer, will update later
**************************************************************************************/

// after page is loaded, create everything
document.addEventListener("DOMContentLoaded", function() {

    var title = document.title;

    /******************************************
     * Adding a few things to the head of pages
     ******************************************/
    var link = document.createElement('link');

    // Set the attributes for the link element
    link.rel = 'icon';
    link.href = (title === "Home") ? 'images/icons/logo.png' : '../images/icons/logo.png';
    link.href = title.includes("Article:") ? '../../images/icons/logo.png' : link.href;
    link.type = 'image/png';

    // Append the link element to the head of the document
    document.head.appendChild(link);

    /******************************************
     * Navbar creation code
     ******************************************/
    const navContainer = document.createElement('div');
    navContainer.style.width = '100%';
    navContainer.style.backgroundColor = '#FFFFFF';
    navContainer.style.position = 'fixed'
    navContainer.style.display = 'flex';
    navContainer.className = 'navbar-container';

    // Create the unordered list for the navigation bar
    const navbar = document.createElement('ul');
    navbar.className = 'navbar';

    // Create the logo image and append it to the navbar
    /**/
    const anchor = document.createElement('a');
    const logo = document.createElement('img');
    anchor.href = (title === "Home") ? 'index.html' : '../index.html';
    anchor.href = title.includes("Article:") ? '../../index.html' : anchor.href;
    logo.className = 'logo';
    logo.src = (title === "Home") ? 'images/icons/logo.png' : '../images/icons/logo.png';
    logo.src = title.includes("Article:") ? '../../images/icons/logo.png' : logo.src;
    logo.alt = 'wisconsinengineer';
    anchor.appendChild(logo);
    /**/

    navContainer.appendChild(anchor);

    // Links
    const links = [
        { href: 'index.html', text: 'Home' },
        { href: 'pages/about.html', text: 'About' },
        { href: 'pages/team.html', text: 'Team' },
        { href: 'pages/articles.html', text: 'Articles' },
        { href: 'pages/crossword.html', text: 'Crossword'},
        { href: 'pages/photocontest.html', text: 'Photo Contest'},
        { href: 'pages/connect.html', text: 'Connect'},
    ];

    links.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = (title === "Home") ?  link.href : '../' + link.href;
        a.href = (title.includes("Article:")) ? '../../' + link.href : a.href;
        li.className = 'navbarelements';
        a.textContent = link.text;
        li.appendChild(a);
        navbar.appendChild(li);
    });

    navContainer.append(navbar);

    // Append the navbar to the container and add it to the beginning of the page
    document.body.prepend(navContainer);

    /***********************************************
     * Comment section code for articles pages
     ***********************************************/
    if (title.includes("Article:")) {
        
        var h3 = document.createElement("h3");
        h3.textContent = "Leave a Comment!";
        var h4 = document.createElement("h4");
        h4.textContent = "Comments are moderated, please be respectful.";

        // Create form element
        var form = document.createElement("form");
        form.action = "https://formspree.io/f/xrgnqlab";
        form.method = "POST";

        // Create email label and input
        var emailLabel = document.createElement("label");
        emailLabel.textContent = "Your email:";
        var emailInput = document.createElement("input");
        emailInput.type = "email";
        emailInput.name = "email";
        emailLabel.appendChild(emailInput);

        // Create message label and textarea
        var messageLabel = document.createElement("label");
        messageLabel.textContent = "Your message:";
        var messageInput = document.createElement("textarea");
        messageInput.name = "message";
        messageLabel.appendChild(messageInput);

        // Create hidden input for page title
        var hiddenInput = document.createElement("input");
        hiddenInput.type = "hidden";
        hiddenInput.name = "page_title";
        hiddenInput.value = "Template page";

        // Create submit button
        var submitButton = document.createElement("button");
        submitButton.type = "submit";
        submitButton.textContent = "Send";
        // Append elements to form
        form.appendChild(emailLabel);
        const pageBreak = document.createElement("br");
        const pageBreak2 = document.createElement("br");
        form.appendChild(pageBreak);
        form.appendChild(messageLabel);
        form.appendChild(hiddenInput);
        form.appendChild(pageBreak2);
        form.appendChild(submitButton);

        // Append form to div
        document.querySelector(".comment-section").appendChild(h3);
        document.querySelector(".comment-section").appendChild(h4);
        document.querySelector(".comment-section").appendChild(form);
    }
    
    /************************************************
     * Footer creation code
     ***********************************************/
    const footer = document.createElement('div');
    footer.className = 'footer';
    footer.style.margin = '0';
    footer.style.paddingLeft = '20px';
    footer.style.paddingTop = '20px';
    footer.style.backgroundColor = '#273036';

    const leftHalf = document.createElement('div');

    const footerLogo = document.createElement('img');
    footerLogo.className = 'logo';
    footerLogo.src = (title === "Home") ? 'images/icons/footerlogo.png' : '../images/icons/footerlogo.png';
    footerLogo.src = title.includes("Article:") ? '../../images/icons/footerlogo.png' : footerLogo.src;
    footerLogo.alt = 'wisconsinengineer';
    footer.appendChild(footerLogo);

    // Append the footer to the body, after all of the page-specific content
    document.body.appendChild(footer);
});
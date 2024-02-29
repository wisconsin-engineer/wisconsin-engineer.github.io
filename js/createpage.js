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
    navContainer.style.border = '1px solid #000000';
    navContainer.style.position = 'fixed'
    navContainer.style.display = 'flex';

    // Create the unordered list for the navigation bar
    const navbar = document.createElement('ul');
    navbar.className = 'navbar';

    // Create the logo image and append it to the navbar
    /**
    const anchor = document.createElement('a');
    const logo = document.createElement('img');
    anchor.href = (title === "Home") ? 'index.html' : '../index.html';
    anchor.href = title.includes("Article:") ? '../../index.html' : anchor.href;
    logo.className = 'logo';
    logo.src = (title === "Home") ? 'images/icons/logo.png' : '../images/icons/logo.png';
    logo.src = title.includes("Article:") ? '../../images/icons/logo.png' : logo.src;
    logo.alt = 'wisconsinengineer';
    anchor.appendChild(logo);
    navbar.appendChild(anchor);
    /**/

    // Create the search bar and append it to the navbar, not needed at the moment
    /**
    const searchbar = document.createElement('div');
    searchbar.className = 'searchbar';
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'searchbox';
    input.name = 'searchbox';
    input.placeholder = 'Search Wisconsin Engineer';
    input.required = true;
    const button1 = document.createElement('button');
    button1.textContent = 'Go';
    searchbar.appendChild(input);
    searchbar.appendChild(button1);
    navbar.appendChild(searchbar);
    /**/

    // Create the dropdown menu
    const dropdown = document.createElement('li');
    dropdown.className = 'navbarelements dropdown-menu';
    const dropButton = document.createElement('button');
    dropButton.className = 'drop-button';
    dropButton.id = 'navDrop';
    dropButton.innerHTML = 'Menu <i class="fa fa-caret-down"></i>';
    dropdown.appendChild(dropButton);

    // Dropdown content
    const dropdownContent = document.createElement('div');
    const links = [
        { href: 'index.html', text: 'Home' },
        { href: 'pages/about.html', text: 'About' },
        { href: 'pages/team.html', text: 'Meet Our Team' },
        { href: 'pages/articles.html', text: 'Articles' },
        { href: 'pages/crossword.html', text: 'Crossword'},
        { href: 'pages/photocontest.html', text: 'Photo Contest'},
        { href: 'pages/connect.html', text: 'Connect/Subscribe'}
    ];

    links.forEach(link => {
        const a = document.createElement('a');
        a.href = (title === "Home") ?  link.href : '../' + link.href;
        a.href = (title.includes("Article:")) ? '../../' + link.href : a.href;
        console.log(a.href);
        a.className = 'navbarelements dropdown-content';
        a.textContent = link.text;
        dropdownContent.appendChild(a);
    });

    dropdown.appendChild(dropdownContent);
    navbar.appendChild(dropdown);

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

    // Append the navbar to the container and add it to the beginning of the page
    navContainer.appendChild(navbar);
    navContainer.appendChild(anchor);
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
    footer.style.backgroundColor = '#3232';
    footer.style.margin = '0';
    footer.style.paddingLeft = '20px';
    footer.style.paddingTop = '20px';
    footer.style.marginTop = '20px';

    // Add social media links
    const socialMediaBox = document.createElement('div');

    // Instagram logo creation
    const instagram = document.createElement('a');
    instagram.href = 'https://www.instagram.com/thewisconsinengineer/';
    const instagramIcon = document.createElement('img');
    instagramIcon.style.width = '50px';
    instagramIcon.src = (title === "Home") ? 'images/icons/instagram.png' : '../images/icons/instagram.png';
    instagramIcon.src = title.includes("Article:") ? '../../images/icons/instagram.png' : instagramIcon.src;
    instagramIcon.alt = 'Instagram';
    instagram.appendChild(instagramIcon); // Append the Instagram icon to the anchor

    // Twitter logo creation
    const twitter = document.createElement('a');
    twitter.href = 'https://twitter.com/wiscengrmag?lang=en';
    const twitterIcon = document.createElement('img');
    twitterIcon.style.width = '50px';
    twitterIcon.src = (title === "Home") ? 'images/icons/twitter.png' : '../images/icons/twitter.png';
    twitterIcon.src = title.includes("Article:") ? '../../images/icons/twitter.png' : twitterIcon.src;
    twitterIcon.alt = 'Twitter';
    twitter.appendChild(twitterIcon); // Append the Twitter icon to the anchor

    // Facebook logo creation
    const facebook = document.createElement('a');
    facebook.href = 'https://www.facebook.com/WiscEngrMag';
    const facebookIcon = document.createElement('img');
    facebookIcon.style.width = '50px';
    facebookIcon.src = (title === "Home") ? 'images/icons/facebook.png' : '../images/icons/facebook.png';
    facebookIcon.src = title.includes("Article:") ? '../../images/icons/facebook.png' : facebookIcon.src;
    facebookIcon.alt = 'Facebook';
    facebook.appendChild(facebookIcon); // Append the Facebook icon to the anchor

    // YouTube logo creation
    const youtube = document.createElement('a');
    youtube.href = 'https://www.youtube.com/channel/UCyxWH_OPZ0pqJXxewkZAqpw';
    const youtubeIcon = document.createElement('img');
    youtubeIcon.style.width = '50px';
    youtubeIcon.src = (title === "Home") ? 'images/icons/youtube.png' : '../images/icons/youtube.png';
    youtubeIcon.src = title.includes("Article:") ? '../../images/icons/youtube.png' : youtubeIcon.src;
    youtubeIcon.alt = 'YouTube';
    youtube.appendChild(youtubeIcon); // Append the YouTube icon to the anchor

    socialMediaBox.appendChild(instagram);
    socialMediaBox.appendChild(twitter);
    socialMediaBox.appendChild(facebook);
    socialMediaBox.appendChild(youtube);
    footer.appendChild(socialMediaBox);

    // Create the footer search bar, not needed at the moment
    /**
    const footerSearchbar = document.createElement('div');
    footerSearchbar.className = 'footer-searchbar';
    const input2 = document.createElement('input');
    input2.type = 'text';
    input2.id = 'footer-searchbox';
    input2.name = 'searchbox';
    input2.placeholder = 'Search Wisconsin Engineer';
    input2.required = true;
    const button2 = document.createElement('button');
    button2.textContent = 'Go';
    footerSearchbar.appendChild(input2);
    footerSearchbar.appendChild(button2);
    footer.appendChild(footerSearchbar);
    /**/

    // Add recent posts section
    const recentPostsTitle = document.createElement('h2');
    recentPostsTitle.textContent = 'Recent Posts';
    footer.appendChild(recentPostsTitle);

    // TODO update this whenever adding new posts!
    const postsList = document.createElement('ul');
    const posts = [
        { href: '#', text: 'Title of post 1' },
        { href: '#', text: 'Title of post 2' },
        { href: '#', text: 'Title of post 3' },
        { href: '#', text: 'Title of post 4' },
        { href: '#', text: 'Title of post 5' }
    ];

    posts.forEach(post => {
        const postLink = document.createElement('a');
        postLink.href = post.href;
        const postItem = document.createElement('li');
        postItem.textContent = post.text;
        postLink.appendChild(postItem);
        postsList.appendChild(postLink);
    });

    footer.appendChild(postsList);

    // Add copyright
    const copyright = document.createElement('h4');
    copyright.innerHTML = '&copy; 2024 Wisconsin Engineer Magazine | <a href="https://digital.library.wisc.edu/1711.dl/7P3DBZ6M5SIJV8I" target="_blank">Archive</a>';
    footer.appendChild(copyright);

    // Add 'scroll to top' button
    const scrollButton1 = document.createElement('button');
    scrollButton1.id = 'scrollbutton';
    scrollButton1.textContent = 'Click to go to top of page';
    scrollButton1.onclick = function() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };
    footer.appendChild(scrollButton1);

    // Append the footer to the body, after all of the page-specific content
    document.body.appendChild(footer);
    
    /**************************************************************
     * Dropdown menu logic
     **************************************************************/
    const menuButton = document.getElementById("navDrop");
    const buttons = document.querySelectorAll(".dropdown-content");
    const scrollButton = document.getElementById("scrollbutton");

    // collapsed by default
    buttons.forEach(button => {
        button.style.display = 'none';
    });
    menuButton.style.borderBottom = 'none';

    // toggle open or collapsed
    function dropDown() {
        menuButton.classList.toggle("show");
        const buttons = document.querySelectorAll(".dropdown-content");
        buttons.forEach(button => {
            button.style.display = menuButton.classList.contains("show") ? 'block' : 'none';
        });
        menuButton.style.borderBottom = menuButton.classList.contains("show") ? '1px solid #bbb' : 'none';
    }
    
    menuButton.addEventListener('click', dropDown);
    
});
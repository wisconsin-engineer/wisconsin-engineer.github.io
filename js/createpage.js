/**************************************************************************************   
    dynamic creation of page navbar and footer using javascript 
    did this so that these wouldn't have to be copied and pasted into every single page
    and can be edited in one convenient place albeit a little more complicated
    also has some other logic specific to the navbar and footer, will update later
**************************************************************************************/

// after page is loaded, create everything
document.addEventListener("DOMContentLoaded", function() {

    /******************************************
     * Navbar creation code
     ******************************************/
    const navContainer = document.createElement('div');

    // Create the unordered list for the navigation bar
    const navbar = document.createElement('ul');
    navbar.className = 'navbar';

    // Create the logo image and append it to the navbar
    const logo = document.createElement('img');
    logo.className = 'logo';
    logo.src = 'images/logo.png';
    logo.alt = 'wisconsinengineer';
    navbar.appendChild(logo);

    // Create the search bar and append it to the navbar
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
        { href: 'about.html', text: 'About' },
        { href: 'articles.html', text: 'Articles' },
        { href: 'team.html', text: 'Meet Our Team' },
        { href: 'connect.html', text: 'Connect' },
        { href: 'subscribe.html', text: 'Subscribe' }
    ];

    links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.href;
        a.className = 'navbarelements dropdown-content';
        a.textContent = link.text;
        dropdownContent.appendChild(a);
    });

    dropdown.appendChild(dropdownContent);
    navbar.appendChild(dropdown);

    // Append the navbar to the container and add it to the beginning of the page
    navContainer.appendChild(navbar);
    document.body.prepend(navContainer);
    
    /************************************************
     * Footer creation code
     ***********************************************/
    const footer = document.createElement('div');
    footer.className = 'footer';

    // Create the footer search bar
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

    // Add recent posts section
    const recentPostsTitle = document.createElement('h2');
    recentPostsTitle.textContent = 'Recent Posts';
    footer.appendChild(recentPostsTitle);

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
    copyright.innerHTML = '&copy; 2024 Wisconsin Engineer Magazine';
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
/**
 * Sorting and filtering logic for the articles page
 */
document.addEventListener("DOMContentLoaded", function() {

    // select all project boxes and the options of the two dropdowns
    const searchbar = document.querySelector('.search-bar');
    const resetButton = document.querySelector('.reset');
    const articles = document.querySelectorAll('.article');
    const author = document.getElementById('author-select');
    const searchResults = document.querySelector('.results');
    const category = document.getElementById('category-select');
    const type = document.getElementById('article-type-select');
    const timePeriod = document.getElementById('time-period-select');

    let count = 0;
    let total = 0;
    
    resetButton.addEventListener('click', resetFilters);
    resetButton.addEventListener('click', filterArticles);
    
    author.addEventListener('change', filterArticles);
    timePeriod.addEventListener('change', filterArticles);
    category.addEventListener('change', filterArticles);
    type.addEventListener('change', filterArticles);

    loadPages();
    filterArticles();
    if (!isMobile()) {
        window.addEventListener('resize', handleResize);
        handleResize();
    }

    function createArticleFromJSON(articleData) {

        // Create the anchor element
        const a = document.createElement('a');
        a.href = articleData.link;

        // Create a class string that includes all necessary classes
        a.className = `fade-in article ${articleData.season} ${articleData.author.replace(/\s+/g, '')} ${articleData.category.toLowerCase()} ${articleData.type.toLowerCase()}`;
    
        // Create the H3 element for the article type and category
        const h3TypeAndCategory = document.createElement('h3');
        h3TypeAndCategory.className = 'article-type-and-category';
        h3TypeAndCategory.textContent = `${articleData.category} | ${articleData.type}`;
    
        // Create the H2 element for the title
        const h2 = document.createElement('h2');
        h2.className = 'article-title';
        h2.textContent = articleData.title;
    
        // Create the H3 element for the author
        const h3Author = document.createElement('h3');
        h3Author.className = 'author-name';
        h3Author.textContent = 'Written by ' + articleData.author;
    
        // Create the paragraph element for the description
        const p = document.createElement('p');
        p.className = 'description';
        p.textContent = articleData.description;
    
        // Append the elements to the anchor element in the correct order
        a.appendChild(h3TypeAndCategory);
        a.appendChild(h2);
        a.appendChild(h3Author);
        a.appendChild(p);
    
        // Assuming you have a container element in your HTML to append this article to
        const container = document.querySelector('.article-container');
        container.appendChild(a);
    }
    
    function loadPages() {
        const folders = ['sp24']; // This should be dynamically generated

        folders.forEach(folder => {
            fetch(`../article-blurbs/${folder}/blurbs.json`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    data.articles.forEach(article => {
                        console.log(article);
                        createArticleFromJSON(article);
                    });
                })
                .catch(error => console.error(`Error loading the JSON file from ${folder}:`, error));
        });
    }

    function filterArticles() {
        count = 0;
        total = 0;

        // show a given article if all is selected or if any other attribute is
        const selectedTimePeriod = timePeriod.value;
        const selectedAuthor = author.value;
        const selectedCategory = category.value;
        const selectedType = type.value;
        articles.forEach(article => {
            total += 1;
            const time_period_choice = selectedTimePeriod === 'all' || article.classList.contains(selectedTimePeriod);
            const author_choice = selectedAuthor === 'all' || article.classList.contains(selectedAuthor);
            const category_choice = selectedCategory === 'all' || article.classList.contains(selectedCategory);
            const type_choice = selectedType === 'all' || article.classList.contains(selectedType);

            let isVisible = time_period_choice && author_choice && category_choice && type_choice;
            if (article.classList.contains("archived")) {
                isVisible = false;
                total -= 1;
            }
            article.style.display = isVisible ? 'block' : 'none';
            // for fading logic
            count += isVisible ? 1 : 0;
        });

        // reorder within the content body
        const articleContainer = document.querySelector('.article-container');
        articles.forEach(article => {
            articleContainer.appendChild(article);
        });

        searchResults.textContent = `Showing  ${count} out of ${total} results.`;
    }

    function handleResize() {
        const searchBar = document.querySelector('.search-bar');
        const resultsButton = document.querySelector('.results');
        const articleContainer = document.querySelector('.article-container');
        if (searchBar.style.display != 'none') {
            searchBar.style.display = lessThan90() ? 'flex' : 'grid';
            searchBar.style.flexDirection = lessThan90() ? 'column' : 'none';
        }
        // labels and boxes align differently and have different widths
        const labels = searchBar.querySelectorAll('.label');
        labels.forEach(label => {
            label.style.width = '285px';
            label.style.textAlign = lessThan90() ? 'center' : 'left';
            label.style.marginLeft = lessThan90() ? '0px' : '10px';
        });
        const boxes = searchBar.querySelectorAll('.select');
        boxes.forEach(box => {
            box.style.width = '285px';
            box.style.textAlign = lessThan90() ? 'center' : 'left';
            box.style.marginRight = lessThan90() ? '0px' : '10px';
        });
        // width of buttons changes per resolution
        resultsButton.style.width = lessThan90() ? "280px": "400px";
        resultsButton.style.minWidth = '280px';
        resetButton.style.width = lessThan90() ? "280px": "400px";
        resetButton.style.minWidth = '280px';
        articleContainer.display = lessThan90() ? 'flex' : 'grid';
    }

    function resetFilters() {
        const author = document.getElementById('author-select');
        const category = document.getElementById('category-select');
        const type = document.getElementById('article-type-select');
        const timePeriod = document.getElementById('time-period-select');
        author.value = 'all';
        timePeriod.value = 'all';
        type.value = 'all';
        category.value = 'all';
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
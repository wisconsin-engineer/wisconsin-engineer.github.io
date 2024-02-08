/**
 * Sorting and filtering logic for the articles page
 */
document.addEventListener("DOMContentLoaded", function() {

    // select all project boxes and the options of the two dropdowns
    const searchbar = document.querySelector('.search-bar');
    const resetButton = document.querySelector('.reset-button');
    const articles = document.querySelectorAll('.article');
    const author = document.getElementById('author-select');
    const searchResults = document.querySelector('.results');
    const category = document.getElementById('category-select');
    const type = document.getElementById('article-type-select');
    const timePeriod = document.getElementById('time-period-select');

    let option = "hide";
    let count = 0;
    let total = 0;
    
    
    searchResults.addEventListener('click', changeButton);
    resetButton.addEventListener('click', resetFilters);
    resetButton.addEventListener('click', filterArticles);
    
    author.addEventListener('change', filterArticles);
    timePeriod.addEventListener('change', filterArticles);
    category.addEventListener('change', filterArticles);
    type.addEventListener('change', filterArticles);

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
        const contentBody = document.querySelector('.content-body');
        articles.forEach(article => {
            contentBody.appendChild(article);
        });

        searchResults.textContent = `Showing  ${count} out of ${total} results. (Press to ${option} advanced search)`;

    }

    filterArticles();

    function changeButton() {
        option = (option === "hide") ? "show": "hide";
        const searchBarContainer = document.querySelector('.search-bar-container');
        const resetButton = document.querySelector('.reset-button');
        if (option === "hide") {
            if (!isMobile()) {
                searchbar.style.display = lessThan90() ? 'flex' : 'grid';
                searchbar.style.flexDirection = lessThan90() ? 'column' : 'none';
                searchBarContainer.style.backgroundColor = '#bbb';
                searchBarContainer.style.border = '1px solid #000000';
                searchBarContainer.style.marginBottom = '20px';
                searchBarContainer.querySelector('.search-label').textContent = 'Advanced Search';
                resetButton.style.display = 'block';
            } else {
                searchbar.style.display = 'flex';
                searchbar.style.flexDirection = 'column';
                searchBarContainer.style.backgroundColor = '#bbb';
                searchBarContainer.style.border = '1px solid #000000';
                searchBarContainer.style.marginBottom = '20px';
                searchBarContainer.querySelector('.search-label').textContent = 'Advanced Search';
                resetButton.style.display = 'block';
            }
        } else {
            searchbar.style.display = 'none';
            resetButton.style.display = 'none';
            searchBarContainer.style.border = 'none';
            searchBarContainer.style.backgroundColor = '#DDD0C8';
            searchBarContainer.style.marginBottom = '0';
            searchBarContainer.querySelector('.search-label').textContent = '';
        }
        searchResults.textContent = `Showing  ${count} out of ${total} results. (Press to ${option} advanced search)`;
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
document.addEventListener("DOMContentLoaded", function() {

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
        const container = document.querySelector('.articles-container');
        container.appendChild(a);
    }
    
    function loadPages() {
        fetch('../article-blurbs/sp24/blurbs.json')
            .then(response => response.json())
            .then(data => {
                // Directly iterate over the fetched array of articles.
                data.forEach(article => {
                    createArticleFromJSON(article);
                });
            })
            .catch(error => console.error('Error loading the JSON file:', error));
    }
    

    loadPages();
    
    
});
// --- Offer Bar Logic ---
var offerBar = document.querySelector(".offer-bar");

document.getElementById("offer-close").addEventListener("click", function() {
    offerBar.style.display = "none";
});

// --- Side Navbar Logic ---
var sideNavActivate = document.getElementById("side-navbar-activate");
var sideNavbar = document.querySelector(".side-navbar");
var sideNavClose = document.getElementById("side-navbar-close");

sideNavActivate.addEventListener("click", function() {
    sideNavbar.style.marginLeft = "0";
});

sideNavClose.addEventListener("click", function() {
    sideNavbar.style.marginLeft = "-60%";
});

// --- Filtering and Search Logic ---

var productList = document.querySelectorAll(".product");

// Grouped selection of checkboxes based on categories
var occasionCheckboxes = document.querySelectorAll('input[name="tags"][value="summer"], input[name="tags"][value="party"], input[name="tags"][value="beach"], input[name="tags"][value="casuals"], input[name="tags"][value="formals"]');
var colorCheckboxes = document.querySelectorAll('input[name="tags"][value="red"], input[name="tags"][value="blue"], input[name="tags"][value="white"], input[name="tags"][value="green"], input[name="tags"][value="brown"]');
var arrivalCheckboxes = document.querySelectorAll('input[name="tags"][value="new"], input[name="tags"][value="old"]');

// 1. Checkbox Filtering Function (REWRITTEN FOR GROUP LOGIC)
function applyFilters() {
    // Collect active filters for each group
    const activeOccasions = Array.from(occasionCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
    const activeColors = Array.from(colorCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
    const activeArrivals = Array.from(arrivalCheckboxes).filter(cb => cb.checked).map(cb => cb.value);


    productList.forEach(product => {
        var productTagsString = product.getAttribute("data-tags");
        
        var productTagsArray = productTagsString.split(',').map(tag => tag.trim()); 

        let showProduct = true;

       
        if (activeOccasions.length > 0) {
           
            const matchOccasion = activeOccasions.some(filter => productTagsArray.includes(filter));
            if (!matchOccasion) {
                showProduct = false;
            }
        }

       
        if (showProduct && activeColors.length > 0) {
            
            const matchColor = activeColors.some(filter => productTagsArray.includes(filter));
            if (!matchColor) {
                showProduct = false;
            }
        }

       
        if (showProduct && activeArrivals.length > 0) {
            
            const matchArrival = activeArrivals.some(filter => productTagsArray.includes(filter));
            if (!matchArrival) {
                showProduct = false;
            }
        }
        
       
        if (showProduct) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
    
   
    applySearch();
}


function applySearch() {
    var searchTerm = document.getElementById("search-input").value.toLowerCase();
    
    productList.forEach(product => {
        var productTitle = product.querySelector("h1").textContent.toLowerCase();
        
        
        if (product.style.display === 'block') {
            if (!productTitle.includes(searchTerm)) {
                product.style.display = 'none';
            } 
        }
       
        
    });
}




const allCheckboxes = [...occasionCheckboxes, ...colorCheckboxes, ...arrivalCheckboxes];


allCheckboxes.forEach(tag => {
    tag.addEventListener("change", applyFilters);
});


document.getElementById("search-input").addEventListener("keyup", applyFilters); // Use applyFilters to check search AND filters


document.querySelector(".navbar-search").addEventListener("submit", function(e) {
    e.preventDefault();
});


applyFilters();

// Get the search input element
const searchInput = document.getElementById('search-input');

// Get all product elements
const productContainers = document.querySelectorAll('.product');

// Get the form to prevent default submission (optional, but good practice)
const searchForm = document.querySelector('.navbar-search');

// Prevent the form from submitting and refreshing the page
if (searchForm) {
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        // The search logic is already handled by the 'keyup' event,
        // but this stops the browser from acting on the form submission.
    });
}

/**
 * Filters the product list based on the user's search query.
 */
function applySearchFilter() {
    // Get the current search query and convert it to lowercase for case-insensitive matching
    const searchTerm = searchInput.value.toLowerCase().trim();

    // Loop through each product container
    productContainers.forEach(product => {
        // 1. Get the product title (text content of the <h2>)
        const titleElement = product.querySelector('h2');
        const productTitle = titleElement ? titleElement.textContent.toLowerCase() : '';

        // 2. Get the data-tags attribute value
        const productTags = product.getAttribute('data-tags');
        const productTagsLower = productTags ? productTags.toLowerCase() : '';

        // Determine if the product should be visible
        // It's visible if the search term is empty OR 
        // if the search term is found in the title OR
        // if the search term is found in the tags.
        let isVisible = false;

        if (searchTerm === '') {
            // If the search box is empty, show all products
            isVisible = true;
        } else if (
            productTitle.includes(searchTerm) ||
            productTagsLower.includes(searchTerm)
        ) {
            // If the search term matches the title or tags, show the product
            isVisible = true;
        }

        // Apply the display style
        if (isVisible) {
            product.style.display = ''; // Show the product (reverts to its default display)
        } else {
            product.style.display = 'none'; // Hide the product
        }
    });
}

// Attach the filtering function to the 'keyup' event of the search input.
// This executes the search every time the user types a character.
if (searchInput) {
    searchInput.addEventListener('keyup', applySearchFilter);
}

// --- Optional: Add the same logic to the checkbox filters ---
// This ensures that the text search works in combination with the checkboxes if you implement that logic.

const filterCheckboxes = document.querySelectorAll('.filter-section input[type="checkbox"]');

function applyAllFilters() {
    // A simplified version that just runs the text search.
    // In a complete solution, this function would also handle the complex
    // logic of checkbox filtering AND text search together.
    applySearchFilter();
    
    // NOTE: If you need checkbox filtering, you'd add that complex logic here, 
    // ensuring the text search criteria is combined with the checkbox criteria.
}

// Add an event listener to the checkboxes to trigger the filter when checked/unchecked
filterCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', applyAllFilters);
});

// The basic JavaScript logic for the offer bar and side-navbar from your HTML:

// Offer Bar Close
document.getElementById('offer-close').addEventListener('click', function() {
    document.querySelector('.offer-bar').style.display = 'none';
});

// Side Navbar Toggle
const sideNav = document.querySelector('.side-navbar');

document.getElementById('side-navbar-activate').addEventListener('click', function() {
    sideNav.style.left = '0';
});

document.getElementById('side-navbar-close').addEventListener('click', function() {
    sideNav.style.left = '-60%'; // Assuming -60% is your hidden state in CSS
});
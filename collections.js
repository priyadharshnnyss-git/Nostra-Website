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

    // Loop through all products and show/hide based on group logic
    productList.forEach(product => {
        var productTagsString = product.getAttribute("data-tags");
        // Convert the comma-separated string to an array of individual tags
        var productTagsArray = productTagsString.split(',').map(tag => tag.trim()); 

        let showProduct = true;

        // Rule 1: Occasion Filter Group
        if (activeOccasions.length > 0) {
            // Must match AT LEAST ONE selected occasion tag
            const matchOccasion = activeOccasions.some(filter => productTagsArray.includes(filter));
            if (!matchOccasion) {
                showProduct = false;
            }
        }

        // Rule 2: Color Filter Group (Only apply if Rule 1 is still true)
        if (showProduct && activeColors.length > 0) {
            // Must match AT LEAST ONE selected color tag
            const matchColor = activeColors.some(filter => productTagsArray.includes(filter));
            if (!matchColor) {
                showProduct = false;
            }
        }

        // Rule 3: Arrival Filter Group (Only apply if Rules 1 & 2 are still true)
        if (showProduct && activeArrivals.length > 0) {
            // Must match AT LEAST ONE selected arrival tag
            const matchArrival = activeArrivals.some(filter => productTagsArray.includes(filter));
            if (!matchArrival) {
                showProduct = false;
            }
        }
        
        // Apply display style
        if (showProduct) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
    
    // Always re-apply search after filters
    applySearch();
}

// 2. Search Function
function applySearch() {
    var searchTerm = document.getElementById("search-input").value.toLowerCase();
    
    productList.forEach(product => {
        var productTitle = product.querySelector("h1").textContent.toLowerCase();
        
        // If the product was hidden by filters (not 'block'), respect that.
        // We only override to 'none' if it doesn't match the search term.
        if (product.style.display === 'block') {
            if (!productTitle.includes(searchTerm)) {
                product.style.display = 'none';
            } 
        }
        // If a product was hidden by checkbox filters, and the search term is empty, we need to show it again
        // IF the filters allow it. The current logic in applyFilters handles the "show" part.
    });
}

// 3. Attach Event Listeners

// Combine all checkboxes into one list for event listening
const allCheckboxes = [...occasionCheckboxes, ...colorCheckboxes, ...arrivalCheckboxes];

// Attach the applyFilters function to every checkbox change
allCheckboxes.forEach(tag => {
    tag.addEventListener("change", applyFilters);
});

// Search input listener (live search)
document.getElementById("search-input").addEventListener("keyup", applyFilters); // Use applyFilters to check search AND filters

// Prevent search form submission
document.querySelector(".navbar-search").addEventListener("submit", function(e) {
    e.preventDefault();
});

// Initial display setup (ensure all are visible on load)
applyFilters();
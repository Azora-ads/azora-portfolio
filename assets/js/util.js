const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', performSearch);
const cl = document.getElementById('chip-layout');


// Add focus and blur event listeners to the input element



function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim().toLowerCase();

    const list = document.getElementById('list-container');
    const items = list.querySelectorAll('.col-x1-12.col-sm-6.col-md-4.sk__feature-col');

    items.forEach((item) => {
        const title = item.querySelector('.header').textContent.toLowerCase();
        const description = item.querySelector('.descs').textContent.toLowerCase();
        const id = item.querySelector('.btn-txt').textContent.toLowerCase();

        const shouldDisplay =
            title.includes(searchTerm) || description.includes(searchTerm) || id.includes(searchTerm);

        item.style.display = shouldDisplay ? 'block' : 'none';
    });
}
function chipClick(text) {
    searchInput.value = text;
    performSearch();
    handleBlur();
    searchInput.blur();
    window.location.href = 'http://www.google.com'
}
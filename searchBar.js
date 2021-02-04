export const searchBar = document.createElement('div')
    searchBar.innerHTML = `
    <div class="input-group">
      <input type="search" id="search-input" class="form-control rounded" placeholder="Search" aria-label="Search"
        aria-describedby="search-addon" />
      <button type="button" class="btn btn-danger rounded-pill ml-2 d-none d-md-flex" id="search-button">search</button>
    </div>
    `;
    document.getElementById("app").append(searchBar);

export const searchButton = document.getElementById('search-button');
export const searchInput = document.getElementById('search-input');

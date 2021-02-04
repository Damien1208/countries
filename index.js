import { searchBar, searchButton, searchInput } from "./searchBar.js";

$(function () {
    const url = "https://restcountries.eu/rest/v2/all";
    let countriesList = [];
    let search = "";

    fetch(url)
        .then((response) => response.json())
        .then((countries) => countries.forEach(country => countriesList.push({ code: `${country.alpha3Code}`, name: `${country.name}` })))
        .then(() => getList());

    searchBar;
    searchInput.addEventListener('keyup', () => {
        search = searchInput.value;
        getList()
    });
    searchButton.addEventListener('click', () => {
        search = searchInput.value;
        getList()
    });



    function getList() {
        if (!!countriesList) {
            document.getElementById('countries').innerHTML = [];
            if (search.length) {
                const url = `https://restcountries.eu/rest/v2/name/${search}`;
                const list = [];

                fetch(url)
                .then(response => response.json())
                .then(countries => countries.forEach(country => list.push({ code: `${country.alpha3Code}`, name: `${country.name}` })))
                .then(() => createList(list));
            } else {
                createList(countriesList);
            }
        }

    }


    function createList(array) {
        const listCountries = document.getElementById('countries')

        array.forEach(function (item) {
            var a = $('<a>').html(` 
            <div class="card text-left pl-4 py-2" style="width: auto; margin: 0.5rem;">
                <p class="card-title">${item.code}</p>
                <h4 class="card-text">${item.name}</h4>
            </div>
            `)
            let list = $('<li>');
            list.html(a);

            listCountries.append(list[0]);
            a.data('item', item);
            a.on('click', clickTag)
        })

        $(".list-group li .card").click(function (e) {
            $(".list-group li .card").removeClass('bg')
            $(this).addClass('bg')
        });
    }

    var clickTag = function (e) {
        const link = $(e.currentTarget);
        const tag = link.data('item');
        const url = `https://restcountries.eu/rest/v2/name/${tag.name}`;

        $(".country").detach();
        fetch(url).then(response => response.json()).then(country => countryCard(country[0]));
    }


    function countryCard(country) {

        const countryDetail = document.createElement('div')
        countryDetail.className = 'country'
        countryDetail.innerHTML = `
            <h5 class="text-center card-title">${country.name}</h5>
            <img src="${country.flag}"   class="card-img-top" />
            <div class="mt-4">
            <p>Nom natif : ${country.nativeName}</p>
            <p>Capitale : ${country.capital}</p>
            <p>Population : ${country.population} habitants</p>
            <p class="mb-0">Langue(s) officielle(s) :</p>
        `

        breakArray(country.languages, 'name');
        bringLabel("Monnaie(s) officielle(s) :");
        breakArray(country.currencies, 'name');
        bringLabel("Timezones: ");
        breakArray(country.timezones, '');
        bringLabel("Pays voisins: ");

        country.borders.forEach(code => {
            const url = `https://restcountries.eu/rest/v2/alpha/${code}`
            fetch(url).then(response => response.json()).then(country => country.name).then(name => {
                var liElement = document.createElement('span');
                liElement.innerHTML = `${name}, `
                return countryDetail.appendChild(liElement);
            })
        })

        function breakArray(arr, key) {
            arr.forEach(el => {
                var liElement = document.createElement('span');
                liElement.innerHTML = `${key ? el[key] : el}, `
                return countryDetail.appendChild(liElement);
            })
        }

        function bringLabel(label) {
            let temp = document.createElement('div')
            temp.innerHTML = `${label}`
            temp.classList.add('mt-2')
            return countryDetail.append(temp)
        }

        $("#detail").addClass("card border border-secondary p-5").append(countryDetail);
    }
})

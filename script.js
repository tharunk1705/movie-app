
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=fc57b0b8de629bba3c795f94e6dee386&page=1`;

const IMG_PATH = `https://image.tmdb.org/t/p/w1280`;

const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=fc57b0b8de629bba3c795f94e6dee386&query="`;



const getMovies = async (url) => {
    const res = await fetch(url);

    const data = await res.json();

    showMovies(data.results);
    console.log(data.results);
}

const showMovies = (movies) => {
    main.innerHTML = '';

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview, release_date} = movie;

        const movieEl = document.createElement('div');

        movieEl.classList.add('movie');

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path} " alt="${title}">
            <div class="movie-info">
                <h3>${title}<span class="year">(${release_date.slice(0,4)})</span></h3>
                <span class="${getClassByRate(vote_average)}"><i class="fas fa-star"></i> ${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;

        main.appendChild(movieEl);
    });
}

const getClassByRate = (vote) => {
    if(vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    }else{
        return "red";
    }
}

getMovies(API_URL);

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTearm = search.value;

    if(searchTearm && searchTearm !== '') {
        getMovies(SEARCH_API + searchTearm);

        search.value = '';
    } else {
        window.location.reload();
    }
})
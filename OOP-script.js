let movieCollection = {
    tmdbPopularAPI: 'https://api.themoviedb.org/3/movie/popular?api_key=d85fc3f866e5fc77be2f384a028b16d3&append_to_response=images',
    mainHOMEGridContainer: document.querySelector('.main-Home-grid-container'),
    movieListOOP: [],

    //Object with search methods to display movies in the home page
    search: {
        searchInput: document.querySelector('.searchForm'),
        formContainer: document.querySelector('.formContainer'),
        mainHOMEGridContainer: document.querySelector('.main-Home-grid-container'),
        

        //Search Movies by click
        searchClick(){
            const searchBtn = document.querySelector('.search-button')

            searchBtn.addEventListener('click', () => {

                    inputValue = this.searchInput.value

                    this.mainHOMEGridContainer.innerHTML = '';

                    movieCollection.fetchMovieData(inputValue)
                })  
        },

        //Search Movies by submit
        searchSubmit(){
            this.formContainer.addEventListener('submit', (e) => {
                e.preventDefault()
            
                this.mainHOMEGridContainer.innerHTML = '';

                let inputValue = this.searchInput.value

                movieCollection.fetchMovieData(inputValue)   
                
            })
        }
    },

    fetchMovieData(inputValue){
            fetch(`https://api.themoviedb.org/3/search/movie?query=${inputValue}&api_key=d85fc3f866e5fc77be2f384a028b16d3`)
                    .then(resp => resp.json())
                    .then(data => {
                    const moviesClick = data.results;

                    movieCollection.displayMovieHomePage(moviesClick)
                        
                    this.search.searchInput.value = '';

                })
        },

    
    fetchPopularMovies(){
        fetch(movieCollection.tmdbPopularAPI)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            const movieArray = data.results
            movieCollection.displayMovieHomePage(movieArray)
        })
    },


    //Fetch and display movies in the home page
    displayMovieHomePage(movieArray, moviesClick, moviesSubmit){
        

        (movieArray || moviesClick || moviesSubmit).forEach(element => {

            let elementPoster = element.poster_path;
            let elementTitle = element.title;

            const movieGridContainer = document.createElement('div')
            movieGridContainer.classList.add('movie-grid-container') 

            let movieYear = new Date(element.release_date) 
            const movieYearConverted = movieYear.getFullYear()

            movieGridContainer.innerHTML = `
                    ${this.addMovieToLIst(elementTitle, elementPoster)}
                    <div class="info-container">
                        <p class="movie-title">${element.title}</p>
                        <p class="movie-year">${movieYearConverted}</p>
                    </div>`

            this.mainHOMEGridContainer.appendChild(movieGridContainer) 
        });
    },

    addMovieToLIst(titleParam, posterParam){

        return `<div class="img-container" onclick="if(JSON.parse(localStorage.getItem('movieListOOP')).includes('${titleParam}')){
                console.log('${titleParam} is already added to the list')
                }else {
                movieCollection.movieListOOP.push('${titleParam}');
                localStorage.setItem('movieListOOP', JSON.stringify(movieCollection.movieListOOP));
                
                console.log('${titleParam} added to the list')}">

                <div class="littleIconContainer">
                    <div class="littleIconMenu">
                        <div class="dropdownMenuContainer">
                        </div>
                    </div>
                </div>
                

                <img class="imgPoster" src="https://image.tmdb.org/t/p/w500${posterParam}" alt="" />
                </div>`
    }
}


//Call fetch method and display movie data in the home page
movieCollection.fetchPopularMovies()

movieCollection.search.searchClick()
movieCollection.search.searchSubmit()


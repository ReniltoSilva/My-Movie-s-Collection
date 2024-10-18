let movieCollection = {
    tmdbPopularAPI: 'https://api.themoviedb.org/3/movie/popular?api_key=d85fc3f866e5fc77be2f384a028b16d3&append_to_response=images',
    mainHOMEGridContainer: document.querySelector('.main-Home-grid-container'),
    

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

            const movieGridContainer = document.createElement('div')
            movieGridContainer.classList.add('movie-grid-container') 

            let movieYear = new Date(element.release_date) 
            const movieYearConverted = movieYear.getFullYear()


            movieGridContainer.innerHTML = `
                    <div class="img-container">
                        <img class="imgPoster" src="https://image.tmdb.org/t/p/w500${element.poster_path}" alt="" />
                    </div>
                    <div class="info-container">
                        <p class="movie-title">${element.title}</p>
                        <p class="movie-year">${movieYearConverted}</p>
                    </div>`

            this.mainHOMEGridContainer.appendChild(movieGridContainer) 
        });
    }
}


//Call fetch method and display movie data in the home page
movieCollection.fetchPopularMovies()

movieCollection.search.searchClick()
movieCollection.search.searchSubmit()



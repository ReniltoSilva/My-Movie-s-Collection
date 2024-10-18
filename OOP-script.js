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

                fetch(`https://api.themoviedb.org/3/search/movie?query=${inputValue}&api_key=d85fc3f866e5fc77be2f384a028b16d3`)
                    .then(resp => resp.json())
                    .then(data => {
                    const movies = data.results;
                    
                        movies.forEach(movie => {

                            let movieGridContainer = document.createElement('div')
                            movieGridContainer.classList.add('movie-grid-container') 
                
                            let movieYear = new Date(movie.release_date) 
                            const movieYearConverted = movieYear.getFullYear()
                
                
                            movieGridContainer.innerHTML = `
                                    <div class="img-container">
                                        <img class="imgPoster" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="" />
                                    </div>
                                    <div class="info-container">
                                        <p class="movie-title">${movie.title}</p>
                                        <p class="movie-year">${movieYearConverted}</p>
                                    </div>`
                
                            this.mainHOMEGridContainer.appendChild(movieGridContainer) 

                            console.log(movie.title)
                        });
                    })
            })
        
            this.searchInput.value = '';
        },


    //Search Movies by submit
    searchSubmit(){
            this.formContainer.addEventListener('submit', (e) => {
                e.preventDefault()
            
                let inputValue = this.searchInput.value

                fetch(`https://api.themoviedb.org/3/search/movie?query=${inputValue}&api_key=d85fc3f866e5fc77be2f384a028b16d3`)
                .then(resp => resp.json())
                .then(data => {
                    console.log(data.results)
                })



                console.log(inputValue)
            
                this.searchInput.value = '';
            })
        }
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
    displayMovieHomePage(movieArray){

        movieArray.forEach(element => {

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
movieCollection.fetchMovies.fetchPopularMovies()

movieCollection.search.searchClick()
movieCollection.search.searchSubmit()



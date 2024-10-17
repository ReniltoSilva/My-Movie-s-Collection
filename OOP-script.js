const movieCollection = {
    tmdbAPI: 'https://api.themoviedb.org/3/movie/popular?api_key=d85fc3f866e5fc77be2f384a028b16d3&append_to_response=images',
    

    //Object with search methods to display movies in the home page
    search: {
        searchInput: document.querySelector('.searchForm'),
        formContainer: document.querySelector('.formContainer'),
        searchBtn: document.querySelector('.search-button'),

        //Search Movies by click
        searchClick(){
            this.searchBtn.addEventListener('click', () => {
                inputValue = this.searchInput.value
                console.log(inputValue)
            
                this.searchInput.value = '';
            })
        },

        //Search Movies by submit
        searchSubmit(){
            this.formContainer.addEventListener('submit', (e) => {
                e.preventDefault()
            
                let inputValue = this.searchInput.value
                console.log(inputValue)
            
                this.searchInput.value = '';
            })
        }
    },

    fetchMovies: {
        fetchPopularMovies(){
                fetch(){
                    fetch(this.tmdbAPI)
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data)
                        const movieArray = data.results
                        this.displayMovieHomePage(movieArray)
                    })
                }
        },

        fetchMoviesSearch(){

        }
    },


    


    //Fetch and display movies in the home page
    displayMovieHomePage(movieArray){
        
        const mainHOMEGridContainer = document.querySelector('.main-Home-grid-container')

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

            mainHOMEGridContainer.appendChild(movieGridContainer) 
        });
    }
}


//Call fetch method and display movie data in the home page
movieCollection.fetch()

movieCollection.search.searchClick()
movieCollection.search.searchSubmit()







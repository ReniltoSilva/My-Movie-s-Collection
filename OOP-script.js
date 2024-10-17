const movieCollection = {
    tmdbAPI: 'https://api.themoviedb.org/3/movie/popular?api_key=d85fc3f866e5fc77be2f384a028b16d3&append_to_response=images',
    tmdbAPIImage: '',


    //Fetch movie data from tmdb
    fetch(){
        fetch(this.tmdbAPI)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            const movieArray = data.results
            this.displayMovieHomePage(movieArray)
        })
    },


    //Fetch and display movies int he home page
    displayMovieHomePage(movieArray){
        
        const mainHOMEGridContainer = document.querySelector('.main-Home-grid-container')

        movieArray.forEach(element => {

            
            const movieGridContainer = document.createElement('div')
            movieGridContainer.classList.add('movie-grid-container') 

            let movieYear = new Date(element.release_date) 
            const movieYearConverted = movieYear.getFullYear()


            movieGridContainer.innerHTML = `
                    <div class="img-container">
                        <img class="imgPoster" src="https://image.tmdb.org/t/p/w500/${element.poster_path}" alt="" />
                    </div>
                    <div class="info-container">
                        <p class="movie-title">${element.title}</p>
                        <p class="movie-year">${movieYearConverted}</p>
                    </div>`

            mainHOMEGridContainer.appendChild(movieGridContainer) 

        });
    }
}


movieCollection.fetch()

const gitAPI = 'https://api.github.com/users/ReniltoSilva'
const imgProfileContainer = document.querySelector('.imgContainer')
          


document.addEventListener('DOMContentLoaded', fetchInfo)

function fetchInfo(){ 

    fetch(gitAPI)
        .then(resp => resp.json())
        .then(data => {

            const profilePic = data.avatar_url
            console.log(data.name)
            console.log(data.twitter_username)
            console.log(data.avatar_url)
            console.log(data)

            const imgProfile = document.querySelector('.imgProfile')
                imgProfile.src = profilePic

        })

}




class API {
    static init () {
      this.baseUrl = 'http://localhost:3001'
      this.signinUrl = this.baseUrl + '/signin'
      this.validateUrl = this.baseUrl + '/validate'
      this.myVideosUrl = this.baseUrl + '/my_videos'
    }
  
    static login (email, password) {
      return fetch('http://localhost:3001/signin', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email,
          password
        })
      }).then(resp => resp.json())
    }
  
    static validate () {
      const token = localStorage.getItem('token')
      return fetch(this.validateUrl, {
        headers: {'Authorization': token}
      }).then(resp => resp.json())
    }
  
    static getUserVideos () {
      return fetch('http://localhost:3001/user_videos', {
        headers: { 'Authorization': localStorage.token }
      }).then(resp => resp.json())
    }

    static createNewUser (newUser) {
        return fetch('http://localhost:3001/users', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(newUser)
        }).then(resp => resp.json())
    }

    static getAllVideos () {
        return fetch('http://localhost:3001/videos', {
        }).then(resp => resp.json())
    }
  }
  
  API.init()
  
  window.API = API
  
  export default API
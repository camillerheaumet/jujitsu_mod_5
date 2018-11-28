class API {
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
      return fetch('http://localhost:3001/validate', {
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
          body: JSON.stringify({user: newUser})
        }).then(resp => resp.json())
    }

    static getAllVideos () {
        return fetch('http://localhost:3001/videos', {
        }).then(resp => resp.json())
    }

    static createPurchase (newPur) {
        return fetch('http://localhost:3001/purchases', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(newPur)
        }).then(resp => resp.json())
    }
  }
  
  window.API = API
  
  export default API
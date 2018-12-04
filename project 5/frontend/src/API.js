class API {
  static init() {
    this.baseURL = 'http://localhost:3001';
    this.usersURL = `${this.baseURL}/users`;
    this.videosURL = `${this.baseURL}/videos`
  }

  static login (email, password) {
    return fetch(`${this.baseURL}/signin`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email,
        password
      })
    }).then(resp => resp.json())
  }

  static validate () {
    return fetch(`${this.baseURL}/validate`, {
      headers: {'Authorization': localStorage.token}
    }).then(resp => resp.json())
  }

  static getUserVideos () {
    return fetch(`${this.baseURL}/user_videos`, {
      headers: { 'Authorization': localStorage.token }
    }).then(resp => resp.json())
  }

  static createNewUser (newUser) {
      return fetch(`${this.usersURL}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: newUser})
      }).then(resp => resp.json())
  }

  static updateUser (id, modifUser) {
    return fetch(`${this.usersURL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.token
      },
      body: JSON.stringify({user: modifUser})
    }).then(resp => resp.json())
  }

  // je sais pas si je veux que ca soit possible
  // static deleteUser (id) {
  //   return fetch(`${this.usersURL}/${id}`, {
  //     method: 'DELETE'})
  // }

  static getAllVideos () {
      return fetch(`${this.videosURL}`, {
      }).then(resp => resp.json())
  }

  static createPurchase (newPur) {
      return fetch(`${this.baseURL}/purchases`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newPur)
      }).then(resp => resp.json())
  }

  static createNewVideo (newVideo) {
    return fetch(`${this.videosURL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.token},
      body: JSON.stringify(({video: newVideo}))
    }).then(resp => resp.json())
  }

  static updateVideo (id, modifVideo) {
    return fetch(`${this.videosURL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.token},
      body: JSON.stringify({video: modifVideo})
    }).then(resp => resp.json())
  }

  static deleteVideo (id) {
    return fetch(`${this.videosURL}/${id}`, {
      method: 'DELETE'})
  }
}

API.init()

window.API = API

export default API
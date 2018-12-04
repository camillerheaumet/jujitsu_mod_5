import React from 'react';
import { Route, withRouter } from 'react-router-dom'
import API from './API'
import Navbar from './containers/Navbar'
import AuthorisationContainer from './containers/AuthorisationContainer'
import MyVideosContainer from './containers/MyVideosContainer'
import MyAccountContainer from './containers/MyAccountContainer'
import VideosContainer from './containers/VideosContainer'
import Basket from './components/Basket'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import './App.css'

class App extends React.Component {

  state = {
    currentUser: {
      id: null,
      name: null,
      email: null,
      admin: null
    },
    currentPurchase: [],
    currentUserVideos: [],
    allVideos: []
  }

  signin = (user) => {
    localStorage.setItem('token', user.token)
    this.setState({ currentUser: {
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin}},() =>{
        this.getUserVideo()
        this.props.history.push('/home')
      })
  }

  signout = () => {
    localStorage.removeItem('token')
    this.setState({ currentUser: {
      id: null,
      name: null,
     email: null,
     admin: null },
     currentPurchase: [],
     currentUserVideos: [],
     })
    this.props.history.push('/signin')
  }

  componentDidMount() {
    this.getAllVideo()
    if (!localStorage.getItem('token') === null) {
    console.log("hello word")} else {
    API.validate()
      .then(user => {
        this.signin(user);
        
      })
      .catch(errors => {
        this.alertFunc(errors);
         this.props.history.push('/signin')
    })}
  }

  filteredPurchase = (purchasedVideos, basket) => {
    let filteredVideos = []
    for (let x of basket) {
      if (purchasedVideos.filter(y => y.id === x.id).length > 0){
      }
      else {
        filteredVideos.push(x)
      }
    }
    this.setState({currentPurchase: filteredVideos})
  }

  addToPurchase = (newVideo) => {
    if (this.state.currentPurchase.includes(newVideo) && !this.currentUserVideos.includes(newVideo)){
    }else {
      this.setState({currentPurchase: [...this.state.currentPurchase, newVideo]})
    }
  }

  removefromPurchase = (video) => {
    this.setState({
      currentPurchase: this.state.currentPurchase.filter(purchase => purchase !== video)
    })
  }

  handleDeleteAllButton = () => {
    this.setState({currentPurchase: []})
  }

  getUserVideo() {
    API.getUserVideos()
      .then(data => {
        if (data.length > 0) {
          this.setState({ currentUserVideos: data }, () => this.filteredPurchase(data, this.state.currentPurchase))
        } else if (data.errors) {
          this.alertFunc('You are not signed in')}
      })
  }

  alertFunc = (string) => {
    confirmAlert({
      title: 'Alert',
      message: string,
      buttons: [{label: 'OK'}]
    })
  }

  getAllVideo() {
    API.getAllVideos()
      .then(data => {
        if (data.errors) {
          alert('You are not signed in')
        } else {
          this.setState({ allVideos: data })
        }
    })
  }

  render() {
    const { currentUser, currentPurchase, currentUserVideos, allVideos } = this.state
    const { signin, signout, addToPurchase, removefromPurchase, handleDeleteAllButton, alertFunc } = this
    return (
      <div className="App">
        <Route path='/' render={() => <Navbar currentUser={currentUser} currentPurchase={currentPurchase} signout={signout} /> } />
        <Route exact path='/my_videos' render={props => <MyVideosContainer {...props} currentUser={currentUser} currentUserVideos={currentUserVideos} allVideos={allVideos}/>} />
        <Route exact path='/my_account' render={props => <MyAccountContainer {...props} currentUser={currentUser} alertFunc={alertFunc}/>} />
        <Route exact path='/signin' render={props => <AuthorisationContainer {...props} signin={signin} alertFunc={alertFunc} />} />
        <Route exact path='/home' render={props => <VideosContainer {...props} currentUser={currentUser} currentPurchase={currentPurchase} allVideos={allVideos} 
          addToPurchase={addToPurchase} removefromPurchase={removefromPurchase} currentUserVideos={currentUserVideos}/>} />
        <Route exact path='/basket' render={props => <Basket {...props} currentUser={currentUser} currentUserVideos={currentUserVideos} 
          currentPurchase={currentPurchase} removefromPurchase={removefromPurchase} handleDeleteAllButton={handleDeleteAllButton}/>} />
      </div>
    )
  }
}

export default withRouter(App)

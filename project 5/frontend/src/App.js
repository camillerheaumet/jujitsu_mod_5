import React from 'react';
import { Route, withRouter } from 'react-router-dom'
import API from './API'
import Navbar from './containers/Navbar'
import AuthorisationContainer from './containers/AuthorisationContainer'
import MyVideosContainer from './containers/MyVideosContainer'
import VideosContainer from './containers/VideosContainer'
import Basket from './components/Basket'
import './App.css';

class App extends React.Component {

  state = {
    currentUser: {
      id: null,
      name: null,
      email: null
    },
    currentPurchase: [],
    currentUserVideos: []
  }

  signin = (user) => {
    localStorage.setItem('token', user.token)
    this.setState({ currentUser: {
      id: user.id,
      name: user.name,
      email: user.email}},() =>{
        this.getUserVideo()
        this.props.history.push('/home')
      })
  }

  signout = () => {
    localStorage.removeItem('token')
    this.setState({ currentUser: {
      id: null,
      name: null,
     email: null },
     currentPurchase: [],
     currentUserVideos: []})
    this.props.history.push('/signin')
  }

  componentDidMount() {
    if (!localStorage.getItem('token')) return
    API.validate()
      .then(user => {
        this.signin(user);
        
      })
      .catch(error => this.props.history.push('/signin'))
  }

  addToPurchase = (newVideo) => {
    if (this.state.currentPurchase.includes(newVideo)){
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
        if (data.error) {
          alert('You are not signed in')
        } else {
          this.setState({ currentUserVideos: data })
        }
      })
  }

  render() {
    const { currentUser, currentPurchase, currentUserVideos } = this.state
    const { signin, signout, addToPurchase, removefromPurchase, handleDeleteAllButton } = this
    return (
      <div className="App">
        <Route path='/' render={() => <Navbar currentUser={currentUser} currentPurchase={currentPurchase} signout={signout} /> } />
        <Route exact path='/my_videos' render={props => <MyVideosContainer {...props} currentUser={currentUser} currentUserVideos={currentUserVideos}/>} />
        <Route path='/signin' render={props => <AuthorisationContainer {...props} signin={signin} />} />
        <Route exact path='/home' render={props => <VideosContainer {...props} currentUser={currentUser} currentPurchase={currentPurchase} 
          addToPurchase={addToPurchase} removefromPurchase={removefromPurchase} currentUserVideos={currentUserVideos}/>} />
        <Route exact path='/basket' render={props => <Basket {...props} currentUser={currentUser} 
          currentPurchase={currentPurchase} removefromPurchase={removefromPurchase} handleDeleteAllButton={handleDeleteAllButton}/>} />
      </div>
    )
  }
}

export default withRouter(App)

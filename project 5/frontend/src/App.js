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
      name: null,
      email: null
    },
    currentPurchase: []
  }

  signin = (user) => {
    localStorage.setItem('token', user.token)
    this.setState({ currentUser: {
      name: user.name,
      email: user.email}}, () => {
        this.props.history.push('/home')
      })
  }

  signout = () => {
    localStorage.removeItem('token')
    this.setState({ currentUser: {
      name: null,
     email: null }})
    this.props.history.push('/signin')
  }

  componentDidMount() {
    if (!localStorage.getItem('token')) return
    API.validate()
      .then(user => {
        this.signin(user)
        this.setState({})
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

  render() {
    const { currentUser, currentPurchase } = this.state
    const { signin, signout, addToPurchase, removefromPurchase, handleDeleteAllButton } = this
    return (
      <div className="App">
        <Route path='/' render={() => <Navbar currentUser={currentUser} currentPurchase={currentPurchase} signout={signout} /> } />
        <Route exact path='/my_videos' render={props => <MyVideosContainer {...props} currentUser={currentUser} />} />
        <Route path='/signin' render={props => <AuthorisationContainer {...props} signin={signin} />} />
        <Route exact path='/home' render={props => <VideosContainer {...props} currentUser={currentUser} currentPurchase={currentPurchase} addToPurchase={addToPurchase}/>} />
        <Route exact path='/basket' render={props => <Basket {...props} currentUser={currentUser} 
          currentPurchase={currentPurchase} removefromPurchase={removefromPurchase} handleDeleteAllButton={handleDeleteAllButton}/>} />
      </div>
    )
  }
}

export default withRouter(App)

import React from 'react'

import SignInForm from '../components/SignInForm'

import API from '../API'

class AuthorisationContainer extends React.Component {
  state = {
    email: '',
    password: ''
  }


  signUpNewUser = event => {
    event.preventDefault()
    const newUser = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.psw.value
    }
    API.createNewUser(newUser)
      .then(this.validateSignUp)
  }

  validateSignUp = (resp) => {
    if (resp.error) {
      this.setState({error: resp.error})
    } else {
      this.setState({email: resp.email, password: resp.password})
      this.props.signInUser(resp.email, resp.password)
    }
  }

  signInExistingUser = event => {
    event.preventDefault()
    this.setState({email: event.target.email.value, password: event.target.psw.value}, () => {
      API.login(this.state.email, this.state.password)
      .then(data => {
        if (data.error) {
          alert('Wrong!')
        } else {
          this.props.signin(data)
        }
      })
    })
    
  }

  render () {

    return (
      <div>
      <SignInForm handleSubmit={this.signUpNewUser} signInExistingUser={this.signInExistingUser}/>
      </div>
    )
  }
}

export default AuthorisationContainer

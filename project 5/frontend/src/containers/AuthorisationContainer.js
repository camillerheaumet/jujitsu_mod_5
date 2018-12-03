import React from 'react'

import SignInForm from '../components/SignInForm'
import SignUpForm from '../components/SignUpForm'

import API from '../API'

class AuthorisationContainer extends React.Component {
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
    if (resp.errors) {
      this.props.alertFunc(resp.errors)
    } else {
      this.props.signin(resp)
    }
  }

  signInExistingUser = event => {
    event.preventDefault()
    API.login(event.target.email.value, event.target.psw.value)
    .then(data => {
      if (data.error) {
        this.props.alertFunc('Wrong combination email/password')
      } else {
        this.props.signin(data)
      }
    })
  }

  render () {

    return (
      <div>
      <SignInForm signInExistingUser={this.signInExistingUser}/>
      <h2>Or</h2>
      <SignUpForm handleSubmit={this.signUpNewUser} alertFunc={this.props.alertFunc}/>
      </div>
    )
  }
}

export default AuthorisationContainer

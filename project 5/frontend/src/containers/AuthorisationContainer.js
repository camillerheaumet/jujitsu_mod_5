import React from 'react'

import SignInForm from '../components/SignInForm'
import SignUpForm from '../components/SignUpForm'

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
    if (resp.errors) {
      alert(resp.errors)
    } else {
      this.props.signin(resp)
    }
  }

  signInExistingUser = event => {
    event.preventDefault()
    this.setState({email: event.target.email.value, password: event.target.psw.value}, () => {
      API.login(this.state.email, this.state.password)
      .then(data => {
        if (data.error) {
          alert('Wrong combination email/password')
        } else {
          this.props.signin(data)
        }
      })
    })
    
  }

  render () {

    return (
      <div>
      <SignInForm signInExistingUser={this.signInExistingUser}/>
      <h2>Or</h2>
      <SignUpForm handleSubmit={this.signUpNewUser}/>
      </div>
    )
  }
}

export default AuthorisationContainer

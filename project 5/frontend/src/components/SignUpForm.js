import React from 'react'

class SignUpForm extends React.Component {
    validatePassword = (event) => {
        event.preventDefault()
        if (event.target.psw.value !== event.target.pswconf.value) {
            this.alertFuncPassword('Password is different than the confirm password. Please re-enter them.', event)
        } else if (event.target.psw.value.toLowerCase() === event.target.name.value.toLowerCase()){
            this.alertFuncPassword('Your password can not be your name. Please choose a secure password.', event)
        } else {
            this.props.handleSubmit(event)
        }
    }

    alertFuncPassword = (string, event)  => {
        this.props.alertFunc(string);
        event.target.psw.value = '';
        event.target.pswconf.value = ''
    }

    render () {
    return (
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={event => this.validatePassword(event)} className='formContainer'>
          <label className='sign-up' htmlFor='name'><b>Name</b></label>
          <input className='sign-up' type='text' placeholder='Enter your name' name='name' required />

          <label className='sign-up' htmlFor='email'><b>Email address</b></label>
          <input className='sign-up' type='text' placeholder='Enter email address' name='email' required />

          <label className='sign-up' htmlFor='psw'><b>Password</b></label>
          <input className='sign-up' type='password' placeholder='Enter Password (6 characters or plus)' name='psw' minLength={6} required />

          <label className='sign-up' htmlFor='pswconf'><b>Confirm password</b></label>
          <input className='sign-up' type='password' placeholder='Re-enter password' name='pswconf' required />

          <button type='submit'>Sign Up</button>
      </form>
      <p>{this.props.error}</p>
    </div>
    )
    }
}

export default SignUpForm
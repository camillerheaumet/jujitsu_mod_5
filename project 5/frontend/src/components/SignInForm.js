import React from 'react'

class SignInForm extends React.Component {
  render () {
    const { signInExistingUser } = this.props
    return (
      <div>
        <h2>Sign In</h2>
        <form onSubmit={event => signInExistingUser(event)} className='formContainer'>
          <label className='sign-in' htmlFor='email'><b>Email address</b></label>
          <input className='sign-in' type='text' placeholder='Enter Store Name' name='email' required />

          <label className='sign-in' htmlFor='psw'><b>Password</b></label>
          <input className='sign-in' type='password' placeholder='Enter Password' name='psw' required />

          <button type='submit'>Sign In</button>
      </form>
    </div>
    )
  }
}

export default SignInForm
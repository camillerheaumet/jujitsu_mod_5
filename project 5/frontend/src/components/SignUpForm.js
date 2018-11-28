import React from 'react'

class SignUpForm extends React.Component {
    validatePassword = (event) => {
        event.preventDefault()
        if (event.target.psw.value !== event.target.pswconf.value) {
            alert('Please re-enter password and confirm password');
            event.target.psw.value = '';
            event.target.pswconf.value = ''
        } else if (event.target.psw.value.toLowerCase() === event.target.name.value.toLowerCase()){
            alert('Your password can not be your name');
            event.target.psw.value = '';
            event.target.pswconf.value = ''
        } else if (event.target.psw.value.lenght <= 5) {
            alert('Your password has includes 6 characters or more');
            event.target.psw.value = '';
            event.target.pswconf.value = ''
        } else {
            this.props.handleSubmit(event)
        }
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
          <input className='sign-up' type='password' placeholder='Enter Password (6 characters or plus)' name='psw' required />

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
import React from 'react'

const Navbar = props =>
  <header className='App-header'>
    <h1 className='App-title'>
      {props.email ?
          `Welcome back, ${props.name}!` :
          'Welcome to Ju jitsu payment system.'
      }
      <br />
      {props.email && <button onClick={props.signout}>SIGN OUT</button>}
    </h1>
  </header>

export default Navbar
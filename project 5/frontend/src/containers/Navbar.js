import React from 'react'

import { Link } from 'react-router-dom'

const Navbar = props =>
  <header className='App-header'>
    <h1 className='App-title'>
      {localStorage.getItem('token') ?
          `Welcome back, ${props.currentUser.name}!` :
          'Welcome to Ju jitsu payment system.'}
    </h1>
    <ul className='nav_list'>
        <ol className='nav_list_item'><Link exact to='/home'>Home</Link></ol>
        <ol className='nav_list_item'><Link exact to='/my_videos'>My Videos</Link></ol>
        <ol className='nav_list_item'><Link exact to='/basket'>Basket  ({props.currentPurchase.length})</Link></ol>
      <button>{!!localStorage.getItem('token') ?
        <Link to='/' onClick={props.signout}>SIGN OUT</Link>:
        <Link to='/signin' >SIGN IN</Link>}
      </button>
    </ul>
  </header>

export default Navbar
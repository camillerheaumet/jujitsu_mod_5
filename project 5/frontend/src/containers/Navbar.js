import React from 'react'
import logo from '../logo.png'

import { Link } from 'react-router-dom'

const Navbar = props =>
  <header className='App-header'>
  <img src={logo} alt={'logo'} />
    <h1 className='App-title'>
      {localStorage.getItem('token') ?
          `Welcome back, ${props.currentUser.name}!` :
          'Welcome to London Ju Jitsu Shop.'}
    </h1>
    {props.currentUser.admin ?
    <h2>YOU ARE AN ADMIN USER</h2>: null}
    <ul className='nav_list'>
        <ol className='nav_list_item'><Link exact='true' to='/home'>Home</Link></ol>
        <ol className='nav_list_item'><Link exact='true' to='/my_account'>My account</Link></ol>
        <ol className='nav_list_item'><Link exact='true' to='/my_videos'>My Videos</Link></ol>
        <ol className='nav_list_item'><Link exact='true' to='/basket'>Basket  ({props.currentPurchase.length})</Link></ol>
      <button>{!!localStorage.getItem('token') ?
        <Link to='/' onClick={props.signout}>SIGN OUT</Link>:
        <Link to='/signin' >SIGN IN or SIGN UP</Link>}
      </button>
    </ul>
  </header>

export default Navbar
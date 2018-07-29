import * as React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './Home'
import Contacts from './Contacts'
import Search from './Search'
import Help from './Help'

export default function App() {
  return (
    <Router>
      <div>
        <Menu />
        <hr />

        <Route exact path="/" component={Home} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/search" component={Search} />
        <Route path="/help" component={Help} />

        <hr />
        <Footer />
      </div>

    </Router>
  )
}

function Menu() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/contacts">Contacts</Link>
      </li>
      <li>
        <Link to="/search">Search</Link>
      </li>
      <li>
        <Link to="/help">Help</Link>
      </li>
    </ul>
  )
}

function Footer() {
  return <div>Made with love at Fancy Broker Agency</div>
}
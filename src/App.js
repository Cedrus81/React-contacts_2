import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import './assets/styles/main.scss'
import { ContactPage } from './pages/contact-page';
import { HomePage } from './pages/home-page.jsx'
import { AppHeader } from './cmps/app-header.jsx'
import { ContactEdit } from './pages/contact-edit.jsx'
import { ContactDetails } from './pages/contact-details.jsx'
import { Signup } from './pages/signup.jsx'
function App() {
  return (
    <Router>
      <AppHeader />
      <Switch>
        <Route path="/contact/edit/:id?" component={ContactEdit} />
        <Route path="/contact/:id" component={ContactDetails} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/signup" component={Signup} />
        <Route path="/" component={HomePage} />
      </Switch>
    </Router>
    // <Charts />
  )
}

export default App;

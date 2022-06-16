import React,{useEffect} from 'react'
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavbarBuyer from './components/layout/Header/NavbarBuyer'
import NavbarSeller from './components/layout/Header/NavbarSeller'
import Footer from './components/layout/Footer/Footer'
import {
  LoginSignUp,
  Home,
  Dashboard,
  Settings,
  Gigs,
  Profile,
  CreateGig} from './components/Pages'
import NotFound from './components/layout/Not Found/NotFound'
import store from "./store";
import {clearErrors, loadUser} from './redux/actions/userAction'
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from './components/Route/ProtectedRoute'
const App = ()=>{
  const { isAuthenticated, user, error } = useSelector((state) => state.user);
  const { navbarStatus } = useSelector((state) => state.navbar)
  useEffect(() => {
    store.dispatch(loadUser());
    if(error){
      store.dispatch(clearErrors());
    }
  }, [])
  

  return (
  <>
    {/* <Router> */}
    { 
      navbarStatus === 'seller'?
        <NavbarSeller/>:
        <NavbarBuyer/>
    }
      <Switch>
       <Route exact path="/"  component={Home}/>
       <Route exact path="/login"  component={LoginSignUp}/>
       <Route exact path="/gigs"  component={Gigs}/>
       <Route exact path="/gigs/:name"  component={Gigs}/>
       <ProtectedRoute exact path="/dashboard" component={Dashboard} />
       <ProtectedRoute exact path="/settings" component={Settings} />
       <ProtectedRoute exact path="/profile" component={Profile} />
       <ProtectedRoute exact path="/gig/new" component={CreateGig} />
       <ProtectedRoute exact path="/gig/edit/:id" component={CreateGig} />
       <Route  path="*"  component={NotFound}/>

      </Switch>
    {/* </Router> */}
    <Footer/>
   </>
  )
}

export default App
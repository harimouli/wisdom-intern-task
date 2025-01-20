import {Component} from 'react';    // Import the Component component from react

import Context from "./context/Context"; // Import the Context component

import {Route, Routes} from "react-router-dom"; // Import the Route and Routes components from react-router-dom

import Home from "./components/Home";

import ThemeBtn from './components/ThemeBtn'; // Import the ThemeBtn component


import UserProfileWrapper from './components/UserProfileWrapper.jsx';

import './App.css'; // Import the App.css file
class App extends Component {
    state = {
        isDark: false
    }
  toggleTheme = () => { //toggle theme function
    const {isDark} = this.state; // Destructured the isDark property from the state object
    this.setState({isDark: !isDark});
    console.log("toglle theme clicked");
  }
  render() {
    const {isDark} = this.state; // Destructured the isDark property from the state object
    const appTheme = isDark ? "app-light" : "app-dark"; // setting the theme based on the isDark property;
    return (
        <Context.Provider value = {
            {
                isDark: isDark,
                toggleTheme: this.toggleTheme
            
            }}>
                <div className = {`app ${appTheme}`}>
                        <ThemeBtn/>
                        <Routes>
                            <Route  path="/" element={<Home/>} />
                            <Route path="/user/:id" element={<UserProfileWrapper/>} />
                        </Routes>


                </div>
        </Context.Provider>
    )
  }
}


export default App;
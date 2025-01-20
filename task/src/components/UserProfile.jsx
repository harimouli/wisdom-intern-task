import { Component } from "react";

import {Link} from "react-router-dom";

import PropTypes from 'prop-types';

import Context from "../context/Context";

import { RxExit } from "react-icons/rx";

import { FaAddressCard } from "react-icons/fa6";

import { FaPhone } from "react-icons/fa";

import { SiGmail } from "react-icons/si";

import { CgWebsite } from "react-icons/cg";

import {FailureContainer} from "./HomeStyles";

import Loader from "./Loader.jsx";

import "./cssfiles/UserProfile.css";

const apiStatusObj = {
    initial: 'INITIAL',
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
  };
  
class UserProfile extends Component {
    state = {
        userDetail: {},
        requestStatus: apiStatusObj.initial
    }
    componentDidMount() {
        this.getUserDetail();
    }
    getUserDetail = async () => {
        this.setState({requestStatus: apiStatusObj.inProgress});
        const {params} = this.props;
        const userId = params.id;
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);   
        const data = await response.json();
        this.setState({userDetail: data, requestStatus: apiStatusObj.success});
    }
      renderUserDetail = () => {
        return (
            
            <Context.Consumer>

                { value => {
                    const {isDark} = value;
                    const theme = isDark ? "dark-mode" : "light-mode";
                    return (
                        <div className = "user-profile-container">
                                        <Link to = "/" className = "back-link">
                                                <button className = "back-button" >
                                                    <RxExit  fontSize={40} color = " #3b82f6"/>
                                                </button>
                                        </Link>
                                <div className = "user-detail-container">
                                            <img src = "https://res.cloudinary.com/dlngievv2/image/upload/v1737384472/user-profile-removebg-preview_zg5yav.png" alt = "user"  className = "profile-icon"/>
                                    <div className = "user-detail">
                                        <h2 className = {`user-profile-heading ${theme}`}>{this.state.userDetail.name}</h2>
                                        <p className = {`username ${theme}`} >
                                            {`USERNAME: ${this.state.userDetail.username}`}
                                        </p>
                                    </div>
                                    <div className = "profile-info-container">
                                        <p className = {`item-card ${theme}`}>
                                            <span className = "icon">
                                                    <SiGmail  fontSize={30}/>
                                            </span>
                                            {this.state.userDetail.email}
                                        </p>
                                        <p className = {`item-card ${theme}`}>
                                            <span className = "icon">
                                                <FaPhone fontSize={26}/>
                                            </span>
                                            {this.state.userDetail.phone}
                                        
                                        </p>
                                        <p className = {`item-card ${theme}`}>
                                            <span className = "icon">
                                                <CgWebsite fontSize = {26}/>
                                            </span>
                                            {this.state.userDetail.website}
                                        </p>
                                    </div>
                                    <div className = "address-card">
                                        <h3 className = {`address-heading ${theme}`}>
                                            <span className = "icon">
                                                <FaAddressCard fontSize={26}/>
                                            </span>

                                            ADDRESS :
                                        </h3>

                                        <div className = "address-info">
                                                <p className = {`item-card ${theme}`}>
                                                    {this.state.userDetail.address?.city}  
                                                </p>
                                                <p className = {`item-card ${theme}`}>{this.state.userDetail.address?.street}</p>
                                                <p className = {`item-card ${theme}`}>{this.state.userDetail.address?.suite}</p>
                                                <p className = {`item-card ${theme}`}>{this.state.userDetail.address?.zipcode}</p>
                                        </div>
                                    </div>    
                                </div>
                            </div>
                    )
                }

                }
            </Context.Consumer>
        )
    }

    render() {
        const {requestStatus} = this.state;
        
          switch(requestStatus){
                case apiStatusObj.inProgress:
                    return <FailureContainer><Loader/></FailureContainer>
                case apiStatusObj.success:
                    return this.renderUserDetail();
                case apiStatusObj.failure:
                    return <div>Something went wrong</div>
                default:
                    return null;
          }
    }
}

UserProfile.propTypes = {
    params: PropTypes.shape({
        id: PropTypes.number.isRequired
    }).isRequired
};

export default UserProfile;

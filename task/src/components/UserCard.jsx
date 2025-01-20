
import {Link} from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaLocationPin } from "react-icons/fa6";

import "./cssfiles/UserCard.css"

import PropTypes from 'prop-types';

import Context from '../context/Context';



const UserCard = (props) => {
    return (
    <Link to = {`/user/${props.user.id}`} className = "user-card-link">
        <Context.Consumer>
            {value => {
                const {isDark} = value;
                const {user} = props;
                const {name, email,  address} = user;
                const userCardTheme = isDark ? "light-user-card " : "dark-user-card";
                const contextTheme = isDark ? "email-dark" : "";
                return (
                    <div className= {`user-card ${userCardTheme}`}>
                        <img src="https://res.cloudinary.com/dlngievv2/image/upload/v1737313934/man_lujhx6.png"alt="profile"  className = "profile-icon-for-user-card"/>
                        <div className="user-info">
                            <h2  className = {`name ${contextTheme}`}>{name}</h2>
                                <p className= {`email ${contextTheme}`}>
                                    <span className="icon">
                                        <MdEmail />
                                    </span>
                                    {email}
                                </p>
                                <p className = {`email ${contextTheme}`}>
                                    <span className = "icon">
                                        <FaLocationPin />
                                    </span>
                                    {address.city}
                                </p>
                        </div>
                    </div>
                );
            }}
        </Context.Consumer>
    </Link>
    )
}

UserCard.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string.isRequired, // Expect `id` as a string
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        website: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        address: PropTypes.shape({
            city: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};


export default UserCard;

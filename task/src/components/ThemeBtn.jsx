import Context from "../context/Context";

import { IoSunny } from "react-icons/io5";

import { FaMoon } from "react-icons/fa";

import "./cssfiles/ThemeBtn.css";
const ThemeBtn = () => {
    return (
        <Context.Consumer>
            {
                value => {
                    const {isDark, toggleTheme} = value;
                    const onClickChangeTheme = () => {
                        toggleTheme();
                    }
                    const themeIcon = !isDark ? <IoSunny  color = " #FFFF00" fontSize={50}/> : <FaMoon fontSize={40}/>;
                    return (
                        <div className= "theme-toggle">
                            <button className = "btn" onClick = {onClickChangeTheme}>
                               {themeIcon}
                            </button>
                        </div>
                    )
                }
            }
        </Context.Consumer>
    )
}

export default ThemeBtn;
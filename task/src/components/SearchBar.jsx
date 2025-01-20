
import "./cssfiles/SearchBar.css";
import PropTypes from 'prop-types';

const SearchBar = ({ searchQuery, onSearchChange }) => {
    return (
        <div className="search-bar-img-container">
            <img src = "https://res.cloudinary.com/dlngievv2/image/upload/v1737329009/search-user_8430306_ehs13q.png" alt = "search-icon" className = "search-icon"/>
            <input
                type="search"
                placeholder="Search a user"
                className="search-bar"
                value={searchQuery} 
                onChange={onSearchChange} 
            />
        </div>
    );
}
SearchBar.propTypes = {
    searchQuery: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired,
};

export default SearchBar;


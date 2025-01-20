import { Component } from "react"; // i have added this line to import the component

import { FcFilledFilter } from "react-icons/fc"; // i have added this line to import the filter icon

import Loader from "./Loader"; // i have added this line to import the loader component

import { HomeContainer, FailureContainer, FailureImage } from './HomeStyles'; // i have added this line to import the styled components

import Context from '../context/Context'; // i have added this line to import the context

import SearchBar from "./SearchBar"; // i have added this line to import the search bar component

import "./cssfiles/Home.css"; //  i have added this line to import the css file

import UserCard from "./UserCard"; // i have added this line to import the user card component


// i have added this object to store the api status

const apiStatusObj = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
};

class Home extends Component {
  state = {                           /* i have added this state object */
                                      
    apiStatus: apiStatusObj.initial,
    userData: [],
    currentPage: 1,
    usersPerPage: 3,
    sortOrder: "asc",
    searchQuery: "",  
  };

  // i have added this function to fetch the data
  fetchData = async () => {
    this.setState({ apiStatus: apiStatusObj.inProgress });
    try { // i have added this try block to handle the error
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await response.json();
      this.setState({ apiStatus: apiStatusObj.success, userData: data });
    } catch (error) { // i have added this catch block
      console.error('Error fetching data:', error.message);
      this.setState({ apiStatus: apiStatusObj.failure });
    }
  };

  // i have added this function to fetch the data when the component is mounted
  componentDidMount() {
    this.fetchData();
  }

  // handler to update the sort order
  handleSortOrderChange = event => {
    this.setState({ sortOrder: event.target.value });
  };

  // updating search input based on user input
  handleSearchChange = event => {
    this.setState({ searchQuery: event.target.value });
  };

  // this function is used to sort the users based on the sort order
  getSortedUsers = () => {
    const { userData, sortOrder } = this.state;
    return [...userData].sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return sortOrder === "asc" ? comparison : -comparison;
    });
  };

  // this function is used to filter the users based on the search query
  getFilteredUsers = (sortedUsers) => {
    const { searchQuery } = this.state;
    if (!searchQuery) return sortedUsers;
    return sortedUsers.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  // this function is used to render the success view
  renderSuccessView = () => {
    return (
      <Context.Consumer>
        {value => {
          const { isDark } = value;
          const { currentPage, usersPerPage } = this.state;

          const sortedUsers = this.getSortedUsers(); // Get sorted users
          const filteredUsers = this.getFilteredUsers(sortedUsers); // Get filtered users
          const indexOfLastUser = currentPage * usersPerPage;// Index of last user
          const indexOfFirstUser = indexOfLastUser - usersPerPage;// Index of first user
          const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);// Current users
         
          const mainHeadingClassName = isDark ? "dark-heading" : "light-heading"; // Main heading class name
          return (
            <HomeContainer $isDark={isDark}>
              <div className="header-container">
                <img
                  src="https://res.cloudinary.com/dlngievv2/image/upload/v1737303172/duiit8ogjpzaytr3rlxv.png"
                  alt="main-img"
                  className="main-image"
                />
                <h1 className={`main-heading ${mainHeadingClassName}`}>User Management System</h1>
              </div>
              <div className="search-bar-container">
                <SearchBar
                  searchQuery={this.state.searchQuery}
                  onSearchChange={this.handleSearchChange}
                />
                <div className="filter-container">
                  <FcFilledFilter fontSize = {30}/>
                  <select
                    className="sort-dropdown"
                    value={this.state.sortOrder}
                    onChange={this.handleSortOrderChange}
                  >
                    <option value="asc">Sort by Name (A-Z)</option>
                    <option value="desc">Sort by Name (Z-A)</option>
                  </select>
                </div>
              </div> 
                
                {currentUsers.length === 0 ? ( // i have added this ternary operator to check if the current users length is 0
                            <FailureContainer>
                                  
                                  <img src = "https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"  alt = "no-user-found" className = "no-user-found-img"/>
                                  <p className = {`main-heading ${mainHeadingClassName}`}>No Users Found</p>
                            </FailureContainer>
                  ) : (
                    <>
                      <ul className="user-list">
                        {currentUsers.map((user) => (
                          <UserCard key={user.id} user={user} />
                        ))}
                      </ul>
                      {this.renderPagination(filteredUsers.length)}
                    </>
                  )}

            </HomeContainer>
          );
        }}
      </Context.Consumer>
    );
  };

  // i have added this function to render the pagination
  renderPagination = totalUsers => {
    const { currentPage, usersPerPage } = this.state;
    const totalPages = Math.ceil(totalUsers / usersPerPage);

    return (
      <div className="pagination-container">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`pagination-btn ${currentPage === index + 1 ? "active" : ""}`}
            onClick={() => this.setState({ currentPage: index + 1 })}
          >
            {index + 1}
          </button>
        ))}
      </div>
    );
  };

  // i have added this function to render the home view
  renderHomeView = () => {
    const { apiStatus} = this.state;

    switch (apiStatus) { // i have added this switch case to handle the api status and rendering  the view accordingly
      case apiStatusObj.inProgress:
        return (
          <FailureContainer>
            <Loader />
          </FailureContainer>
        );
      case apiStatusObj.success:
        return this.renderSuccessView();
      case apiStatusObj.failure:
        return (
          <FailureContainer>
            <FailureImage
              src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
              alt="failure view"
            />
            <p>Something Went Wrong</p>
            <button onClick={this.fetchData}>Retry</button>
          </FailureContainer>
        );
      default:
        return <div>Welcome to the Home Page</div>;
    }
  };

  render() {
    return this.renderHomeView(); // i have added this line to render the home view based on the api status
  }
}

export default Home;

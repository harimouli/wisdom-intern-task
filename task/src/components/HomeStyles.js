import styled from 'styled-components';


export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
 height: 100vh;
`;

// Failure view container, reusing HomeContainer styles
export const FailureContainer = styled(HomeContainer)`
  justify-content: center;
  padding: 20px;
  text-align: center;
`;

// Retry button with theme-aware styling and hover effect
export const RetryBtn = styled.button`
  background-color: ${props => (props.theme ? ' #3b82f6' : ' #282c34')};
  color: ${props => (props.theme ? '#ffffff' : '#f3f3f3')};
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${props => (props.theme ? ' #1e40af' : ' #4b5563')};
    color: #ffffff;
  }
`;

export const FailureImage = styled.img`
  width: 300px;
  margin-bottom: 10px;
`;

import { useParams } from 'react-router-dom';
import UserProfile from './UserProfile';

const UserProfileWrapper = () => {  
    const {id} = useParams(); 
    const numericId = Number(id); 
    console.log(numericId); 
    return <UserProfile params={{ id: numericId }} />;
};

export default UserProfileWrapper;

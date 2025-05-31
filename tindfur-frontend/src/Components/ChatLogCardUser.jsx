import './ChatLogCardUser.css';
import { useNavigate } from 'react-router-dom';
import userAuth from '../Hooks/UserAuth';

export default function ChatLogCardUser({ chatLog }) {

    const { isLoggedIn, isShelter, userID } = userAuth();

    const pet = chatLog.petID;
    const user = chatLog.userID;

    const image = isShelter ? user?.profilePic : pet?.picture;



    const navigate = useNavigate();

    const handleClick = () => {

        if (isShelter) {
            navigate(`/shelter-messages/${chatLog._id}`);

        } else {
        navigate(`/view-messages/${chatLog._id}`);}
      };

  return (
    <section onClick={handleClick} className='ChatLogCardUser'>
    
      <img src={image} />
      <p><strong>From:</strong> {user.username}</p>
      <p><strong>Concerning:</strong> {pet.name}</p>
    </section>
  );
}
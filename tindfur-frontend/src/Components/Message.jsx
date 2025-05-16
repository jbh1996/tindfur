export default function Message({ message }) {

    const formattedDate = new Date(message.createdAt).toLocaleString();
    const userTypeClass = message.userType?.toLowerCase() === 'shelter' ? 'shelter' : 'user';

  
    return (
      <div className={`message ${message.userType}`}>
        <p>{message.content}</p>
        <p><small>{formattedDate}</small></p>
      </div>
    );
  }
  
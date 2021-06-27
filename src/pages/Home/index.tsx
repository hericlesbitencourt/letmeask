import illustrationImage from "../../assets/images/illustration.svg";
import logoImage from "../../assets/images/logo.svg";
import googleIconImage from "../../assets/images/google-icon.svg";
import '../../styles/auth.scss';
import { Button } from "../../components/Button";
import { useHistory } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";
import { FormEvent, useState } from "react";
import { database } from "../../services/firebase";

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');
  async function handleCreateRoom () {
    if(!user) {
       await signInWithGoogle();
    }
    history.push('/rooms/new');
  }

  async function handleJoinRoom (event: FormEvent) {
    event.preventDefault();

    if(roomCode === '') {
      return;
    }

    const roomRef = await database.ref(`/rooms/${roomCode}`).get();

    if(!roomRef.exists()) {
      alert('Room does not exist.');
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }
  
  return (
  <div id="page-auth">
    <aside>
      <img
        src={illustrationImage}
        alt="Illustration representing questions and answers"
      />
      <strong>Create live rooms of Q&amp;A</strong>
      <p>Ask questions of your audience in real time</p>
    </aside>
    <main>
      <div className="main-content">
          <img src={logoImage} alt="Letmeask" />
        <button onClick={handleCreateRoom} className="create-room">
          <img src={googleIconImage} alt="Google Logo Icon" />
          Create your rooms with Google
        </button>
        <div className="separator">or enter a room</div>
        <form onSubmit={handleJoinRoom}>
          <input type="text" placeholder="Enter the room code" onChange={event => setRoomCode(event.target.value )} value={roomCode}/>
          <Button type="submit">Enter a room</Button>
        </form>
      </div>
    </main>
  </div>
  );
}

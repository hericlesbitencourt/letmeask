import illustrationImage from "../../assets/images/illustration.svg";
import logoImage from "../../assets/images/logo.svg";
import "../../styles/auth.scss";
import { Button } from "../../components/Button";
import { Link, useHistory } from "react-router-dom";
import { FormEvent, useState } from "react";
import { database } from "../../services/firebase";
import { useAuth } from "../../hooks/useAuth";

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState('');
  async function handleCreateRoom (event: FormEvent) {
    event.preventDefault();

    if(newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`)
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
          <h2>Create a new room</h2>
          <form onSubmit={handleCreateRoom}>
            <input type="text" placeholder="Name of room" onChange={event => setNewRoom(event.target.value)} value={newRoom}/>
            <Button type="submit">Create room</Button>
          </form>
          <p>
            Want to join an existing room? <Link to="/">Click here</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

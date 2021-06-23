import illustrationImage from "../../assets/images/illustration.svg";
import logoImage from "../../assets/images/logo.svg";
import "../../styles/auth.scss";
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";

export function NewRoom() {
  // const { user } = useAuth();

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
          <form>
            <input type="text" placeholder="Name of room" />
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

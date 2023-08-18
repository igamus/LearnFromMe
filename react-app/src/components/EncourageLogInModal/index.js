import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./EncourageLoginModal.css";

function EncourageLoginModal() {
    const history = useHistory();
    const { closeModal } = useModal();

    const toLogin = () => {
        history.push("/login");
        closeModal();
    };

    const toSignup = () => {
        history.push("/signup");
        closeModal();
    };

    return (
        <div>
            <h1 style={{textAlign: "center"}}>Log in to keep shopping!</h1>
            <div className="auth-modal-buttons">
                <button className="purple-button encourage-button" onClick={toLogin}>Log In</button>
                <button className="white-button encourage-button" onClick={toSignup}>Sign Up</button>
            </div>
        </div>
    );
};

export default EncourageLoginModal;

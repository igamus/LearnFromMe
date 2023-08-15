import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";

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
            <h1>Log in to add to keep shopping!</h1>
            <button onClick={toLogin}>Log In</button>
            <button onClick={toSignup}>Sign Up</button>
        </div>
    );
};

export default EncourageLoginModal;

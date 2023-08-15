import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteCourseThunk } from "../../store/courses";
import { useModal } from "../../context/Modal";

function DeleteModal({ type, id, from }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const handleDelete = e => {
        e.preventDefault();
        try {
            dispatch(deleteCourseThunk(id));
            closeModal();
            if (from === "page") history.push("/browse");
        } catch (errors) {
            console.log("Error deleting course:", errors);
        }
    }

    return(
        <div>
            <h1>Are you sure you would like to delete this {type === "course" ? "course" : null}?</h1>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={closeModal}>No</button>
        </div>
    );
};

export default DeleteModal;

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteCourseThunk } from "../../store/courses";
import { useModal } from "../../context/Modal";
import "./DeleteModal.css";

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
        <>
            <h1 className="modal-header">Are you sure you would like to delete this {type === "course" ? "course" : null}?</h1>
            <button className="red-button" style={{padding: "20px", fontSide: "12pt"}} onClick={handleDelete}>Yes</button>
            <button className="white-button" style={{padding: "20px", fontSide: "12pt"}} onClick={closeModal}>No</button>
        </>
    );
};

export default DeleteModal;

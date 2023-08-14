import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { readSingleCourseThunk } from "../../store/courses";
import DeleteModal from "../DeleteModal";
import OpenModalButton from "../OpenModalButton";
import { useHistory } from "react-router-dom";
// import { readCartThunk } from "../../store/cart";

function CoursePage() {
    const { courseId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [courseLoaded, setCourseLoaded] = useState(false);

    useEffect(() => {
        dispatch(readSingleCourseThunk(courseId)).then(() => setCourseLoaded(true));
    }, [dispatch]);

    // useEffect(() => {
    //     dispatch(readCartThunk());
    // }, [dispatch]);

    const course = useSelector(state => state.courses.singleCourse);
    // const cart = useSelector(state => state.cart);
    const user = useSelector(state => state.session.user);

    return courseLoaded && (
        <div>
            <button onClick={() => history.push("/browse")}>Back</button>
            {user?.id === course.instructor.id
                ?
                    <div>
                        <button onClick={(e) => {
                            e.preventDefault();
                            history.push(`/courses/course/${courseId}/update`)}
                        }>Update Course</button>
                        <OpenModalButton buttonText={"Delete This Course"} modalComponent={<DeleteModal type="course" id={courseId} />} />
                    </div>
                :
            null}
            <h1>{course.name}</h1>
            <h2>{course.instructor.name}</h2>
            <p>{course.description}</p>
            <p>{course.whatYoullLearn}</p>
        </div>
    )
};

export default CoursePage;

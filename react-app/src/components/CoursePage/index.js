import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { readSingleCourseThunk } from "../../store/courses";
import DeleteModal from "../DeleteModal";
import OpenModalButton from "../OpenModalButton";

function CoursePage() {
    const { courseId } = useParams();
    const dispatch = useDispatch();
    const [courseLoaded, setCourseLoaded] = useState(false);

    useEffect(() => {
        dispatch(readSingleCourseThunk(courseId)).then(() => setCourseLoaded(true));
    }, [dispatch]);

    const course = useSelector(state => state.courses.singleCourse);
    const user = useSelector(state => state.session.user);

    return courseLoaded && (
        <div>
            {user.id === course.instructor.id ? <OpenModalButton buttonText={"Delete This Course"} modalComponent={<DeleteModal type="course" id={courseId} />} /> : null }
            <h1>{course.name}</h1>
            <h2>{course.instructor.name}</h2>
        </div>
    )
};

export default CoursePage;

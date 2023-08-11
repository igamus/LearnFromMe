import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readAllCoursesThunk } from "../../store/courses";

function ViewAllCourses() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(readAllCoursesThunk());
    }, [dispatch]);

    const courses = useSelector(state => Object.values(state.courses.allCourses));
    console.log("courses:", courses)

    return (
        <div>
            Hi
        </div>
    );
};

export default ViewAllCourses;

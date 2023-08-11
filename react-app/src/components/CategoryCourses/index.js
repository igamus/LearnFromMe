import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { readCategoryCoursesThunk } from "../../store/courses";

function CategoryCourses() {
    const { categoryId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(readCategoryCoursesThunk(categoryId));
    }, [dispatch]);

    const courses = useSelector(state => Object.values(state.courses.categoryCourses));

    return (
        <div>
            {courses.map(course => (
                <h2>{course.name}</h2>
            ))}
        </div>
    );
};

export default CategoryCourses;

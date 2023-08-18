import { useHistory } from "react-router-dom";
import "./CourseCard.css";

function CourseCard({ course, type }) {
    const history = useHistory();
    let route;
    if (type === "browse") {
        route = `/courses/course/${course.id}`
    } else {
        route = `/learn/${course.id}`
    }

    return (
        <div loading="lazy" className="course-card-content clickable" onClick={() => history.push(route)}>
            <img className="course-card-image" src={course.courseImage} alt="course-thumbnail" />
            {/* When testing css, use placeholder below (v) instead of the above (^) */}
            {/* <img className="course-card-image" src="https://images.pexels.com/photos/2377182/pexels-photo-2377182.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="course-thumbnail" /> */}
            <div className="course-card-text">
                <h2 className="course-name">{course.name}</h2>
                <p>{course.description}</p>
                <p className="instructor">{course.instructor.name}</p>
                <p className="courseid">Recommended skill level: {course.level}</p>
                {/* <div className="courseid">Course Id: {course.id}</div> */}
            </div>
        </div>
    );
};

export default CourseCard;

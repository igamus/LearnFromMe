import { useHistory } from "react-router-dom";
import "./CourseCard.css";

function CourseCard({ course }) {
    const history = useHistory();

    return (
        <div className="course-card-content clickable" onClick={() => history.push(`/courses/course/${course.id}`)}>
            {/* <img className="course-card-image" src={course.courseImage} alt="course-thumbnail" /> */}
            <img className="course-card-image" src="https://images.pexels.com/photos/2377182/pexels-photo-2377182.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="course-thumbnail" />
            <div className="course-card-text">
                <h2 className="course-name">{course.name}</h2>
                <p>{course.description}</p>
                <p className="instructor">{course.instructor.name}</p>
                <h7 className="courseid">Course Id: {course.id}</h7>
            </div>
        </div>
    );
};

export default CourseCard;

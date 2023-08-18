import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { readSingleCourseThunk } from "../../store/courses";
import DeleteModal from "../DeleteModal";
import OpenModalButton from "../OpenModalButton";
import { useHistory } from "react-router-dom";

function CoursePageLearn() {
    const { courseId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [courseLoaded, setCourseLoaded] = useState(false);

    useEffect(() => {
        dispatch(readSingleCourseThunk(courseId)).then(() => setCourseLoaded(true));
    }, [dispatch]);

    const course = useSelector(state => state.courses.singleCourse);
    const user = useSelector(state => state.session.user);

    // if not the instructor, reroute
    if (courseLoaded && course.instructor.id !== user.id) {
        history.push("/");
    }

    return courseLoaded && (
        <div>
            <div>
            </div>
            <div className="course-page">
                <div className="sidebar">
                    <video controls className="course-blurb-image" src={course.courseVideo} alt="course-video" />
                    {/* When testing css, use placeholder below (v) instead of the above (^) */}
                    {/* <video controls className="course-blurb-image" src="" /> */}
                    <div className="course-blurb">
                        <h2>${course.price}</h2>
                        <button className="white-button page-cart" onClick={(e) => {
                            e.preventDefault();
                            history.push(`/courses/course/${courseId}/update`)}
                        }>Update Course</button>
                        <p style={{height: "10px", margin: "0"}}></p>
                        <OpenModalButton className="red-button page-cart" buttonText="Delete This Course" modalComponent={<DeleteModal type="course" id={courseId} from="page" />} />
                    </div>
                </div>

                <div className="blackground">
                    <div className="course-page-content">
                        <div className="course-page-nav clickable" onClick={() => history.push("/teach")}>Teach on LearnFromMe</div>
                        <h1>{course.name}</h1>
                        <h2>{course.description}</h2>
                        <p>Created by <span className="course-page-nav">{course.instructor.name}</span></p>
                        <p className="courseid">Recommended skill level: {course.level}</p>
                    </div>
                </div>

                <div className="what-youll-learn-container">
                    <h2 className="what-youll-learn-header">What you'll learn</h2>
                    {course.whatYoullLearn.split("|").map((takeaway, idx) => (
                        <p key={idx} className="takeaway"><span className="checkmark">&#10004;</span> {takeaway}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CoursePageLearn;

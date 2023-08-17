import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createCourseThunk, updateCourseThunk } from "../../store/courses";
import decimalCount from "../../utils/decimalCount";
import "./CourseForm.css";

function CourseForm({ type, starterForm }) {
    console.log("type:", type)
    const history = useHistory();
    const dispatch = useDispatch();

    const [name, setName] = useState(starterForm.name);
    const [description, setDescription] = useState(starterForm.description);
    const [courseImage, setCourseImage] = useState(starterForm.courseImage);
    const [price, setPrice] = useState(starterForm.price);
    const [level, setLevel] = useState(starterForm.level);
    const [whatYoullLearn1, setWhatYoullLearn1] = useState(starterForm.whatYoullLearn1);
    const [whatYoullLearn2, setWhatYoullLearn2] = useState(starterForm.whatYoullLearn2);
    const [whatYoullLearn3, setWhatYoullLearn3] = useState(starterForm.whatYoullLearn3);
    const [courseVideo, setCourseVideo] = useState(starterForm.courseVideo);

    const [errors, setErrors] = useState("");

    const [submissionLoading, setSubmissionLoading] = useState(false);

    const [disable, setDisable] = useState(true);

    const handleSubmit = async e => {
        e.preventDefault();

        const newErrors = [];
        const whatYoullLearnArr = [whatYoullLearn1];
        if (whatYoullLearn2?.length) whatYoullLearnArr.push(whatYoullLearn2);
        if (whatYoullLearn3?.length) whatYoullLearnArr.push(whatYoullLearn3);
        const whatYoullLearn = whatYoullLearnArr.join("|");

        if (whatYoullLearn.length > 255) newErrors.push(`Takeaways: Total character count of takeaways must be less than 256 characters (currently using ${whatYoullLearn.length} characters)`);
        if (!courseImage) newErrors.push("Thumbnail Image: This is a required field.");
        if (!courseVideo) newErrors.push("Course Video: This is a required field.");
        if (decimalCount(price) > 2) newErrors.push("Price: Prices must be rounded to the nearest cent")
        if (price <= 0) newErrors.push("Price: Prices must be greater than 0")

        console.log("newErrors:", newErrors)
        if (newErrors.length) {
            setSubmissionLoading(false);
            setErrors(newErrors);
            return;
        }

        console.log({
            name,
            courseImage,
            description,
            price,
            level,
            course_video: courseVideo,
            whatYoullLearn: whatYoullLearn
        });

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("course_image", courseImage);
        formData.append("price", price);
        formData.append("level", level);
        formData.append("what_youll_learn", whatYoullLearn);
        formData.append("course_video", courseVideo);
        setSubmissionLoading(true);

        if (type === "create") {
            try {
                const newCourse = await dispatch(createCourseThunk(formData));
                console.log("newCourse:", newCourse);
                history.push(`/courses/course/${newCourse.id}`);
            } catch(errors) {
                setSubmissionLoading(false);
                console.log("Errors creating:", errors);
                setErrors(errors.errors);
            }
        }
        if (type === "update") {
            try {
                const e = await dispatch(updateCourseThunk(formData, starterForm.id));
                history.push(`/courses/course/${starterForm.id}`)
            } catch (errors) {
                setSubmissionLoading(false);
                console.log("Errors updating:", errors);
                setErrors(errors);
            }
        }
    };

    useEffect(() => {
        setDisable(true);

        if (name.length && courseImage && price.length && whatYoullLearn1.length && courseVideo) setDisable(false);
    }, [name, courseImage, price, whatYoullLearn1, courseVideo]);

    return (
        <div className="course-form-page">
            <div className="course-heading">
                <h1 style={{marginBottom: "0"}}>{type === "create" ? "Create" : "Update"} your course</h1>
                <h4 style={{marginTop: "0"}}>* indicates a required field</h4>
            </div>
            <div className="error-field">
            {errors ?
                errors.map((error, idx) => <p key={idx} className="error">{error}</p>)
                    :
                null
            }
            </div>
            <form
                className="course-form"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <div className="course-div">
                    <label className="course-label" htmlFor="course-name">Name*</label>
                    <input
                        className="course-input"
                        id="course-name"
                        placeholder="Course name"
                        type="text"
                        min="5"
                        max="255"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>

                <div className="course-div">
                    <label className="course-label" htmlFor="description">Description</label>
                    <input
                        className="course-input"
                        id="description"
                        placeholder="Describe your course!"
                        type="text"
                        max="255"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>

                <div className="course-div">
                    <label className="course-label" htmlFor="course-image">Thumbnail Image*</label>
                    <input
                        id="course-image"
                        type="file"
                        onChange={e => setCourseImage(e.target.files[0])}
                        accept="image/*"
                    />
                </div>

                <div className="course-div">
                    <label className="course-label" htmlFor="price">Price*</label>
                    <span className="course-price-input">$<input
                        className="price-input"
                        id="price"
                        placeholder="Price"
                        type="number"
                        required
                        min="0.01"
                        step="any"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    /></span>
                </div>

                <div className="course-div">
                    <label className="course-label" htmlFor="level">Level</label>
                    <select
                        className="course-input"
                        id="level"
                        value={level}
                        onChange={e => setLevel(e.target.value)}
                    >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>
                </div>

                <div className="course-div">
                    <div className="wyl-label-container">
                        <label className="course-label" htmlFor="whatyoulllearn1">What You'll Learn: List up to three takeaways from your course</label>
                        <div>*Must include at least one takeaway</div>
                    </div>
                    <div className="wyl-input-container">
                        <input
                            className="course-input"
                            id="whatyoulllearn1"
                            placeholder="Tell people what they'll learn!"
                            type="text"
                            required
                            value={whatYoullLearn1}
                            onChange={e => setWhatYoullLearn1(e.target.value)}
                        />
                        <input
                            className="course-input"
                            id="whatyoulllearn2"
                            placeholder="Add another takeaway (optional)"
                            type="text"
                            value={whatYoullLearn2}
                            onChange={e => setWhatYoullLearn2(e.target.value)}
                        />
                        <input
                            className="course-input"
                            id="whatyoulllearn3"
                            placeholder="Add another takeaway (optional)"
                            type="text"
                            value={whatYoullLearn3}
                            onChange={e => setWhatYoullLearn3(e.target.value)}
                        />
                    </div>
                </div>

                <div className="course-div">
                    <label className="course-label" htmlFor="course-video">Upload your course!*</label>
                    <input
                        id="course-video"
                        type="file"
                        onChange={e => setCourseVideo(e.target.files[0])}
                        accept="video/*"
                    />
                </div>

                <button className="purple-button" style={{height: "60px", width: "400px"}} type="submit" disabled={disable}>Submit</button>
                {(submissionLoading) && <p>Loading...</p>}
            </form>
        </div>
    );
};

export default CourseForm;

import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

function CourseForm({ type, starterForm }) {
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

    const [imageLoading, setImageLoading] = useState(false);
    const [videoLoading, setVideoLoading] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();

        // need error handling, including an error state

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("course_image", courseImage); //keys here should be the same as wtform class
        formData.append("price", price);
        formData.append("level", level);
        formData.append("what_youll_learn", [whatYoullLearn1, whatYoullLearn2, whatYoullLearn3].join("|"));
        formData.append("course_video", courseVideo);
        setImageLoading(true); // when does this turn false?
        if (type === "create") {
            try {
                // await dispatch()
                // history.push("") // push somewhere
            } catch(e) {
                // do stuff with e
            }
        }
    };

    // need to handle disabling button with a useEffect

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <label htmlFor="course-name">Name</label>
                <input
                    id="course-name"
                    placeholder="Course name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <label htmlFor="description">Description</label>
                <input
                    id="description"
                    placeholder="Describe your course!"
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />

                <label htmlFor="course-image">Thumbnail Image</label>
                <input
                    id="course-image"
                    type="file"
                    onChange={e => setCourseImage(e.target.files[0])}
                    accept="image/*"
                />

                <label htmlFor="price">Price</label>
                <input
                    id="price"
                    placeholder="Price"
                    type="text"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />

                <label htmlFor="level">Level</label>
                <select
                    id="level"
                    value={level}
                    onChange={e => setLevel(e.target.value)}
                >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>

                <label htmlFor="whatyoulllearn1">List up to three takeaways from the course!</label>
                <input
                    id="whatyoulllearn1"
                    placeholder="Tell people what they'll learn!"
                    type="text"
                    value={level}
                    onChange={e => setLevel(e.target.value)}
                />
                <input
                    id="whatyoulllearn2"
                    placeholder="Add another takeaway (optional)"
                    type="text"
                    value={level}
                    onChange={e => setLevel(e.target.value)}
                />
                <input
                    id="whatyoulllearn3"
                    placeholder="Add another takeaway (optional)"
                    type="text"
                    value={level}
                    onChange={e => setLevel(e.target.value)}
                />

                <label htmlFor="course-video">Upload your course!</label>
                <input
                    id="course-video"
                    type="file"
                    onChange={e => setCourseVideo(e.target.files[0])}
                    accept="video/*"
                />
                <button type="submit">Submit</button>
                {/* <button type="submit" disabled={disabled}>Submit</button> */}
                {(imageLoading) && <p>Loading...</p>}
                {(videoLoading) && <p>Loading...</p>}


            </form>
        </div>
    );
};

export default CourseForm;

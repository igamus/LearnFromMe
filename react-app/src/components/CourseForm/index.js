import { useState } from "react";

function CourseForm({ type, starterForm }) {
    const [name, setName] = useState(starterForm.name);
    const [description, setDescription] = useState(starterForm.description);
    const [courseImage, setCourseImage] = useState(starterForm.courseImage);
    const [price, setPrice] = useState(starterForm.price);
    const [level, setLevel] = useState(starterForm.level);
    const [whatYoullLearn, setWhatYoullLearn] = useState(starterForm.whatYoullLearn);
    const [courseVideo, setCourseVideo] = useState(starterForm.courseVideo);

    return (
        <div>
            Hi
        </div>
    );
};

export default CourseForm;

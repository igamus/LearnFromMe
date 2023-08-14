// action types
const READ_SINGLE_COURSE = "learnfromme/courses/READ_SINGLE_COURSE";
const READ_CATEGORY_COURSES = "learnfromme/courses/READ_CATEGORY_COURSES";
const READ_ALL_COURSES = "learnfromme/courses/READ_ALL_COURSES";
const READ_ALL_COURSES_ORGANIZED = "learnfromme/courses/READ_ALL_COURSES_ORGANIZED";
const CREATE_COURSE = "learnfromme/courses/CREATE_COURSE";
const UPDATE_COURSE = "learnfromme/courses/UPDATE_COURSE";
const DELETE_COURSE = "learnfromme/courses/DELETE_COURSE";

// action creators
const readSingleCourseAction = course => ({
    type: READ_SINGLE_COURSE,
    course
});

const readCategoryCoursesAction = courses => ({
    type: READ_CATEGORY_COURSES,
    courses
});

const readAllCoursesAction = courses => ({
    type: READ_ALL_COURSES,
    courses
});

const readAllCoursesOrganizedAction = courses => ({
    type: READ_ALL_COURSES_ORGANIZED,
    courses
});

const createCourseAction = course => ({
    type: CREATE_COURSE,
    course
});

const updateCourseAction = updatedCourse => ({
    type: UPDATE_COURSE,
    updatedCourse
});

const deleteCourseAction = courseId => ({
    type: DELETE_COURSE,
    courseId
});

// thunk action creators
export const readSingleCourseThunk = courseId => async dispatch => {
    const res = await fetch(`/api/courses/course/${courseId}`);

    if (res.ok) {
        const data = await res.json();
        return dispatch(readSingleCourseAction(data));
    } else {
        const errors = await res.json();
        return errors;
    }
};

export const readCategoryCoursesThunk = categoryId => async dispatch => {
    console.log(`/api/courses/${categoryId}`)
    const res = await fetch(`/api/courses/${categoryId}`);

    if (res.ok) {
        const data = await res.json();
        return dispatch(readCategoryCoursesAction(data));
    } else {
        const errors = await res.json();
        return errors;
    }
};

export const readAllCoursesThunk = () => async dispatch => {
    const res = await fetch("/api/courses/");

    if (res.ok) {
        const data = await res.json();
        return dispatch(readAllCoursesAction(data));
    } else {
        const errors = await res.json();
        return errors;
    }
};

export const readAllCoursesOrganizedThunk = () => async dispatch => {
    const res = await fetch("/api/courses/all");

    if (res.ok) {
        const data = await res.json();
        return dispatch(readAllCoursesOrganizedAction(data));
    } else {
        const errors = await res.json();
        return errors;
    }
};

export const createCourseThunk = formData => async dispatch => {
    const res = await fetch("/api/courses/", {
        method: "POST",
        body: formData
    });

    if (res.ok) {
        const resCourse = await res.json();
        dispatch(createCourseAction(resCourse));
    } else {
        return console.log("There was an error creating the course.")
    }
};

// write thunk
export const updateCourseThunk = (update, id) => async dispatch => {
    const res = await fetch(`/api/courses/course/${id}`, {
        method: "PUT",
        body: update
    });

    if (res.ok) {
        const resUpdate = await res.json();
        dispatch(updateCourseAction(resUpdate));
    } else {
        console.log("There was an error updating the post")
        const errors = await res.json();
        console.log("errors in thunk:", errors);
        return errors;
    }
};

export const deleteCourseThunk = courseId => async dispatch => {
    const res = await fetch(`/api/courses/course/${courseId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        return dispatch(deleteCourseAction(courseId));
    } else {
        const errors = await res.json();
        return errors;
    }
};

// reducer
const initialState = { singleCourse: {}, categoryCourses: {}, allCourses: {} };

function courseReducer(state = initialState, action) { // need to streamline; there's no way you should update every slice every time
    switch(action.type) {
        case READ_SINGLE_COURSE: {
            let newState = {
                ...state,
                singleCourse: { ...action.course }
            };
            return newState;
        }
        case READ_CATEGORY_COURSES: {
            let newState = {
                ...state,
                categoryCourses: {}
            };
            action.courses.forEach(
                course => newState.categoryCourses[course.id] = course
            );
            return newState;
        }
        case READ_ALL_COURSES: {
            let newState = {
                ...state,
                allCourses: {}
            }
            action.courses.forEach(
                course => newState.allCourses[course.id] = course
            );
            return newState;
        }
        case READ_ALL_COURSES_ORGANIZED: { // not sure about this whole process, might nuke this subbranch of the state since it's so involved...
            let newState = {
                ...state,
                allCourses: {}
            };
            const categories = action.courses;
            for (const category in categories) {
                newState.allCourses[category] = [...categories[category]];
            }
            return newState;
        }
        case CREATE_COURSE: { // almost certainly dont need to handle this in the reducer, right?
            let newState = {
                ...state,
            }
            newState.singleCourse = { ...action.course };
            // implement in course categories ? newState.categoryCourses[action.course.category]
            // implement in allCourses ? allCourses all -- the not organized one...
            return newState;
        }
        case UPDATE_COURSE: {
            let newState = {
                ...state,
                singleCourse: { ...state.singleCourse },
                categoryCourses: { ...state.categoryCourses },
                allCourses: { ...state.allCourses }
            };

            newState.singleCourse = { ...action.updatedCourse };
            newState.categoryCourses[action.updatedCourse.id] = { ...action.updatedCourse };
            newState.allCourses[action.updatedCourse.id] = { ...action.updatedCourse };

            return newState;
        }
        case DELETE_COURSE: {
            console.log("Hi")
            let newState = { ...state,
                singleCourse: {},
                categoryCourses: { ...state.categoryCourses },
                allCourses: { ...state.allCourses }
            };
            delete newState.categoryCourses[action.courseId];
            delete newState.allCourses[action.courseId];
            return newState;
        }
        default: {
            return state;
        }
    }
}

export default courseReducer;

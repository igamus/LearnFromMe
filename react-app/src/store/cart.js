// action types
const READ_CART = "learnfromme/courses/READ_CART";

// action creators
const readCartAction = courses => ({
    type: READ_CART,
    courses
});

// thunk action creators
export const readCartThunk = () => async dispatch => {
    const res = await fetch("/api/cart/");

    if (res.ok) {
        const data = await res.json();
        return dispatch(readCartAction(data));
    } else {
        const errors = await res.json();
        return errors;
    }
};


// reducer
const initialState = {};

function cartReducer(state = initialState, action) {
    switch(action.type) {
        case READ_CART: {
            let newState = {
                ...state,
            };
            action.courses.forEach(course => {
                newState[course.id] = course;
            });
            return newState;
        }
        default: {
            return state;
        }
    }
}

export default cartReducer;

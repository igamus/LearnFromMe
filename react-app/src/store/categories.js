// action types
const GET_CATEGORIES_LIST = "learnfromme/categories/GET_CATEGORIES_LIST";

// action creators
const getCategoriesAction = categories => ({
    type: GET_CATEGORIES_LIST,
    categories
});

// thunk action creators
export const getCategoriesThunk = () => async dispatch => {
    const res = await fetch("/api/category");

    if (res.ok) {
        const data = await res.json();
        return dispatch(getCategoriesAction(data));
    } else {
        const errors = await res.json();
        return errors;
    }
};

// reducer
const initialState = { };

function categoriesReducer(state = initialState, action) { // need to streamline; there's no way you should update every slice every time
    switch(action.type) {
        case GET_CATEGORIES_LIST: {
            const newState = { ...state };
            action.categories.forEach(
                category => newState[category.name] = category
            )
            return newState;
        }
        default: {
            return state;
        }
    }
}

export default categoriesReducer;

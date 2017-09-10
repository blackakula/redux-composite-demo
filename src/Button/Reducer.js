export const Reducer = (state, action) => {
    if (state === undefined) {
        return {clicked: false};
    }
    switch (action.type) {
        case 'CLICK':
            if (state.clicked === true) {
                throw {message: "The button is already clicked"};
            }
            return {clicked: true};
        case 'ENABLE':
            if (state.clicked === false) {
                throw {message: "The button is not clicked"};
            }
            return {clicked: false};
        default:
            return state;
    }
};

export default Reducer;

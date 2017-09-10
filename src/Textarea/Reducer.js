export const Reducer = (state, action) => {
    if (state === undefined) {
        return {
            todos: [],
            highlighted: false
        };
    }
    switch (action.type) {
        case 'ADD':
            return {
                todos: [...state.todos, action.todo],
                highlighted: true
            };
        case 'STOP':
            if (!state.highlighted) {
                return state;
            }
            return {
                ...state,
                highlighted: false
            };
        default:
            return state;
    }
};

export default Reducer;

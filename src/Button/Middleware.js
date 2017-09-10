export const Middleware = timeout => ({dispatch, getState}) => next => action => {
    let result = next(action);
    if (!getState().clicked) {
        return result;
    }
    const enable = () => dispatch({type: 'ENABLE'});
    if (timeout === 0) {
        return enable();
    }

    setTimeout(enable, timeout);
    return result;
};

export default Middleware;

export const Middleware = timeout => ({dispatch, getState}) => next => action => {
    let result = next(action);
    if (!getState().highlighted) {
        return result;
    }
    const stop = () => dispatch({type: 'STOP'});
    if (timeout === 0) {
        return stop();
    }

    setTimeout(stop, timeout);
    return result;
};

export default Middleware;

import Component from './Component';
import Composite from './Composite';
import {Redux} from 'redux-composite';

export const Builder = timeouts => {
    const composite = Composite(timeouts);
    return {
        composite,
        component: ({dispatch, getState, subscribe}) => {
            const addedTodo = [false, false, false];
            const redux = Redux(composite)({dispatch, getState, subscribe});
            const listener = (i, {redux: reduxObject}) => {
                if (reduxObject.getState().clicked && !addedTodo[i]) {
                    addedTodo[i] = true;
                    redux.textarea.redux.dispatch({type: 'ADD', todo: `Button ${i}`});
                } else if (!reduxObject.getState().clicked) {
                    addedTodo[i] = false;
                }
            };
            composite.subscribe(dispatch, getState, subscribe)({
                buttons: [
                    () => listener(0, redux.buttons[0]),
                    () => listener(1, redux.buttons[1]),
                    () => listener(2, redux.buttons[2]),
                ]
            });
            return Component(redux);
        }
    };
};

export default {Builder};

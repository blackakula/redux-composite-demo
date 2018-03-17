import Component from './Component';
import Composite from './Composite';
import {Redux} from 'redux-composite';

export const Builder = timeouts => {
    const composite = Composite(timeouts);
    return {
        composite,
        component: ({dispatch, getState, subscribe}) => {
            const redux = Redux(composite)({dispatch, getState, subscribe});
            const listener = i => ({getState}) => {
                if (getState().clicked) {
                    redux.textarea.redux.dispatch({type: 'ADD', todo: `Button ${i}`});
                }
            };
            composite.subscribe(dispatch, getState, subscribe)({
                buttons: [
                    listener(0),
                    listener(1),
                    listener(2),
                    ({getState}) => {
                        if (getState().clicked === false) {
                            redux.textarea.redux.dispatch({type: 'ADD', todo: `Button ${3}`});
                        }
                    }
                ]
            });
            return Component(redux, composite.memoize(getState));
        }
    };
};

export default {Builder};

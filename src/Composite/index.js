import Component from './Component';
import Composite from './Composite';
import {Redux, Memoize} from 'redux-composite';
import {Component as Button} from "../Button";

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
                    listener(2)
                ]
            });
            const buttonCss = {
                display: 'block',
                marginTop: '3px'
            };
            return Component(Memoize(composite, getState), [0, 1, 2].map(index => Button(`Button (${index} sec)`, buttonCss)(redux.buttons[index].redux)));
        }
    };
};

export default {Builder};

import Component from './Component';
import Composite from './Composite';
import {Component as Button} from "../Button";

export const Builder = timeouts => {
    const composite = Composite(timeouts);
    return {
        composite,
        component: store => {
            composite.init(store)
            const buttonKeys = Object.keys(timeouts.buttons);
            const listener = i => ({getState}) => {
                if (getState().clicked) {
                    composite.store.textarea.dispatch({type: 'ADD', todo: `Button ${i}`});
                }
            };
            composite.subscribe({
                buttons: buttonKeys.map(key => listener(key))
            });
            const buttonCss = {
                display: 'block',
                marginTop: '3px'
            };
            return Component(composite.memoize, buttonKeys.map(index => Button(`Button (${index} sec)`, buttonCss)(composite.store.buttons[index])));
        }
    };
};

export default {Builder};

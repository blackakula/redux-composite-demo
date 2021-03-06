import {applyMiddleware,compose} from 'redux';
import {Composite, Listeners, Component} from './Composite';
import {render} from 'react-dom';
import * as React from 'react';
import {Component as Button} from "./Button";
import {Structure} from 'redux-composite';

export const application = () => {
    const buttons = (timeouts, css) => timeouts.map(timeout => Button(`Button (${Math.round(timeout/100)/10} sec)`, css))

    const timeouts = [
        {textarea: 100, buttons: [0, 1120, 2000]},
        {textarea: 100, buttons: [1703, 0]}
    ];
    let composite = Structure(timeouts.map(compositeTimeouts => Composite(compositeTimeouts)));
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    let store = composite.createStore()(r => r, m => composeEnhancers(applyMiddleware(m)));

    const unsubscribe = Object.keys(timeouts).map(i => composite.subscribe(Object.keys(timeouts).map(key => key === i ? Listeners(composite.store[i].store) : undefined)))
    const CompositeComponent = composite.memoize({
        memoize: ({structure, ...rest}) => <div>
            {structure.map((memoized, i) => (Component => <Component key={i}/>)(memoized.memoize))}
        </div>,
        structure: timeouts.map(compositeTimeouts => Component(buttons(compositeTimeouts.buttons, {
            display: 'block',
            marginTop: '3px'
        }), {
            float: 'left',
            marginRight: '10px'
        }))
    }).memoize;
    // Additional behavior to stop after 3 "todos"

    // Variant #1
    // composite.store[1].structure.textarea.subscribe(({getState}) => {
    //     if (getState().todos.length === 3) {
    //         unsubscribe[1]()
    //     }
    // })

    // Variant #2
    composite.store[1].store.subscribe({
        textarea: ({getState}) => {
            if (getState().todos.length === 3) {
                unsubscribe[1]()
            }
        }
    })

    // Variant #3
    // composite.subscribe([
    //     ,
    //     {
    //         textarea: ({getState}) => {
    //             if (getState().todos.length === 3) {
    //                 unsubscribe[1]()
    //             }
    //         }
    //     }
    // ])
    const compositeRender = ({getState}) => render(
        <CompositeComponent {...getState()}/>,
        document.getElementById('root')
    );

    composite.subscribe(compositeRender);
    compositeRender({getState: composite.getState});
};

application();

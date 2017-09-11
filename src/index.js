import {createStore, applyMiddleware,compose} from 'redux';
import {Builder} from './Composite/index';
import {Reducer as TextareaReducer} from './Textarea/index';
import {Reducer as ButtonReducer} from './Button/index';
import {render} from 'react-dom';
import * as React from 'react';

export const application = () => {
    const builder = Builder({textarea: 100, buttons: [0, 1000, 2000]});
    let store = createStore(
        builder.composite.reducer,
        {
            textarea: TextareaReducer(),
            buttons: [
                ButtonReducer(),
                ButtonReducer(),
                ButtonReducer()
            ]
        },
        compose(
          applyMiddleware(builder.composite.middleware),
          window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );
    const CompositeComponent = builder.component(store);

    const compositeRender = () => render(
        <CompositeComponent {...store.getState()}/>,
        document.getElementById('root')
    );

    store.subscribe(compositeRender);
    compositeRender();
};

application();

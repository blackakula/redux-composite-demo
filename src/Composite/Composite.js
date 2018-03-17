import {Structure, Composite as ReduxComposite} from 'redux-composite';
import {Reducer as TextareaReducer, Middleware as TextareaMiddleware} from '../Textarea/index';
import {Reducer as ButtonReducer, Middleware as ButtonMiddleware} from '../Button/index';

// For Redux Async
import AsyncReducer from '../ReduxAsync/reducers';
import thunk from 'redux-thunk';

export const Composite = timeouts => {
    const textarea = ReduxComposite({
        reducer: TextareaReducer,
        middleware: TextareaMiddleware(timeouts.textarea)
    });
    const buttons = timeouts.buttons.map(timeout => ReduxComposite({
        reducer: ButtonReducer,
        middleware: ButtonMiddleware(timeout)
    }));
    const async = ReduxComposite({
        reducer: AsyncReducer,
        middleware: thunk
    });
    return Structure({
        textarea,
        buttons,
        async
    });
};

export default Composite;

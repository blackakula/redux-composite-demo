import {Structure, Composite as ReduxComposite} from 'redux-composite';
import {Reducer as TextareaReducer, Middleware as TextareaMiddleware} from '../Textarea/index';
import {Reducer as ButtonReducer, Middleware as ButtonMiddleware} from '../Button/index';

export const Composite = timeouts => {
    const textarea = ReduxComposite({
        reducer: TextareaReducer,
        middleware: TextareaMiddleware(timeouts.textarea)
    });
    const buttons = timeouts.buttons.map(timeout => ReduxComposite({
        reducer: ButtonReducer,
        middleware: ButtonMiddleware(timeout)
    }));
    return Structure({
        textarea,
        buttons
    });
};

export default Composite;

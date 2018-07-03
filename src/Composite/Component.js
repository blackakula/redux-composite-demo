import {Component as textarea} from '../Textarea';
import * as React from 'react';

export const Component = (buttons, css = {}) => ({
    memoize: ({structure}) => {
        const Textarea = structure.textarea;
        return (<div style={css}>
            <Textarea/>
            <div>
                {structure.buttons.map((Button, i) => <Button key={i}/>)}
            </div>
        </div>)
    },
    structure: {
        textarea,
        buttons
    }
})

export default Component;

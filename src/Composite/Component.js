import {Component as Textarea} from '../Textarea/index';
import {Component as Button} from '../Button/index';
import * as React from 'react';

export const Component = (memoize, buttons) => {
    return memoize({
        memoize: ({structure}) => {
            const Textarea = structure.textarea;
            return (<div>
                <Textarea/>
                <div>
                    {structure.buttons.map((Button, i) => <Button key={i}/>)}
                </div>
            </div>)
        },
        structure: {
            textarea: ({getState}) => <Textarea {...getState()}/>,
            buttons: buttons.map(Button => ({getState}) => <Button {...getState()}/>)
        }
    }).memoize
};

export default Component;

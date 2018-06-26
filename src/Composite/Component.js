import {Component as Textarea} from '../Textarea';
import {Component as Button} from '../Button';
import * as React from 'react';

export const Component = ({dispatch, getState}) => {
    const buttonCss = {
        display: 'block',
        marginTop: '3px'
    };
    const buttonsKeys = Object.keys(getState().buttons);
    const buttons = buttonsKeys
        .map(key => Button(`Button (${key} sec)`, buttonCss)({dispatch: action => dispatch({
                type: 'COMPOSITE', composite: {
                    buttons: buttonsKeys.map(buttonKey => buttonKey === key ? action : undefined)
                }
        })})).map(Button => ({getState}) => <Button {...getState()}/>)
    return memoize => memoize({
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
            buttons
        }
    }).memoize
}

export default Component;

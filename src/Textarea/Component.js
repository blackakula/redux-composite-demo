import * as React from 'react'

export const Component = ({highlighted, todos}) => {
    return <textarea
        rows="30"
        style={{backgroundColor: highlighted ? '#AFDFAF' : 'white'}}
        readOnly="true"
        value={todos.join("\r\n")}
    ></textarea>;
};

export default Component;

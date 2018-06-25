import * as React from 'react'

export const Component = ({highlighted, todos}) => <textarea
    rows="25"
    cols="30"
    style={{backgroundColor: highlighted ? '#AFDFAF' : 'white'}}
    readOnly="true"
    value={todos.join("\r\n")}
></textarea>;

export default Component;

import React, { useState, useReducer } from 'react';
import './cell.css';

export default function Cell(props){

    const [text, switchText] = useState('');

    function toggle() {
        console.log('вызвалось');
        switchText(text === ''? 'x': '')
    }

    return (
        <td className={text} onClick={toggle}>
            {text}
        </td>
    )
}
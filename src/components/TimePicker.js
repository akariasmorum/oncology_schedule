import React from 'react';
import TimePicker from 'rc-time-picker';
import './timepicker.css';

export default function TimePickerDialog(props){    
    const show=props.show;

    return show ? 
        (
        <div className='timepickerdialog'>
            <TimePicker
                showSecond={false}
                defaultValue={props.time}
                className="xxx"
                onChange={(val) => props.onChange(val)}
                format={"hh:mm"}
            /> 
            <button onClick={props.onClose}>x</button>
        </div>    
        ) : <></>
}
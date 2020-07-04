import React from 'react';

export default function TimeDeltaPicker(props){
    return (
            <select value={props.minutes} onChange={props.onChange}>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="30">30</option>
                 <option value="60">60</option>
            </select>
        );
    }
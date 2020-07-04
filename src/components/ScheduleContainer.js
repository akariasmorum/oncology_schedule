import React from 'react';
import ScheduleComposer from './Schedule.js';
import TimeDeltaPicker from './TimeDeltaPicker.js';

export default class ScheduleContainer extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            delta: 10
        }
    }

    handleTimeDeltaChange(event){
        const value = event.target.value;
        //console.log('timeDeltaChange\n' +value)
        this.setState({
            delta: value
        });
    }

    render(){
        //console.log('ScheduleContainer Render \n' + this.state.delta);
        return(
            <>  
                <TimeDeltaPicker delta={this.state.delta} onChange={(event) =>this.handleTimeDeltaChange(event)}/>
                <ScheduleComposer delta={this.state.delta}/>
            </>    
        )
    }


}
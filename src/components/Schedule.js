import React from 'react';
import TimePickerDialog from './TimePicker.js';
import ReactDOM from 'react-dom';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import './Schedule.css';
import AddMedicineModal from './addMedicineModal.js';
import Button from 'react-bootstrap/Button';
import LogLifecyle from 'react-log-lifecycle';
import Cell from './Cell.js';

const flags = {
    // If logType is set to keys then the props of the object being logged
    // will be written out instead of the whole object. Remove logType or 
    // set it to anything except keys to have the full object logged.
    logType: 'keys',
    // A list of the param "types" to be logged.
    // The example below has all the types.
    names: ['props', 'nextProps', 'nextState', 'prevProps', 'prevState']
  };

export default class Schedule extends React.Component{

    constructor(props){
        super(props);
        //console.log('Schedule constructor props\n' + props.delta);
        this.state = {
            min_date: moment().hour(11).minutes(15),
            max_date: moment().hour(14).minutes(45),
            min_show: false,
            max_show: false,
            addNewMedicine: false,
            rows: [],
        } 
        //console.log('Schedule constructor \n' + this.state.delta);     
    }

    create_table_timing(min_date, max_date, delta){
        //console.log('Schedule create_table_timing \n' + delta);
        let time_headers=[""];
        let current_time = min_date.clone();
        while(current_time<max_date){
            time_headers.push(current_time.format('HH:mm'));
            current_time = current_time.add(delta, 'minutes');
        }
        time_headers.push(max_date.format('HH:mm'));
        return time_headers;         
    }

    create_table_header(min_date, max_date, delta){
        //console.log('Schedule create_table_header \n' + delta);
        let timings = this.create_table_timing(min_date, max_date, delta);
        
        let tr = [];
        for(var i=2; i<timings.length-1;i++){
            tr.push(<th>{timings[i]}</th>);
        } 
        return (<thead>
                    <tr>
                    <th></th>    
                        <th>
                            <span onClick={()=>this.handleMinTimeClick()}>{this.state.min_date.format('HH:mm')}</span>
                            <div className ='timePickerContainer'>
                                <TimePickerDialog
                                    className = 'timepickerdialog'
                                    show = {this.state.min_show}
                                    time = {this.state.min_date}
                                    onChange = {(val) => this.handleMinDateChange(val)}
                                    onClose = {() => this.handleMinTimeClose()}
                                />
                            </div>
                        </th>                                
                        {tr}
                        <th>
                            <span onClick={()=>this.handleMaxTimeClick()}>{this.state.max_date.format('HH:mm')}</span>
                            <div className ='timePickerContainer'>
                                <TimePickerDialog
                                    className = 'timepickerdialog'
                                    show = {this.state.max_show}
                                    time = {this.state.max_date}
                                    onChange = {(val) => this.handleMaxDateChange(val)}
                                    onClose = {() => this.handleMaxTimeClose()}
                                />
                            </div>
                        </th>    
                    </tr>        
                </thead>);
    }

    handleMinTimeClick(){
        this.setState({
            min_show: true,
        });
    }

    handleMinTimeClose(){
        this.setState({
            min_show: false,
        });
    }

    handleMaxTimeClick(){
        this.setState({
            max_show: true
        });
    }

    handleMaxTimeClose(){
        //console.log('Зашел');
        this.setState({
            max_show: false,
        });
    }
    

    formatTableDate(date){
        //console.log(date);
        var formatter = new Intl.DateTimeFormat('ru', {
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',            
            hour12: false,
            fractionalSecondDigits: 3,
          });

        return formatter.format(date.getTime());
    }

    handleMinDateChange(value){
        this.setState({
            min_date: value
        })
    }
    handleMaxDateChange(value){
        this.setState({
            max_date: value
        })
    }

    showAddMedicine(){
        this.setState({
            addNewMedicine: true
       });
    }

    hideAddMedicine(){
        this.setState({
            addNewMedicine: false,
        })
    }
    
    addMedicine(medicine){      
        this.setState({
            addNewMedicine: false,
            rows: this.state.rows.concat([medicine]),            
       });
    }

    createBody(){        
        let rows = [];
        //difference between max_date and min_date in minutes
        const time_difference = moment.duration(this.state.max_date.diff(this.state.min_date)).asMinutes()
        for(var i=0; i<this.state.rows.length; i++){
            
            let row = [];
            row.push(<th>{this.state.rows[i]}</th>);
            for(var j=0;j<=Math.ceil(time_difference / this.props.delta); j++)
                row.push(<Cell />);
            
            rows.push(<tr>{row}</tr>);
        }
        //console.log(rows);
        return <tbody>{rows}</tbody>;
    }

    render(){
        //console.log('Schedule render \n' + this.state.delta);
        return (
            <div>
                <table className='schedule'>
                    {this.create_table_header(this.state.min_date, this.state.max_date, this.props.delta)}
                    {this.createBody()}
                </table>
                <Button onClick={() => this.setState({addNewMedicine: true})}>Добавить препарат</Button>
                <AddMedicineModal 
                    show={this.state.addNewMedicine} 
                    onSubmit={(medicine) => this.addMedicine(medicine)}
                    onClose={(medicine) => this.hideAddMedicine(medicine)}
                />
            </div>    
        )
    }
}
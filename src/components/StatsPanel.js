import {useState,useEffect} from 'react';
import '../styles/App.css'

function StatsPanel(props){

    return (
        <div className='stats-panel'>
            {props.name} is: {props.temp} ˚C
        </div>
    );

}

export default StatsPanel
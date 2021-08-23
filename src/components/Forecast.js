import {useState,useEffect} from 'react';
import '../styles/App.css'


function Forecast(props){
    const[dayValue,setDayValue]=useState('')

    function dateConversion(timestamp){
        console.log('inside dateConversion')
        let date_text  = new Date(timestamp*1000)
        let month=date_text.getMonth()+1
        let day=date_text.getDate()

        return month+'/'+day
    }

    useEffect(()=>{
        
        setDayValue(dateConversion(props.date))
        console.log(dayValue)
    },[])


    return(
        <div className='forecast-panel'>
            <div className='top'>{dateConversion(props.date)}</div>
            <div className='bottom'>{Math.floor(props.info-273.15)}˚C</div>
        </div>
    )
}

export default Forecast
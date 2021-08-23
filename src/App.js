
import './styles/App.css';
import {useState,useEffect} from 'react';
import Tracker from './services/Tracker'
import StatsPanel from './components/StatsPanel'
import Forecast from './components/Forecast'

function App() {
  const[cityState,setCityState]=useState([])
  const[cityName,setName]=useState('')
  const[maxT,setMaxT]=useState(0)
  const[minT,setMinT]=useState(0)
  const[meanT,setMeanT]=useState(0)
  const[modeT,setModeT]=useState(0)
  const[fiveDayForeCast,setFiveDay]=useState([])

  useEffect(()=>{

    if(cityState.length>0){
      let lastElement = cityState.length-1
      
      //get the last element of the cityState array
      let new_city = cityState[lastElement]
      console.log(new_city)
      setName(new_city.city)
      setMaxT(new_city.showMax())
      setMinT(new_city.showMin())
      setMeanT(new_city.showMean())
      setModeT(new_city.showMode())
      setFiveDay(new_city.fiveDay())
      console.log(maxT)
      console.log(minT)
      console.log(meanT)
      console.log(modeT)
      console.log(fiveDayForeCast)
      
    }
  },[cityState,maxT])

  async function dataParsing(geo_info){
    //normally we store this in .env
    let api_key = '2357e9d6edbc1dca9778ffaae19a1bf0'
    let city = geo_info.city
    let state = geo_info.state
    let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}`
    let response = await fetch(url,{
      method:'GET'
    })
    return await response.json()
}

  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log('Inside handleSubmit')
    setCityState([])
    let city_name = e.target.city.value
    let state_name = e.target.state.value
    
    if(state_name.length===0 || city_name.length===0){
      alert('Please provide enough information.')
    }else{
      //create an instance of the object here
      let geo_info = {
        city:city_name,
        state:state_name
      }
      dataParsing(geo_info).then((res)=>{
        //an Array of 40 elements in it
        let weather_collection = res.list

        //create an Instance of Tracker class, and store it in the cityState
        let weather_tracker = new Tracker(geo_info.city,geo_info.state,weather_collection)
        setCityState(cityState.concat(weather_tracker))
      }).catch((err)=>{

        //neglect error handling for now
        console.log(err)
      })
    }
  
  }

  return (
    <div className="App">
        <h2>Open Weather App</h2>
        <div className='user-ui-container'>
          <form className='user-ui'onSubmit={(e)=>handleSubmit(e)}>
            <label>City:</label>
            <input type='text' name='city'></input>
            <label>State</label>
            <input type='text' name='state'></input>
            <button>Submit</button>
          </form>
        </div>
        <div className='info-panel'>
            {cityState.length===0 && <div><p>No information Provided</p></div>}
            {cityState.length>0&&
              <div className='tracker-panel'>
                <h4>5 Day Weather Stats for {cityName}:</h4>
                <StatsPanel name={'Minimum Temp'} temp={minT}/>
                <StatsPanel name={'Maximum Temp'} temp={maxT}/>
                <StatsPanel name={'Mean Temp'} temp={meanT}/>
                <StatsPanel name={'Mode Temp'} temp={modeT}/>
                <h4>5 Day Weather Forecast for {cityName}:</h4>
                <div className='forecast-container'>
                    {fiveDayForeCast.map((item,key)=>{
                      return <Forecast date={item.dt}info={item.main.temp}/>
                    })}
                </div>
              </div>}
        </div>
    </div>
  );
}

export default App;

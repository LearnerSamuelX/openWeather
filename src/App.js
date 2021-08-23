
import './styles/App.css';
import {useState,useEffect} from 'react';
import Tracker from './services/Tracker'

function App() {
  const[cityState,setCityState]=useState([])

  const[maxT,setMaxT]=useState(0)
  const[minT,setMinT]=useState(0)




  useEffect(()=>{

    if(cityState.length>0){
      let lastElement = cityState.length-1
      
      //get the last element of the cityState array
      let new_city = cityState[lastElement]
      console.log(new_city)
      let highestT = new_city.showMax()
      let lowestT = new_city.showMin()
      let meanT = new_city.showMean()
      let modeT = new_city.showMode()
      console.log(highestT)
      console.log(lowestT)
      console.log(meanT)
      console.log(modeT)
      
      
    }
  },[cityState])

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

        </div>
    </div>
  );
}

export default App;

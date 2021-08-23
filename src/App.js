
import './styles/App.css';
import {useState,useEffect} from 'react';

function App() {
  const[cityState,setCityState]=useState([])

  async function dataParsing(geo_info){
    //normally we store this in .env
    let api_key = '2357e9d6edbc1dca9778ffaae19a1bf0'
    let city = geo_info.city
    let state = geo_info.state
    let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}`
    let response = await fetch(url,{
      method:'GET'
    })
    let weather_info = await response.json()
    return weather_info
}

  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log('Inside handleSubmit')
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

        //get access to tempeature: weather_collection[i].main.temp (.temp_max / temp_min)
        console.log(weather_collection[0].main.temp)
      }).catch((err)=>{
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

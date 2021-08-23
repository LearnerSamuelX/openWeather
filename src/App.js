
import './styles/App.css';
import {useState,useEffect} from 'react';


function App() {
  return (
    <div className="App">
        <h2>Open Weather App</h2>
        <div className='user-ui-container'>
          <form className='user-ui'>
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

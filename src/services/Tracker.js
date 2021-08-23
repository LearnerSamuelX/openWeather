class Tracker{
    constructor(city,state,weather){
        this.city=city
        this.state=state
        this.weather=weather
        
    }
    //this.weather is an Array of 40 elements
    //get access to tempeature: weather_collection[i].main.temp (.temp_max / temp_min)
    showMax(){
        console.log('Inside showMax()')
        let weather_collection = this.weather
        let highest = -99
        for(let i=0;i<weather_collection.length;i++){
            // console.log(weather_collection[i].main.temp_max)
            if(weather_collection[i].main.temp_max>highest){
                highest = weather_collection[i].main.temp_max
            }
        }
        return Math.floor(highest-273.15)
    }

    showMin(){
        console.log('Inside showMin()')
        let weather_collection = this.weather
        let lowest = 999
        for(let i=0;i<weather_collection.length;i++){
            if(weather_collection[i].main.temp_min<lowest){
                lowest = weather_collection[i].main.temp_min
            }
        }
        return Math.floor(lowest-273.15)
    }

    showMean(){
        console.log('Inside showMean()')
        let weather_collection = this.weather
        let total = 0
        for (let i=0;i<weather_collection.length;i++){
            total = total + weather_collection[i].main.temp
        }

        return Math.floor(total/weather_collection.length-273.15)
    }

    showMode(){
        //is the value that appears most often in a set of data values
        console.log('Inside showMode()')
        let temp_dict = {}
        let weather_collection = this.weather
        let highest = 0
        let mode_result = 0
        for (let i=0;i<weather_collection.length;i++){
            let temp = weather_collection[i].main.temp
            if(!temp_dict[temp]){
                temp_dict[temp] = 1
            }else{
                temp_dict[temp] = temp_dict[temp]+1
            }
        }

        for (let j=0;j<weather_collection.length;j++){
            let temp = weather_collection[j].main.temp
            if(temp_dict[temp]>=highest){
                highest = temp_dict[temp]
                mode_result = temp
            }
        }

        return Math.floor(mode_result-273.15)

    }
}

export default Tracker
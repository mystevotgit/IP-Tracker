import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [input, setInput] = useState("");
  const [text, setText] = useState(input);
  const [data, setData] = useState([]);
  
  function handleSubmit(e) {
    e.preventDefault();
    setText(input);
    console.log(text);
  }
  
  const api = "https://geo.ipify.org/api/v1?apiKey=at_LiGqZ4wuXR3UoGUUCLa6dd5CB8UjE&ipAddress=" + text;

  useEffect(() => {
    async function getData() {
      const result = await axios(api);
      setData(result.data)
    }
    getData()
  }, [text]);

  return (
    <>
      <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={input} onChange={e=> setInput(e.target.value)}/>
                <input type="submit" value="Track" />
            </form>
      </div>
      <div>
      <p>IP ADDRESS: {data.ip}  LOCATION: {data.location?.city}, {data.location?.country}   {data.location?.postalCode}   TIMEZONE: UTC {data.location?.timezone}   ISP: {data.isp}</p>  
      </div>
      <div>

        IP Address Tracker

        Search for any IP address or domain

        {/* IP Address
        Location
        Timezone
          UTC add offset value dynamically using the API
        ISP */}
        
        <div className="attribution">
          Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
          Coded by <a href="https://github.com/mystevotgit">Olatunji Oye</a>.
        </div>
      </div>
    </>
  );
}

export default App;

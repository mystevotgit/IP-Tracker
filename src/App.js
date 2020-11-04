import React, {useEffect, useState} from 'react';
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import pattern from './pattern-bg.png'
import axios from 'axios';
import Data from './Data';
import "./App.css";


export default function App() {
  const [input, setInput] = useState("");
  const [text, setText] = useState(input);
  const [ip, setIp] = useState("");
  const [domain, setDomain] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState([]);
  const [loc, setLoc] = useState([45.4, -75.7]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [error, setError] = useState(null);
  function handleSubmit(e) {
    e.preventDefault();
    setText(input);
    const ipregex = "((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))";
    const domainregex = "(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]"
    const emailregex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (input.match(ipregex)) {
      setIp(input);
      setEmail("");
      setDomain("");
    }else if(input.match(emailregex)){
      setIp("");
      setEmail(input);
      setDomain("");
    }else if (input.match(domainregex)) {
      setIp("");
      setEmail("");
      setDomain(input);
    }
    
  }
  const api = "https://geo.ipify.org/api/v1?apiKey=at_LiGqZ4wuXR3UoGUUCLa6dd5CB8UjE&ipAddress=" + ip +"&domain=" + domain + "&email=" + email;
  useEffect(() => {
    async function getData() {
      try{
        const result = await axios(api);
        setData(result.data);
        setError(null)
        setLoc([result.data.location?.lat, result.data.location?.lng])
      }catch( {response:{data}} ){
        setError(data);
      }
    }
    getData()
  }, [text]);
  return (
    <div>
      <div className="top-container">
      <h1 className="title">IP Address Tracker</h1>
      <h5 className="subtitle" >Get an IP location (e.g 8.8.8.8 or google.com or your email). Default IP is your current network IP.</h5>
        <form className="top-form" onSubmit={handleSubmit}>
          <label for input ></label>
          <input id="input" className="input" type="text" placeholder="Enter an IP, website or email address" value={input} onChange={e=> setInput(e.target.value)}/>
          <input className="submit" type="submit" value="  >  " />
        </form>
        <h3 className="error" >{error?.messages}</h3>
        <img className="top-image" src={pattern} alt="Logo"/>
        <div className="display">
          <Data title = "CURRENT IP ADDRESS" info = {data.ip} />
          <Data title = "LOCATION" info = {data.location?.city +', ' + data.location?.country +' '+ data.location?.postalCode}/>
          <Data title = "TIMEZONE" info = {"UTC " + data.location?.timezone} />
          <Data title = "ISP" info = {data.isp} />
        </div>
      </div>
      <Map center={loc} zoom={13}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
          <Marker onMouseOver={()=>setShowPopUp(true)} onMouseOut={()=>setShowPopUp(false)} position={[loc[0], loc[1]]}/>
          {
    
          showPopUp && (<Popup position={[loc[0], loc[1]]}>
            <div>
              <p>{data.as?.domain}</p>
              <p>{data.location?.region}</p>
            </div>
          </Popup>)
    
          }
      </Map>
    </div>
  );
}
import './App.css';
// import ColoredLine from './components/ColoredLine.js'
import EntryField from './components/EntryField'
import EntryField2 from './components/EntryField2ElectricBoogalo'
import EntryField3 from './components/EntryField3ReturnOfTheSith'
import MapContainer from './components/Maps'
import SearchLocationInput from './components/SearchLocationInput'
import {useEffect, useState} from "react";
// import geocodingConvert from './scripts/geocoding'
// import geocodingConvert from './scripts/geocoding'
import submit from './scripts/submit'
import axios from "axios";
 

function App() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [query, setQuery] = useState("");
  const [markers, setMarkers]= useState([])



    useEffect(() => {
        axios.get("http://34.122.178.86/api/markers")
        .then(res => {
            setMarkers(res.data)
            console.log(markers);
        })
    });

  return (
    <div className="App">
      <header className="title">
        <p>
          Trash-Stash
        </p>
      </header>
      <div className="Body">
        <div className="MapHolder">
          <MapContainer/>
        </div>
      </div>
      <div className="Label">Add a new drop-off point!</div>
      <div className="EntryHolder">
        <div className="EntryFieldGen">
        <input
          type="text"
          onChange={event => setName(event.target.value)}
          placeholder="Name"
        />
      </div>
        <div className="EntryFieldDes">
        <input
          type="text"
          onChange={event => setDescription(event.target.value)}
          placeholder="Description"
        />
      </div>
        {/*<EntryField3/>*/}
        <SearchLocationInput
          setQuery={setQuery}
          query={query}
        />
        <button
          onClick={()=> {submit(query, name, description)}}
        >Submit</button>
      </div>
    </div>
  );
}

export default App;

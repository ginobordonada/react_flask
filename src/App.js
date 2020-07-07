import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {HorizontalBar} from 'react-chartjs-2';
import './App.css';
const initial_data = {
  labels: [],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: []
    }
  ]
};

function App() {
  const [fileInput, setFileInput] = useState(0);
  const [loadData, setLoadData] = useState(false);
  const [data, setData] = useState(initial_data);

  function parseJson(event) {
    let file =  event.target.files[0]
    const formData = new FormData();
    setLoadData(false)
    formData.append(
        "json",
        file,
        file.name
    );
    fileInput.value = "";
    axios.post("http://localhost:5000/api/parse_json", formData, {}).then(resp => {
        initial_data['labels'] = resp.data['keys'];
        initial_data['datasets'][0]['data'] = resp.data['values'];
        setData(initial_data)
        setLoadData(true)
    });
  }
  return (
    <div className="App">
        <div className="head">
            Web Usage Analyzer
        </div>
        <div className='upload'>
            <input type='file' onChange={(e) => parseJson(e)} ref={ref=> setFileInput(ref)}/>
        </div>
        {
            loadData && (
                <div className="chart">
                    <HorizontalBar data={data} redraw/>
                </div>
            )
        }

    </div>
  );
}

export default App;

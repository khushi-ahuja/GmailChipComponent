import React, { useState } from 'react';
import './App.css';
import ChipComponent from './ChipComponent';
import ChipComponentTsx from './ChipComponent.tsx';


function App() {
  const [isTsxFile, setTsxFile] = useState(true)
  return (
    <div>
      <h2 className={`blue textCenter`}>Pick User ( 
        <label className='pointer fontS labelGrey bold'>
          <input type='checkbox' onChange={ () => setTsxFile(!isTsxFile)} checked={isTsxFile} /> Project using TypeScript
        </label> ) 
      </h2>
      {
        isTsxFile ?
        <ChipComponentTsx /> : 
        <ChipComponent />
      }
    </div>
  );
}

export default App;

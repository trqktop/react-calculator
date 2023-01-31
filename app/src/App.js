
import './App.css';
import { Calculator } from './components/Calculator/Calculator';
import React, { useEffect, useState } from 'react';
import {CtxProvider} from './components/CtxProvider/CtxProvider'
function App() {
  return (
    <div className="App">
      <main className="App-main">
        <CtxProvider>
          <Calculator />
        </CtxProvider>
      </main>
    </div>
  );
}

export default App;

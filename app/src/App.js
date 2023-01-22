
import './App.css';
import { Calculator } from './components/Calculator/Calculator';
import React, { useEffect } from 'react';

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
export const Ctx = React.createContext()



function calculate(prev, cur, sign, changeDisplayedNum) {
  const num_prev = Number(prev)
  const num_curr = Number(cur)
  let result = null
  switch (sign) {
    case '/':
      result = (num_prev / num_curr).toString()
      changeDisplayedNum(result)
      break
    case '-':
      result = (num_prev - num_curr).toString()
      changeDisplayedNum(result)
      break
    case '+':
      result = (num_prev + num_curr).toString()
      changeDisplayedNum(result)
      break
    case '*':
      result = (num_prev * num_curr).toString()
      changeDisplayedNum(result)
      break
  }
  // }
}




function CtxProvider(props) {
  const [displayedNum, changeDisplayedNum] = React.useState('');
  const [numSimbolStorage, changeNumSimbolStorage] = React.useState({ prev: '', curr: '' });
  const [mathSignStorage, changeMathSignStorage] = React.useState({ prev: '', curr: '' });
  const [isCalculate, isCalculateState] = React.useState(false)

  useEffect(() => {
    if (isCalculate) {
      const sign = mathSignStorage.curr;
      const nums = displayedNum.split(sign)
      const num_1 = nums[0]
      const num_2 = nums[1]
      calculate(num_1, num_2, sign, changeDisplayedNum)
      changeMathSignStorage(p => ({ prev: '', curr: '' }))
      changeNumSimbolStorage(p => ({ prev: '', curr: '' }))
      isCalculateState(false)
    }
  }, [isCalculate])

  useEffect(() => {
    changeDisplayedNum(p => p + numSimbolStorage.curr)
  }, [numSimbolStorage])

  useEffect(() => {
    if (mathSignStorage.curr && !mathSignStorage.prev) {
      changeDisplayedNum(p => p + mathSignStorage.curr)
    }
    if (mathSignStorage.curr && mathSignStorage.prev) {
      if (mathSignStorage.curr !== mathSignStorage.prev) {
        changeDisplayedNum(p => p.replace(mathSignStorage.prev, mathSignStorage.curr))
      }
    }


  }, [mathSignStorage])

  return <Ctx.Provider value={{
    changeNumSimbolStorage,
    changeMathSignStorage, displayedNum,
    isCalculateState
  }}>{props.children}</Ctx.Provider>
}
export default App;

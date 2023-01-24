
import './App.css';
import { Calculator } from './components/Calculator/Calculator';
import React, { useEffect, useState } from 'react';

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


function calculate(prev, cur, sign) {
  const num_prev = Number(prev)
  const num_curr = Number(cur)
  let result = null
  switch (sign) {
    case '/':
      result = (Math.round(`${(parseFloat(num_prev) / parseFloat(num_curr)) * 1000}`) / 1000).toString()
      break
    case '-':
      result = (Math.round(`${(parseFloat(num_prev) - parseFloat(num_curr)) * 1000}`) / 1000).toString()
      break
    case '+':
      result = (Math.round(`${(parseFloat(num_prev) + parseFloat(num_curr)) * 1000}`) / 1000).toString()
      break
    case '*':
      result = (Math.round(`${(parseFloat(num_prev) * parseFloat(num_curr)) * 1000}`) / 1000).toString()
      break
    default:
      break;
  }
  return result
}

function CtxProvider(props) {
  const [displayedValue, changeDisplayedValue] = React.useState('');
  const [numeralStorage, changeNumeralStorage] = React.useState({ prev: null, curr: '' });
  const [symbStorage, changeSimbStorage] = React.useState({ prev: null, curr: '' });
  const [isPaused, setPause] = React.useState(true)
  const [isCalculate, setCalculate] = React.useState(false)
  // const [numberStorage, setNumberStorage] = React.useState('');
  const [isDote, setDotState] = React.useState(true)
  useEffect(() => {
    const num = numeralStorage.curr
    if (num === '.') {
      if (isDote) {
        setDotState(false)
        changeDisplayedValue(p => p + num)
      }
    }
    else {
      changeDisplayedValue(p => p + num)
      setPause(false)
    }
  }, [numeralStorage])

  useEffect(() => {
    const sign = symbStorage.curr
    const signPrev = symbStorage.prev
    const isValue = !!numeralStorage.curr
    const rgxp = /(\+|\-|\/|\*)$/
    if (isValue && isPaused) {
      if (sign !== signPrev) {
        changeDisplayedValue(p => p.replace(rgxp, sign))
      }
    }
    else {
      if (displayedValue.length < 0 || sign == '-')
        changeDisplayedValue(p => p + sign)
      else if (displayedValue.length > 0) {
        changeDisplayedValue(p => p + sign)
      }
      setDotState(true)
      setPause(true)
    }

    const nums = displayedValue.split(signPrev)
    const num_1 = nums[0]
    const num_2 = nums[1]
    if (num_1, num_2) {
      const result = calculate(num_1, num_2, signPrev, changeDisplayedValue)
      if (result && !isNaN(result)) {
        changeDisplayedValue(result + sign)
        setDotState(true)
      }
    }
  }, [symbStorage])

  useEffect(() => {
    if (isCalculate) {
      const sign = symbStorage.curr
      const nums = displayedValue.split(sign)
      const num_1 = nums[0]
      const num_2 = nums[1]
      const result = calculate(num_1, num_2, sign, changeDisplayedValue)
      if (result && !isNaN(result)) {
        changeDisplayedValue(result)
      }
      setCalculate(false)
    }
  }, [isCalculate])


  // const [mathSignStorage, changeMathSignStorage] = React.useState({ prev: '', curr: '' });
  // const [dotSignStorage, changeDotSignStorage] = React.useState({ prev: '', curr: '', isResult: false });
  // const [isCalculate, isCalculateState] = React.useState(false)
  // const [delState, setDelState] = React.useState({
  //   symb: ''
  // })
  // useEffect(() => {
  //   if (delState.symb === 'C') {
  //     changeMathSignStorage({ prev: '', curr: '' })
  //     changeDotSignStorage({ prev: '', curr: '', isResult: false })
  //     changeDisplayedNum('')
  //   }
  //   if (delState.symb === '<') {
  //     changeDisplayedNum(p => p.slice(0, -1))
  //     changeMathSignStorage({ prev: '', curr: '' })
  //   }
  // }, [delState])

  // useEffect(() => {
  //   if (isCalculate) {
  //     const sign = mathSignStorage.curr;
  //     const nums = displayedNum.split(sign)
  //     const num_1 = nums[0]
  //     const num_2 = nums[1]
  //     const result = calculate(num_1, num_2, sign, changeDisplayedNum)
  //     if (result) {
  //       changeMathSignStorage(p => ({ prev: '', curr: '' }))
  //       changeNumSimbolStorage(p => ({ prev: '', curr: '' }))

  //       changeDisplayedNum(result)
  //     }
  //     isCalculateState(false)
  //   }
  // }, [isCalculate])

  // useEffect(() => {
  //   if (dotSignStorage.prev !== dotSignStorage.curr) {
  //     changeDisplayedNum(p => p + dotSignStorage.curr)
  //     changeDotSignStorage({ prev: '.', curr: '.', isResult: false })
  //   }
  // }, [dotSignStorage])


  // useEffect(() => {
  //   changeDisplayedNum(p => p + numSimbolStorage.curr)
  // }, [numSimbolStorage])

  // useEffect(() => {


  //   if (mathSignStorage.curr && !mathSignStorage.prev) {
  //     if (displayedNum.length >= 1) {
  //       changeDisplayedNum(p => p + mathSignStorage.curr)
  //       changeDotSignStorage(p => ({ prev: '', curr: '', isResult: true }))
  //     }
  //     else {
  //       changeDisplayedNum(p => mathSignStorage.curr)
  //     }
  //   }
  //   if (mathSignStorage.curr && mathSignStorage.prev) {

  //     changeDisplayedNum(p => {
  //       return p.replace(mathSignStorage.prev, mathSignStorage.curr)
  //     })

  //   }

  // }, [mathSignStorage])



  return <Ctx.Provider value={{
    changeNumeralStorage,
    changeSimbStorage,
    setCalculate,
    displayedValue
    // changeMathSignStorage, displayedNum,
    // isCalculateState, changeDotSignStorage,
    // setDelState,

  }}>{props.children}</Ctx.Provider>
}
export default App;

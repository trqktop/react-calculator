import React from 'react';
import './calculator.css'
import { Ctx } from '../../App';
import { Display } from '../Display/Display';
import { Keyboard } from '../Keyboard/Keyboard';


const rgxpNum = /[0-9]|\./
const rgxpSymb = /\+|\-|\/|\*/

export function Calculator() {
    const { changeNumeralStorage,
        changeSimbStorage,
        setCalculate,
        setDelLastSymbState,
        setClearState
        // changeMathSignStorage, isCalculateState, changeDotSignStorage, setDelState
    } = React.useContext(Ctx)
    return (
        <div className="calculator">
            <Display />
            <div className='container' onMouseDown={e => {
                if (e.target.tagName === 'BUTTON') {
                    const el = e.target.textContent
                    const elIsNum = rgxpNum.test(el)
                    const elIsMathSign = rgxpSymb.test(el)
                    if (elIsNum)
                        changeNumeralStorage(p => ({ prev: p.curr, curr: el }))
                    if (elIsMathSign)
                        changeSimbStorage(p => ({ prev: p.curr, curr: el }))
                    if (el === '=') {
                        setCalculate(true)
                    }
                    if (el === 'C') {
                        setClearState(true)
                    }
                    if (el === '<') {
                        setDelLastSymbState(true)
                    }
                }
            }}>
                <Keyboard />
            </div>
        </div >
    );
}







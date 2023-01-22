import React from 'react';
import './calculator.css'
import { Ctx } from '../../App';


const regExpNum = /[0-9]/
const regExpMathSign = /\+|\-|\/|\*/

export function Calculator() {
    const { changeNumSimbolStorage,
        changeMathSignStorage, isCalculateState } = React.useContext(Ctx)
    return (
        <div className="calculator">
            <Display />
            <div onMouseDown={e => {
                const el = e.target.textContent
                const elIsNum = regExpNum.test(el)
                const elIsMathSign = regExpMathSign.test(el)
                if (elIsNum)
                    changeNumSimbolStorage(p => ({ prev: p.curr, curr: el }))
                if (elIsMathSign)
                    changeMathSignStorage(p => ({ prev: p.curr, curr: el }))
                if (el === '=') {
                    isCalculateState(true)
                }
            }}>
                <Keyboard />
            </div>
        </div >
    );
}

function Display() {
    const { displayedNum } = React.useContext(Ctx)
    return (<h1>{displayedNum.length < 8 ? displayedNum : displayedNum.slice(0, 8)}</h1>)
}
function Keyboard() {
    return (<>
        <Numbers />
        <MathSigns />
    </>)
}

function Numbers() {
    return (
        <div>
            <button>0</button>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>5</button>
            <button>6</button>
            <button>7</button>
            <button>8</button>
            <button>9</button>
            <button>.</button>
        </div>

    )
}

function MathSigns() {
    return (
        <>
            <button>+</button>
            <button>-</button>
            <button>/</button>
            <button>=</button>
            <button>*</button>
        </>
    )

}
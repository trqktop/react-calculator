import React from "react"
import { useEffect } from "react"
const Ctx = React.createContext()


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

export function CtxProvider(props) {
    const [displayedValue, changeDisplayedValue] = React.useState('');
    const [numeralStorage, changeNumeralStorage] = React.useState({ prev: null, curr: '' });
    const [symbStorage, changeSimbStorage] = React.useState({ prev: null, curr: '' });
    const [isPaused, setPause] = React.useState(true)
    const [isCalculate, setCalculate] = React.useState(false)
    const [isDote, setDotState] = React.useState(true)
    const [isClear, setClearState] = React.useState(false)
    const [delLastSymb, setDelLastSymbState] = React.useState(false)

    useEffect(() => {
        if (delLastSymb) {
            if (symbStorage.curr) {
                setPause(true)
            }
            else {
                setPause(false)
            }
            changeDisplayedValue(p => p.slice(0, -1))
            setDelLastSymbState(false)
            if (displayedValue.slice(-1) === '.') {
                setDotState(true)
            }
        }
    }, [delLastSymb])


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
        if (isClear) {
            changeDisplayedValue('')
            changeNumeralStorage({ prev: null, curr: '' })
            changeSimbStorage({ prev: null, curr: '' });
            setPause(true)
            setClearState(false)
        }
    }, [isClear])

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
            if (displayedValue.length < 0 || sign == '-') {
                if (displayedValue[0] !== '-') {

                    changeDisplayedValue(p => p + sign) //
                }
            }
            else if (displayedValue.length > 0) {
                if (!rgxp.test(displayedValue.slice(-1)))
                    changeDisplayedValue(p => p + sign)
            }
            setDotState(true)
            setPause(true)
        }

        const nums = displayedValue.split(signPrev)
        let num_1;
        let num_2;

        if (nums.length > 2) {
            num_1 = '-' + nums[1]
            num_2 = nums[2]
        } else {
            num_1 = nums[0]
            num_2 = nums[1]
        }

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
            let num_1;
            let num_2;

            if (nums.length > 2) {
                num_1 = '-' + nums[1]
                num_2 = nums[2]
            } else {
                num_1 = nums[0]
                num_2 = nums[1]
            }

            const result = calculate(num_1, num_2, sign, changeDisplayedValue)
            if (result && !isNaN(result)) {
                changeDisplayedValue(result)
            }
            setCalculate(false)
        }
    }, [isCalculate])



    return <Ctx.Provider value={{
        changeNumeralStorage,
        changeSimbStorage,
        setCalculate,
        setClearState,
        setDelLastSymbState,
        displayedValue
    }}>{props.children}</Ctx.Provider>
}


export { Ctx }
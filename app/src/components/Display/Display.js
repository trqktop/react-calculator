import './display.css'
import React, { useEffect } from 'react'
import { Ctx } from '../../components/CtxProvider/CtxProvider'
export function Display() {
    const { displayedValue } = React.useContext(Ctx)
    const [fontsz, setFontSize] = React.useState(50)
    useEffect(() => {
        if (displayedValue.length > 9) {
            if (fontsz > 20)
                setFontSize(p => p - 1.5)
        }
        else {
            setFontSize(50)
        }
    }, [displayedValue])

    return (
        <div className='display'>
            <h1 style={{ fontSize: fontsz + 'px' }} >{displayedValue}</h1>
        </div>
    )
}
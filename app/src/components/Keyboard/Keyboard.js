import './keyboard.css'
import { Numbers } from '../Numbers/Numbers';
import { ClearSigns } from '../ClearSigns/ClearSigns';
import { MathSigns } from '../MathSigns/MathSigns';
export function Keyboard() {
    return (<>

        <div className='keyboard'>
            <div className='left-panel'>
                <ClearSigns />
                <Numbers />
            </div>
            <MathSigns />
        </div>
    </>)
}
import './clearSigns.css'
export function ClearSigns() {
    return (
        <div className='top-panel'>
            <button>{'C'}</button>
            <button>{'<'}</button>
            <button style={{ pointerEvents: 'none' }}>{''}</button>
        </div>
    )

}
interface FloatingLabelProps {
    name: string,
    type: string,
    value: string,
    onChange: (arg: string)=>void
}

const FloatingLabel = ({name, type, value, onChange}: FloatingLabelProps) => {
    return(
        <div className="relative m-2 mt-3">
            <input required id={name+Math.random()*999} name={name} type={type} value={value} onChange={(e)=>onChange(e.target.value)} className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-secondary focus:outline-none" placeholder={name} />
            <label htmlFor={name} className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">{name}</label>
        </div>
    )
}

export default FloatingLabel;
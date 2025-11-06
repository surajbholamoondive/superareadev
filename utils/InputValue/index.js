
const InputValue = ({value, setValue , placeholder,type, className
    
}) => {

    return ( 
        <div>
            <input type={type ? type : "text"} placeholder={placeholder}
                    className={className} required autoFocus
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    autoComplete="false"
            />
        </div>
     );
}
 
export default InputValue;
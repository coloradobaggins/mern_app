const FormRow = ({ labelText, type, name, value, handleChange})=> {
    return(
        <div className={name}>
            <label htmlFor={name} className='form-label'>
                {labelText || name} {/* If we no pass the labelName, use name */}
            </label>
            <input 
                type={type} 
                value={value} 
                name={name} 
                onChange={handleChange} 
                className='form-input' 
            />
        </div>
    )
}

export default FormRow;
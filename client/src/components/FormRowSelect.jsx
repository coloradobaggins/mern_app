const FormRowSelect = ({ labelText, name, value, handleChange, list })=> {

    return(
        <div className='form-row'>
            <label htmlFor={name} className='form-label'>
                {labelText || name }
            </label>
            <select 
                name={name} 
                value={value} 
                onChange={handleChange}
                className='form-select'
            >

            { 
                list.map((op, i)=>{

                    return <option key={i} value={op}>{op}</option>                                

                })
            }
            
            </select>
        </div>
    )

}

export default FormRowSelect;
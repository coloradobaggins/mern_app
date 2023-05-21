import React, {useState} from "react";
import FormRow from "./FormRow";
import { useAppContext } from "../context/appContext";
import FormRowSelect from "./FormRowSelect";

const FilterOpContainer = ()=>{

    const { isLoading, typeOpOptions, shipStatusOptions, handleChange, filterShip, filterShipStatus, filterTypeOp, filterDateSort } = useAppContext();
    


    let handleFilter = (e)=>{
        //console.log(e.target.name);
        handleChange({name: e.target.name, value: e.target.value});
    }

    return(
        <div>
            <form className="form">
                <h4>Filtros</h4>
                <div className="form-center">
                    <FormRow
                        labelText='Buque'
                        type='text'
                        value={filterShip}
                        name='filterShip'
                        handleChange={handleFilter}
                    />
                    <FormRowSelect
                        labelText='Tipo operacion'
                        name='filterTypeOp'
                        handleChange={handleFilter}
                        value=''
                        list={typeOpOptions}
                    />
                    <FormRowSelect
                        labelText='Estado Buque'
                        value=''
                        handleChange={handleFilter}
                        name='filterShipStatus'
                        list={shipStatusOptions}
                    />
                </div>
            </form>
        </div>
    );
}

export default FilterOpContainer;
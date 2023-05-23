import React, {useState} from "react";
import FormRow from "./FormRow";
import { useAppContext } from "../context/appContext";
import FormRowSelect from "./FormRowSelect";
import Wrapper from "../assets/wrappers/SearchContainer";

const FilterOpContainer = ()=>{

    const { isLoading, typeOpOptions, shipStatusOptions, handleChange, filterShip, filterShipStatus, filterTypeOp, filterDateSort, clearFilters } = useAppContext();
    


    let handleFilter = (e)=>{
        //console.log(e.target.name);

        if(isLoading)
            return;

        handleChange({name: e.target.name, value: e.target.value});
    }

    const handleCleanSubmit = (e)=> {
        e.preventDefault();
        clearFilters();
    }

    return(
        <Wrapper>
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
                        list={['Todos', ...typeOpOptions]}
                    />
                    <FormRowSelect
                        labelText='Estado Buque'
                        value=''
                        handleChange={handleFilter}
                        name='filterShipStatus'
                        list={['Todos', ...shipStatusOptions]}
                    />
                    <button type='button' className="btn" disabled={isLoading} onClick={handleCleanSubmit}>Limpiar</button>
                </div>
            </form>
        </Wrapper>
    );
}

export default FilterOpContainer;
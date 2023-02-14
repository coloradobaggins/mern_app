import { UnauthenticatedError } from "../errors/index.js";

/**
 * Check id usuario con dato creado por ususario.
 * 
 * @param {*} theUser (req.user.userId)
 * @param {*} theUserResource (resource createdBy)
 * @returns 
 */

const checkPermission = (theUser, theUserResource) =>{
    if(theUser.userId === theUserResource.toString()){
        return
    }
    throw new UnauthenticatedError(`No autorizado para acceder a esta ruta.`);
}

export default checkPermission;
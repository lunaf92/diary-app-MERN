export const updateObject = (OldObject, updatedProperties) =>{
    return{
        ...OldObject,
        ...updatedProperties
    }
}
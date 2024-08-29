import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

const Main = () => {
const uncontrolledFormData = useSelector((state: RootState) => state.uncontrolledFormData)
return (
    <div>
        <h2>Home</h2>
        <div>
            <p>Name: {uncontrolledFormData.name}</p>
            <p>{uncontrolledFormData.age} </p>
            <p>{uncontrolledFormData.email}</p>
             <p>{uncontrolledFormData.password}</p>
             <p>{uncontrolledFormData.confirmPassword}</p>
             <p>{uncontrolledFormData.gender}</p>
             <p>{uncontrolledFormData.accept}</p>
             <p>{uncontrolledFormData.picture}</p>
             <p>{uncontrolledFormData.country}</p>
        </div>
    </div>
)
}
export default Main
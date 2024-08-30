
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

const Main = () => {
const uncontrolledFormData = useSelector((state: RootState) => state.uncontrolledFormData)
const picture = useSelector((state: RootState) => state.picture.picture);
return (
    <div>
    <h2>Main Page</h2>
    <div>
        <h3>Form Responses:</h3>
        <p><strong>Name:</strong> {uncontrolledFormData.name}</p>
        <p><strong>Age:</strong> {uncontrolledFormData.age}</p>
        <p><strong>Email:</strong> {uncontrolledFormData.email}</p>
        <p><strong>Password:</strong> {uncontrolledFormData.password}</p>
        <p><strong>Confirm Password:</strong> {uncontrolledFormData.confirmPassword}</p>
        <p><strong>Gender:</strong> {uncontrolledFormData.gender}</p>
        <p><strong>Accept T&C:</strong> {uncontrolledFormData.accept ? 'Yes' : 'No'}</p>
        <p><strong>Country:</strong> {uncontrolledFormData.country}</p>
        {picture && (
            <div>
                <img src={picture} alt="Uploaded" style={{ maxWidth: "200px", maxHeight: "200px" }} />
            </div>
        )}
    </div>
</div>
)
}
export default Main
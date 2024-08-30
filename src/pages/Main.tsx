
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { useLocation } from "react-router-dom";

const Main = () => {
    const location = useLocation();
    const formData = location.state?.formData;
    const picture = useSelector((state: RootState) => state.picture.picture);
return (
    <div>
    <h2>Main Page</h2>
    <div style={{ marginBottom: "20px" }}>
        <h3>Form Data:</h3>
        {formData ? (
            <div style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "5px" }}>
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Age:</strong> {formData.age}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Gender:</strong> {formData.gender}</p>
                <p><strong>Accept T&C:</strong> {formData.accept ? 'yes' : 'no'}</p>
                <p><strong>Country:</strong> {formData.country}</p>
                {picture && (
        <div style={{ marginTop: "20px" }}>
            <h3>Stored Picture from Redux:</h3>
            <img src={picture} alt="Stored" style={{ maxWidth: "200px", maxHeight: "200px" }} />
        </div>
    )}
            </div>
        ) : (
            <p>No form data available.</p>
        )}
    </div>
</div>
)
}
export default Main
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useLocation } from "react-router-dom";

const Main = () => {
    const location = useLocation();
    const formData = location.state?.formData;
    const picture = useSelector((state: RootState) => state.picture.picture);
    const data = location.state?.data;

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Main Page</h2>
           <div className="flex flex-row gap-x-10 justify-around">
           <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">Uncontrolled Form:</h3>
                {formData ? (
                    <div className="border border-gray-300 p-4 rounded-lg shadow-sm">
                        <p className="text-lg text-gray-900"><strong>Name:</strong> {formData.name}</p>
                        <p className="text-lg text-gray-900"><strong>Age:</strong> {formData.age}</p>
                        <p className="text-lg text-gray-900"><strong>Email:</strong> {formData.email}</p>
                        <p className="text-lg text-gray-900"><strong>Gender:</strong> {formData.gender}</p>
                        <p className="text-lg text-gray-900"><strong>Accept T&C:</strong> {formData.accept ? 'yes' : 'no'}</p>
                        <p className="text-lg text-gray-900"><strong>Country:</strong> {formData.country}</p>
                        {picture && (
                            <div className="mt-4">
                                <img src={picture} alt="Stored" className="max-w-32 max-h-32 object-cover rounded-lg border border-gray-300" />
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-gray-600">No form data available.</p>
                )}
            </div>

            <div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">React Hook Form:</h3>
                {data ? (
                    <div className="border border-gray-300 p-4 rounded-lg shadow-sm">
                        <p className="text-lg text-gray-900"><strong>Name:</strong> {data.name}</p>
                        <p className="text-lg text-gray-900"><strong>Age:</strong> {data.age}</p>
                        <p className="text-lg text-gray-900"><strong>Email:</strong> {data.email}</p>
                        <p className="text-lg text-gray-900"><strong>Gender:</strong> {data.gender}</p>
                        <p className="text-lg text-gray-900"><strong>Accept T&C:</strong> {data.accept ? 'yes' : 'no'}</p>
                        <p className="text-lg text-gray-900"><strong>Country:</strong> {data.country}</p>
                        {picture && (
                            <div className="mt-4">
                                <img src={picture} alt="Stored" className="max-w-32 max-h-32 object-cover rounded-lg border border-gray-300" />
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="text-gray-600">No form data found.</p>
                )}
            </div>
           </div>
        </div>
    );
};

export default Main;

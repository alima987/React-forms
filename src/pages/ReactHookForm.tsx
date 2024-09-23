import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormData } from "../types";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../components/Validation";
import { useNavigate } from "react-router-dom";
import { useLoadPicture } from "../utils/loadPicture";

const ReactHookForm = () => {
    const { register, handleSubmit, formState: { errors, isValid} } = useForm<FormData>({
        resolver: yupResolver(schema) as any,
        mode: 'all',
        reValidateMode: 'onChange'
    });
    const picture = useSelector((state: RootState) => state.picture.picture);
    const countries = useSelector((state: RootState) => state.countries.countries);
    const navigate = useNavigate();
    const handleLoadPicture = useLoadPicture();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);
        navigate('/', { state: { data } });
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">React Hook Form</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                        Name:
                    </label>
                    <input
                        {...register('name')}
                        placeholder="Name"
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                    <label htmlFor="age" className="block text-lg font-medium text-gray-700">
                        Age:
                    </label>
                    <input
                        {...register('age')}
                        type="number"
                        id="age"
                        step="1"
                        placeholder="Age"
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                        Email:
                    </label>
                    <input
                        {...register('email')}
                        type="text"
                        placeholder="Email"
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                    <label htmlFor="password" className="block text-lg font-medium text-gray-700">
                        Password:
                    </label>
                    <input
                        {...register('password')}
                        type="password"
                        required
                        placeholder="Password"
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>
                <div className="space-y-2">
                    <label htmlFor="confirm-password" className="block text-lg font-medium text-gray-700">
                        Re-enter password:
                    </label>
                    <input
                        {...register('confirmPassword')}
                        type="password"
                        required
                        placeholder="Re-enter password"
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                </div>
                <fieldset className="space-y-2">
                    <legend className="text-lg font-medium text-gray-700">Gender:</legend>
                    <div className="flex space-x-4">
                        <label htmlFor="male" className="flex items-center space-x-2">
                            <input
                                {...register('gender')}
                                type="radio"
                                value="male"
                                id="male"
                                className="form-radio"
                            />
                            <span className="text-gray-700">Male</span>
                        </label>
                        <label htmlFor="female" className="flex items-center space-x-2">
                            <input
                                {...register('gender')}
                                type="radio"
                                value="female"
                                id="female"
                                className="form-radio"
                            />
                            <span className="text-gray-700">Female</span>
                        </label>
                    </div>
                    {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
                </fieldset>
                <div className="flex items-center space-x-2">
                    <input
                        {...register('accept')}
                        type="checkbox"
                        id="accept"
                        className="form-checkbox"
                    />
                    <label htmlFor="accept" className="text-lg font-medium text-gray-700">Accept T&C:</label>
                    {errors.accept && <p className="text-red-500 text-sm">{errors.accept.message}</p>}
                </div>
                <div className="space-y-2">
                    <label htmlFor="picture" className="block text-lg font-medium text-gray-700">
                        Upload picture
                    </label>
                    <input
                        {...register('picture')}
                        type="file"
                        id="picture"
                        accept=".jpg, .jpeg, .png"
                        onChange={handleLoadPicture}
                        className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    {errors.picture && <p className="text-red-500 text-sm">{errors.picture.message}</p>}
                    {picture && (
                        <div className="mt-2">
                            <img src={picture} alt="Uploaded" className="max-w-32 max-h-32 object-cover" />
                        </div>
                    )}
                </div>
                <div className="space-y-2">
                    <label htmlFor="countries" className="block text-lg font-medium text-gray-700">
                        Countries
                    </label>
                    <input
                        {...register('country')}
                        type="text"
                        id="countries"
                        list="countriesList"
                        placeholder="Country"
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
                    <datalist id="countriesList">
                        {countries.map((country) => (
                            <option key={country} value={country} />
                        ))}
                    </datalist>
                </div>
                <button
                    type="submit"
                    className={`w-full py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 ${isValid ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-400 cursor-not-allowed'}`}
                    disabled={!isValid}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ReactHookForm;


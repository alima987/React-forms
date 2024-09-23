import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { schema } from '../components/Validation';
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import { FormData } from "../types";
import { useLoadPicture } from "../utils/loadPicture";

const Uncontrolled = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const ageRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmRef = useRef<HTMLInputElement>(null);
    const genderRef = useRef<HTMLFieldSetElement>(null);
    const acceptRef = useRef<HTMLInputElement>(null);
    const pictureRef = useRef<HTMLInputElement>(null);
    const countryRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const countries = useSelector((state: RootState) => state.countries.countries);
    const picture = useSelector((state: RootState) => state.picture.picture);
    const handleLoadPicture = useLoadPicture();
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [hasErrors, setHasErrors] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const selectedGender = (genderRef.current?.querySelector('input[name="gender"]:checked') as HTMLInputElement)?.value || '';
        const formData: FormData = {
            name: nameRef.current?.value || '',
            age: parseFloat(ageRef.current?.value || '0'),
            email: emailRef.current?.value || '',
            password: passwordRef.current?.value || '',
            confirmPassword: confirmRef.current?.value || '',
            gender: selectedGender,
            accept: acceptRef.current?.checked || false,
            picture: pictureRef.current?.value || '',
            country: countryRef.current?.value || ''
        };
        try {
            setHasErrors(false)
            await schema.validate(formData, { abortEarly: false });
            navigate('/', { state: { formData } });
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                const errors: { [key: string]: string } = {};
                err.inner.forEach((error) => {
                    errors[error.path || ''] = error.message;
                });
                setErrors(errors);
                setHasErrors(true)
            }
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Uncontrolled Form</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                        Name:
                    </label>
                    <input 
                        ref={nameRef} 
                        type="text" 
                        name="name" 
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                    <label htmlFor="age" className="block text-lg font-medium text-gray-700">
                        Age:
                    </label>
                    <input 
                        ref={ageRef}
                        type="number"
                        name="age"
                        id="age"
                        min="0"
                        max="120"
                        step="1"
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                        Email:
                    </label>
                    <input 
                        ref={emailRef}
                        type="text"
                        name="email"
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                    <label htmlFor="password" className="block text-lg font-medium text-gray-700">
                        Password:
                    </label>
                    <input 
                        ref={passwordRef}
                        type="password"
                        name="password"
                        required
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
                <div className="space-y-2">
                    <label htmlFor="confirm-password" className="block text-lg font-medium text-gray-700">
                        Re-enter password:
                    </label>
                    <input 
                        ref={confirmRef}
                        type="password"
                        name="confirmPassword"
                        required
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                </div>
                <fieldset ref={genderRef} className="space-y-4">
                    <legend className="text-lg font-medium text-gray-700">Gender:</legend>
                    <div className="flex space-x-4">
                        <label htmlFor="male" className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                id="male"
                                className="form-radio"
                            />
                            <span>Male</span>
                        </label>
                        <label htmlFor="female" className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                id="female"
                                className="form-radio"
                            />
                            <span>Female</span>
                        </label>
                    </div>
                    {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                </fieldset>
                <div className="space-y-2">
                    <label htmlFor="accept" className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="accept"
                            ref={acceptRef}
                            className="form-checkbox"
                        />
                        <span className="text-lg font-medium text-gray-700">Accept T&C:</span>
                    </label>
                    {errors.accept && <p className="text-red-500 text-sm">{errors.accept}</p>}
                </div>
                <div className="space-y-2">
                    <label htmlFor="picture" className="block text-lg font-medium text-gray-700">
                        Upload picture
                    </label>
                    <input
                        type="file"
                        id="picture"
                        name="picture"
                        accept=".jpg, .jpeg, .png"
                        onChange={handleLoadPicture}
                        ref={pictureRef}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    {errors.picture && <p className="text-red-500 text-sm">{errors.picture}</p>}
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
                        type="text"
                        name="country"
                        ref={countryRef}
                        list="countriesList"
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
                    <datalist id="countriesList">
                        {countries.map((country) => (
                            <option key={country} value={country} />
                        ))}
                    </datalist>
                </div>
                <button type="submit" 
                className={`w-full py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 ${hasErrors ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600'}`}  
                disabled={hasErrors}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Uncontrolled;





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
            await schema.validate(formData, { abortEarly: false });
            navigate('/', { state: { formData } });
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                const errors: { [key: string]: string } = {};
                err.inner.forEach((error) => {
                    errors[error.path || ''] = error.message;
                });
                setErrors(errors);
            }
        }
    };
    return (
        <div>
            <h2>Uncontrolled Form</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                    <p>Name:</p>
                    <input ref={nameRef} type="text" name="name" />
                    {errors.name && <p className="error">{errors.name}</p>}
                </label>
                <label htmlFor="age">
                    <p>Age:</p>
                    <input
                        ref={ageRef}
                        type="number"
                        name="age"
                        id="age"
                        min="0"
                        max="120"
                        step="1"
                    />
                     {errors.age && <p className="error">{errors.age}</p>}
                </label>
                <label htmlFor="email">
                    <p>Email:</p>
                    <input
                        ref={emailRef}
                        type="text"
                        name="email"
                    />
                     {errors.email && <p className="error">{errors.email}</p>}
                </label>
                <label htmlFor="password">
                    <p>Password:</p>
                    <input
                        ref={passwordRef}
                        type="password"
                        name="password"
                        required
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </label>
                <label htmlFor="confirm-password">
                    <p>Re-enter password:</p>
                    <input
                        ref={confirmRef}
                        type="password"
                        name="confirmPassword"
                        required
                    />
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                </label>
                <fieldset ref={genderRef}>
                    <legend>Gender:</legend>
                    <label htmlFor="male">
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            id="male"
                        />
                        <p>Male</p>
                    </label>
                    <label htmlFor="female">
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            id="female"
                          
                        />
                        <p>Female</p>
                    </label>
                    {errors.gender && <p className="error">{errors.gender}</p>}
                </fieldset>
                <label htmlFor="accept">
                    <input
                        type="checkbox"
                        name="accept"
                        ref={acceptRef}
                    />
                    <p>Accept T&C:</p>
                    {errors.accept && <p className="error">{errors.accept}</p>}
                </label>
                <label htmlFor="picture">
                    <p>Upload picture</p>
                    <input
                        type="file"
                        id="picture"
                        name="picture"
                        accept=".jpg, .jpeg, .png"
                        onChange={handleLoadPicture}
                        ref={pictureRef}
                    />
                    {errors.picture && <p className="error">{errors.picture}</p>}
                    {picture && (
                        <div>
                            <img src={picture} alt="Uploaded" style={{ maxWidth: "200px", maxHeight: "200px" }} />
                        </div>
                    )}
                </label>
                <label htmlFor="countries">
                    <p>Countries</p>
                    <input
                        type="text"
                        name="country"
                        ref={countryRef}
                        list="countriesList"
                    />
                    {errors.country && <p className="error">{errors.country}</p>}
                    <datalist id="countriesList">
                        {countries.map((country) => (
                            <option key={country} value={country} />
                        ))}
                    </datalist>
                </label>
                <button type="submit">Submit</button>
            </form>
            <div>
            </div>
        </div>
    );
};

export default Uncontrolled;





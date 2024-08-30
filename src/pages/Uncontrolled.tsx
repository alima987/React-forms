import React, { useState } from "react"
import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPicture } from "../redux/slices/pictureSlice"
import { RootState } from "../redux/store"
import  { schema } from '../components/Validation';
import * as yup from 'yup';
import { setUncontrolledFormData } from "../redux/slices/uncontrolled"
import { useNavigate } from "react-router-dom"

const Uncontrolled = () => {
    const nameRef = useRef<HTMLInputElement>(null)
    const ageRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const confirmRef = useRef<HTMLInputElement>(null)
    const pictureRef = useRef<HTMLInputElement>(null)
    const countryRef = useRef<HTMLInputElement>(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const countries = useSelector((state: RootState) => state.countries.countries)
    const picture = useSelector((state: RootState) => state.picture.picture)
    const uncontrolledFormData = useSelector((state: RootState) => state.uncontrolledFormData)
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

        const handleLoadPicture = (event: React.ChangeEvent<HTMLInputElement>) => {
          event.preventDefault();
          const file = event.target.files?.[0];
      
          if (!file) {
            alert("No file selected");
            return;
          }
      
          const maxSizeMB = 5;
          const maxSizeBytes = maxSizeMB * 1024 * 1024;
          if (file.size > maxSizeBytes) {
            alert(`File size should be less than ${maxSizeMB}MB`);
            return;
          }
  
          const allowedExtensions = ["image/jpeg", "image/png"];
          if (!allowedExtensions.includes(file.type)) {
            alert("Invalid file type. Only JPG and PNG files are allowed.");
            return;
          }
      
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result as string;
            dispatch(setPicture(base64String));
          };
          reader.readAsDataURL(file);
        };     
      
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();        
    try {
        await schema.validate(uncontrolledFormData, { abortEarly: false });
        dispatch(setUncontrolledFormData(uncontrolledFormData));
        alert('Form submitted successfully!');
        navigate('/');
        console.log(uncontrolledFormData);
    } catch (err) {
        if (err instanceof yup.ValidationError) {
            const errors: { [key: string]: string } = {};
            err.inner.forEach((error) => {
                errors[error.path || ''] = error.message;
            });
            setErrors(errors);
        }
    }
      alert(`
        ${nameRef.current?.value} 
        ${ageRef.current?.value} 
        ${emailRef.current?.value} 
        ${passwordRef.current?.value}
        ${confirmRef.current?.value}
        ${uncontrolledFormData.gender}
        ${uncontrolledFormData.accept}
        ${pictureRef.current?.value}
        ${countryRef.current?.value}`)
      };
      const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        console.log(name, value, checked);
        const updatedData = {
          ...uncontrolledFormData,
          [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value,
        };
      
        dispatch(setUncontrolledFormData(updatedData));
      };      
      console.log('Uncontrolled Form Data:', uncontrolledFormData);
      
return (
    <div>
        <h2>Uncontrolled</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            <p>Name:</p>
            <input 
            ref={nameRef} 
            type="text" 
            name="name" 
            value={uncontrolledFormData.name} 
            onChange={handleInputChange}/>
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
           value={uncontrolledFormData.age}
           onChange={handleInputChange}
           />
            {errors.age && <p className="error">{errors.age}</p>}
          </label>
          <label htmlFor="email">
            <p>Email:</p>
            <input 
            ref={emailRef}
            type="text"
            name="email"
            value={uncontrolledFormData.email}
            onChange={handleInputChange}/>
            {errors.email && <p className="error">{errors.email}</p>}
          </label>
          <label htmlFor="password">
            <p>Password:</p>
            <input 
            ref={passwordRef}
            type="password"
            name="password"
            required
            value={uncontrolledFormData.password}
            onChange={handleInputChange}/>
            {errors.password && <p className="error">{errors.password}</p>}
          </label>
          <label htmlFor="confirm-password">
            <p>Re-enter password:</p>
            <input 
            ref={confirmRef}
            type="password"
            name="confirmPassword"
            required
            value={uncontrolledFormData.confirmPassword}
            onChange={handleInputChange}/>
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          </label>
          <fieldset>
            <legend>Gender:</legend>
            <label htmlFor="male">
                <input 
                type="radio"
                name="gender"
                value="male"
                checked={uncontrolledFormData.gender === "male"}
                onChange={handleInputChange}
                
                />
                <p>Male</p>
            </label>
            <label htmlFor="female">
              <input 
              type="radio"
              name="gender"
              value="female"
              checked={uncontrolledFormData.gender === "female"}
              onChange={handleInputChange}
              
              />
                <p>Female</p>
            </label>
            {errors.gender && <p className="error">{errors.gender}</p>}
           </fieldset>
           <label htmlFor="accept">
             <input 
             type="checkbox"
             name="accept"
             value='accept'
             checked={uncontrolledFormData.accept}
             onChange={handleInputChange}
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
              ref={pictureRef}/>
              {errors.picture && <p className="error">{errors.picture}</p>}
              {picture && (
                <div >
                 <img src={picture} alt="Uploaded" style={{maxWidth: "200px", maxHeight: "200px" }}/>
                </div>
              )}
           </label>
           <label htmlFor="countries">
            <p>Countries</p>
            <input 
            type="text"
            value={uncontrolledFormData.country}
            name="country"
            onChange={handleInputChange}
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
    </div>
)
}
export default Uncontrolled



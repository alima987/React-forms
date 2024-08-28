import React, { useState } from "react"
import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPicture } from "../redux/slices/pictureSlice"
import { RootState } from "../redux/store"

const Uncontrolled = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const dispatch = useDispatch();
    const countries = useSelector((state: RootState) => state.countries.countries)
    const picture = useSelector((state: RootState) => state.picture.picture)
    const [filtered, setFiltered] = useState<string[]>([])
    const [ selected, setSelected]= useState('')

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
      
        const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          const value = event.target.value;
          setSelected(value)
          setFiltered(countries.filter((country) => country.toLocaleLowerCase().includes(value.toLocaleLowerCase())))
        }
        const handleCountrySelect = (country: string)=> {
           setSelected(country)
           setFiltered([])
        }
        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
         event.preventDefault()
         if (inputRef.current) {
          alert("Form submitted: " + inputRef.current.value);
        }
        }

return (
    <div>
        <h2>Uncontrolled</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            <p>Name:</p>
            <input ref={inputRef} type="text"/>
          </label>
          <label htmlFor="age">
            <p>Age:</p>
            <input ref={inputRef} type="number" id="age" name="age" min="0" max="120" step="1"/>
          </label>
          <label htmlFor="email">
            <p>Email:</p>
            <input ref={inputRef} type="text"/>
          </label>
          <label htmlFor="password">
            <p>Password:</p>
            <input ref={inputRef} type="password" name="password" required/>
          </label>
          <label htmlFor="confirm-password">
            <p>Re-enter password:</p>
            <input ref={inputRef} type="password" name="confirm-password" required/>
          </label>
          <fieldset>
            <legend>Gender:</legend>
            <label htmlFor="male">
                <input type="radio" name="gender" value="male" required ref={inputRef}/>
                <p>Male</p>
            </label>
            <label htmlFor="female">
                <input type="radio" name="gender" value="female" required ref={inputRef}/>
                <p>Female</p>
            </label>
           </fieldset>
           <label htmlFor="accept">
             <input type="checkbox" name="accept" ref={inputRef}/>
             <p>Accept T&C:</p>
           </label>
           <label htmlFor="picture">
              <p>Upload picture</p>
              <input type="file" id="picture" name="picturer" accept=".jpg, .jpeg, .png" onChange={handleLoadPicture} ref={inputRef}/>
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
            value={selected}
            onChange={handleCountryChange}
            ref={inputRef}
            />
            {filtered.length > 0 && (
              <ul>
                {filtered.map((country, inx) => (
                  <li key={inx} onClick={() => handleCountrySelect(country)}>
                    {country}
                  </li>
                ))}
              </ul>
            )}
           </label>
           <button type="submit">Submit</button>
        </form>
    </div>
)
}
export default Uncontrolled



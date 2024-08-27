import { useRef } from "react"
import { useDispatch } from "react-redux"
import { setPicture } from "../redux/slices/pictureSlice"

const Uncontrolled = () => {
    const inputRef = useRef(null)
    const selectRef = useRef(null)
    const radioRef = useRef(null)
    const checkboxRef = useRef(null)
    const dispatch = useDispatch();

    /*const handleLoadPicture = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const file = event.target.files?.[0];
        const localImageUrl = window.URL.createObjectURL(file);
        onFileLoaded(localImageUrl);
      }*/

        const handleLoadPicture = (event: React.ChangeEvent<HTMLInputElement>) => {
            event.preventDefault();
            const file = event.target.files?.[0];
            
            if (!file) {
                alert("No file selected");
                return;
            }
    
            // Validate file size (e.g., 5MB limit)
            const maxSizeMB = 5;
            const maxSizeBytes = maxSizeMB * 1024 * 1024;
            if (file.size > maxSizeBytes) {
                alert(`File size should be less than ${maxSizeMB}MB`);
                return;
            }
    
            // Validate file extension
            const allowedExtensions = ["image/jpeg", "image/png"];
            if (!allowedExtensions.includes(file.type)) {
                alert("Invalid file type. Only JPG and PNG files are allowed.");
                return;
            }
    
            // Convert file to Base64
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                // Dispatch action to Redux store
                dispatch(setPicture(base64String));
            };
            reader.readAsDataURL(file);
        };

return (
    <div>
        <h2>Uncontrolled</h2>
        <form>
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
                <input type="radio" name="gender" value="male" required ref={radioRef}/>
                <p>Male</p>
            </label>
            <label htmlFor="female">
                <input type="radio" name="gender" value="female" required ref={radioRef}/>
                <p>Female</p>
            </label>
           </fieldset>
           <label htmlFor="accept">
             <input type="checkbox" name="accept" />
             <p>Accept T&C:</p>
           </label>
           <label htmlFor="picture">
              <p>Upload picture</p>
              <input type="file" id="picture" name="picturer" accept=".jpg, .jpeg, .png" onChange={handleLoadPicture}/>
           </label>
           <label htmlFor="countries">
            
           </label>
        </form>
    </div>
)
}
export default Uncontrolled



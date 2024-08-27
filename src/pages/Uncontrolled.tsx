import { useRef } from "react"

const Uncontrolled = () => {
    const inputRef = useRef(null)
    const selectRef = useRef(null)
    const radioRef = useRef(null)
    const checkboxRef = useRef(null)
return (
    <div>
        <h2>Uncontrolled</h2>
        <form>
          <label>
            <p>Name:</p>
            <input ref={inputRef} type="text"/>
          </label>
          <label>
            <p>Age:</p>
            <input ref={inputRef} type="number" id="age" name="age" min="0" max="120" step="1"/>
          </label>
          <label>
            <p>Email:</p>
            <input ref={inputRef} type="text"/>
          </label>
          <label>
            <p>Password:</p>
            <input ref={inputRef} type="password" name="password" required/>
          </label>
          <label>
            <p>Re-enter password:</p>
            <input ref={inputRef} type="password" name="confirm-password" required/>
          </label>
          <fieldset>
            <legend>Gender:</legend>
            <label>
                <input type="radio" name="gender" value="male" required ref={radioRef}/>
                <p>Male</p>
            </label>
            <label>
                <input type="radio" name="gender" value="female" required ref={radioRef}/>
                <p>Female</p>
            </label>
           </fieldset>
           <label>
             <input type="checkbox" name="accept" />
             <p>Accept T&C:</p>
           </label>
           <label htmlFor="avatar">
              <p>Upload picture</p>
              <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
           </label>
        </form>
    </div>
)
}
export default Uncontrolled
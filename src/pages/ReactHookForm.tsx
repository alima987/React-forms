import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { SubmitHandler, useForm } from "react-hook-form"
import { FormData } from "../types"
import { yupResolver } from "@hookform/resolvers/yup"
import { schema } from "../components/Validation"
import { useNavigate } from "react-router-dom"
import { useLoadPicture } from "../utils/loadPicture"

const ReactHookForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema) as any, mode: 'all',
      })
    
    const picture = useSelector((state: RootState) => state.picture.picture)
    const countries = useSelector((state: RootState) => state.countries.countries);
    const navigate = useNavigate();
    const handleLoadPicture = useLoadPicture();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data)
        navigate('/', { state: { data } });
    }
  
    return (
        <div>
            <h2>React Hook Form</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name">
                    <p>Name:</p>
                    <input {...register('name')} placeholder="Name" type="text" name="name" />
                    {errors.name && <p className="error">{errors.name.message}</p>}
                </label>
                <label htmlFor="age">
                    <p>Age:</p>
                    <input
                        {...register('age')}
                        type="number"
                        name="age"
                        id="age"
                        step="1"
                        placeholder="Age"
                    />
                     {errors.age && <p className="error">{errors.age.message}</p>}
                </label>
                <label htmlFor="email">
                    <p>Email:</p>
                    <input
                        {...register('email')}
                        type="text"
                        name="email"
                        placeholder="Email"
                    />
                     {errors.email && <p className="error">{errors.email.message}</p>}
                </label>
                <label htmlFor="password">
                    <p>Password:</p>
                    <input
                       {...register('password')}
                        type="password"
                        name="password"
                        required
                        placeholder="Password"
                    />
                    {errors.password && <p className="error">{errors.password.message}</p>}
                </label>
                <label htmlFor="confirm-password">
                    <p>Re-enter password:</p>
                    <input
                       {...register('confirmPassword')}
                        type="password"
                        name="confirmPassword"
                        required
                        placeholder="Re-enter password"
                    />
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
                </label>
                <fieldset >
                    <legend>Gender:</legend>
                    <label htmlFor="male">
                        <input
                        {...register('gender')}
                            type="radio"
                            name="gender"
                            value="male"
                            id="male"
                        />
                        <p>Male</p>
                    </label>
                    <label htmlFor="female">
                        <input
                        {...register('gender')}
                            type="radio"
                            name="gender"
                            value="female"
                            id="female"
                          
                        />
                        <p>Female</p>
                    </label>
                    {errors.gender && <p className="error">{errors.gender.message}</p>}
                </fieldset>
                <label htmlFor="accept">
                    <input
                    {...register('accept')}
                        type="checkbox"
                        name="accept"
                    />
                    <p>Accept T&C:</p>
                    {errors.accept && <p className="error">{errors.accept.message}</p>}
                </label>
                <label htmlFor="picture">
                    <p>Upload picture</p>
                    <input
                    {...register('picture')}
                        type="file"
                        id="picture"
                        name="picture"
                        accept=".jpg, .jpeg, .png"
                        onChange={handleLoadPicture}
                    />
                    {errors.picture && <p className="error">{errors.picture.message}</p>}
                    {picture && (
                        <div>
                            <img src={picture} alt="Uploaded" style={{ maxWidth: "200px", maxHeight: "200px" }} />
                        </div>
                    )}
                </label>
                <label htmlFor="countries">
                    <p>Countries</p>
                    <input
                    {...register('country')}
                        type="text"
                        name="country"
                        list="countriesList"
                        placeholder="country"
                    />
                    {errors.country && <p className="error">{errors.country.message}</p>}
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
export default ReactHookForm


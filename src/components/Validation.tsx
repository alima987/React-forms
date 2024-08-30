import * as yup from 'yup';
const MAX_SIZE = 5 * 1024 * 1024;
export const schema = yup.object().shape({
    name: yup.string().matches(/^[A-Z][a-z]*$/, 'Name should start with a capital letter').required('Name is required'),
    age: yup.number().positive('Age must be positive').integer('Age must be an integer').required('Age is required'),
    email: yup.string().email('Must be a valid email').required('Email is required'),
    password: yup.string().required('Password is required').min(8) .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.*[a-zA-Z]).{8,}$/,
        'Password should contain at least 8 characters, including 1 digit, 1 uppercase letter, 1 lowercase letter, and 1 special character'
      ),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm Password is required'),
    gender: yup.mixed().defined().required('Gender is required'),
    accept: yup.boolean().required("Required").oneOf([true], "You must accept the terms"),
    picture: yup.mixed<File>()
    .test('fileSize', 'File size is too large', value => !value || (value.size <= MAX_SIZE))
    .test('fileType', 'Unsupported file format', value => !value || ['image/jpeg', 'image/png'].includes(value.type))
    .required('Picture is required'),
    country: yup.string().required('Country selection is required'),
    })




import {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import {UserContext} from '../context/UserContext';

const Register = () => {
    const {registerUser, wait} = useContext(UserContext);
    const [errMsg, setErrMsg] = useState(false);
    const [successMsg, setSuccessMsg] = useState(false);
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
    });

    const onChangeInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const submitForm = async (e) => {
        e.preventDefault();

        if(!Object.values(formData).every(val => val.trim() !== '')) {
            setSuccessMsg(false);
            setErrMsg('Please fill in all required fields!');
            return;
        }

        if(formData.password !== formData.confirmPassword) {
            setSuccessMsg(false);
            setErrMsg('Passwords do not match. Please try again!');
            return;
        }

        const data = await registerUser(formData);
        if(data.success) {
            e.target.reset();
            setSuccessMsg('You have successfully registered.');
            setErrMsg(false);
        }
        else if(!data.success && data.message) {
            setSuccessMsg(false);
            setErrMsg(data.message);
        }
    };

    return (
        <div className="myform">
            <h2>Register</h2>
            <form onSubmit={submitForm}>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" onChange={onChangeInput} placeholder="Your name" id="name" value={formData.name} required />
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" onChange={onChangeInput} placeholder="Your email" id="email" value={formData.email} required />
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" onChange={onChangeInput} placeholder="New password" id="password" value={formData.password} required />
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input type="password" name="confirmPassword" onChange={onChangeInput} placeholder="Re-enter password" id="confirmPassword" value={formData.confirmPassword} required />
                {successMsg && <div className="success-msg">{successMsg}</div>}
                {errMsg && <div className="err-msg">{errMsg}</div>}
                <button type="submit" disabled={wait}>Register</button>
                <div className="bottom-link"><Link to="/login">Login</Link></div>
            </form>
        </div>
    )
};

export default Register;

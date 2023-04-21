import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';





const AddProject = () => {
    const navigate = useNavigate();
    const [successMsg, setSuccessMsg] = useState(false);
    const Axios = axios.create({
        baseURL:'http://localhost/react-login-php/php/'
    });
    const [formData, setFormData] = useState({
        title: "",
        type: "",
        start_date: "",
        end_date: ""
    });
    const goToHome = () => {
        navigate('/');
    }
    
    const handleChange = (e) => {
        console.log(e.target.name, e.target.value);
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        console.log(formData)
    }
    
    const submitForm = async (e) => {
        e.preventDefault();
        try{
            const {data} = await Axios.post('addProject.php',formData);
            if(data.success){
                setSuccessMsg(data.message);
                navigate('/');
            }
            }
            catch(err){
                return {success:0, message:'Server Error!'};
            }

    }
    return (
        <div className="myform">
            <h2>Add New Project</h2>
            <form onSubmit={submitForm}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" onChange={handleChange} placeholder="Project Title here" id="title" required />
                <label htmlFor="type">Type</label>
                <input type="text" name="type" placeholder="Project type" onChange={handleChange} id="type" required />
                <label htmlFor="start_date">Start Date</label>
                <input type="date" name="start_date" onChange={handleChange} id="type" required />
                <label htmlFor="end_date">Estimated Ending Date</label>
                <input type="date" name="end_date" onChange={handleChange} id="type" required />
                {successMsg && <div className="success-msg">{successMsg}</div>}
                <button type="submit" >Add Project</button>
                <Link to="/"><button onClick={goToHome}>Discard</button></Link>
            </form>
        </div>
    )
}
export default AddProject;
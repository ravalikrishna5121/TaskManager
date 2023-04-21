import {useContext}  from 'react';
import { UserContext } from '../context/UserContext';
const Sidepanel = () => {
    const {logout} = useContext(UserContext);
    return (
        
        <div className="sidepanel" id='sidepanel'>
        <div className="flex" style={{ fontSize: "30px" }}>
            <div >
                <i className="fa fa-clipboard-list" ></i>
                <span>Methodize</span>
            </div>
            <i className="fa fa-arrow-right-from-bracket" onClick={logout}></i>
        </div>
        <ul>
            <li className="active"><a href="home">Home</a></li>
            <li><a href="task">My Task</a></li>
        </ul>
        <hr/>
            <div className="flex">
                <h2>Teams</h2>
                <i className="fa fa-add" id="show"></i>
            </div>
            <ul id="teams">
                <li><a href="sales">Sales</a></li>
                <li><a href="marketing">Marketing</a></li>
                <li><a href="eng">Engineering</a></li>
            </ul>
            <i className="fa fa-arrow-down" id='arrow-down'></i>
    </div>


        )
}
export default Sidepanel;

import {useContext} from 'react';
import {UserContext} from '../context/UserContext';

const Greeting = ()=>{
    const {user} = useContext(UserContext);
    return( 
    <div className="block">
        <img src="./Multitasking-pana.png" alt='' />
        <div className="text">
            <h3>Greetings, {user.name}!</h3>
            <p>here is all of your porjects and tasks that are due soon</p>
        </div>
    </div>
    )
}

export default Greeting;
import {createContext, useState, useEffect} from 'react'
import axios from 'axios'

export const UserContext = createContext();

export const Axios = axios.create({
    baseURL: 'http://localhost/react-login-php/php',
});

export const UserContextProvider = ({children}) => {

    const [theUser, setUser] = useState(null);
    const [wait, setWait] = useState(false);
    const [cards, setCards] = useState([]);

    const loggedInCheck = async () => {
        const loginToken = localStorage.getItem('loginToken');
        Axios.defaults.headers.common['Authorization'] = 'Bearer '+loginToken;
        if(loginToken){
            const {data} = await Axios.get('getUser.php');
            if(data.success && data.user){
                setUser(data.user);
                return;
            }
            setUser(null);
        }
    }
    
    const loginUser = async ({email,password}) => {
        setWait(true);
        try{
            const {data} = await Axios.post('login.php',{
                email,
                password 
            });
            if(data.success && data.token){
                localStorage.setItem('loginToken', data.token);
                setWait(false);
                return {success:1};
            }
            setWait(false);
            return {success:0, message:data.message};
        }
        catch(err){
            setWait(false);
            return {success:0, message:'Server Error!'};
        }

    }

const addCard = async({title,description,priority,project_id,assign })=>{
    setWait(true);
    try{
        const {data} = await Axios.post('addcard.php',{
            title,
            description,
            priority,
            project_id,
            assign  	
        });
        setWait(false);
        return data;
    }
    catch(err){
        setWait(false);
        return {success:0, message:'Server Error!'};
    }
}
const deleteCard = async (id) => {
    console.log("deleteCard called with id:", id);
    setWait(true);
    try {
      const { data } = await Axios.delete(`deleteCard.php?id=${id}`);
      console.log("deleteCard response:", data);
      setWait(false);
      return data;
    } catch (err) {
      console.error(err);
      setWait(false);
      return { success: 0, message: 'Server Error!' };
    }
  }
  


    const registerUser = async ({name,email,password}) => {
        setWait(true);
        try{
            const {data} = await Axios.post('register.php',{
                name,
                email,
                password 
            });
            setWait(false);
            return data;
        }
        catch(err){
            setWait(false);
            return {success:0, message:'Server Error!'};
        }
    }


    const getCards = async () => {
        setWait(true);
        try {
          const { data } = await Axios.get('getCard.php');
          setWait(false);
          return data;
        } catch (err) {
          setWait(false);
          return { success: 0, message: 'Server Error!' };
        }
      };
    useEffect(() => {
  const fetchData = async () => {
    const cards = await getCards();
    setCards(cards);
  };

  fetchData();
}, []);

    useEffect(() => {
        async function asyncCall(){
            await loggedInCheck();
         
        }
        asyncCall();
    },[]);

    const logout = () => {
        localStorage.removeItem('loginToken');
        setUser(null);
    }

    return (
        <UserContext.Provider value={{registerUser,addCard,deleteCard,cards,loginUser,wait, user:theUser,loggedInCheck,logout}}>
            {children}
        </UserContext.Provider>
    );

}

export default UserContextProvider;
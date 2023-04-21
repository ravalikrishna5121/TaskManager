import Greeting from './Greeting';
import Sidepanel from './Sidepanel';
import Tasks from './Tasks';
import Projects from './Projects';
const Home = () => {
    return (
    <div className="Home">
        <Sidepanel/>
        <div className="Main">
        <Greeting/>
        {/* <Tasks/> */}
        <Projects/>
        </div>
    </div>
            )
}

export default Home;

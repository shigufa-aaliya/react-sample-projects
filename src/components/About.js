import User from "./User";
import UserClass from "./UserClass";

const About = () =>{


    return (<div>
        <h1>About Component</h1>
        <h2>This is Namaste react web series</h2>

        {/* <User name={"AALIYA (Function)"}/> */}
        <UserClass name={"AALIYA (Class)"}/>
    </div>
    ); 
}

export default About;
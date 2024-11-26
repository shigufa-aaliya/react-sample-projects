import User from "./User";
import UserClass from "./UserClass";
import React from "react"

class About extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        
    }

    render(){
        return <div>
            <h1>About Component</h1>
            <h2>This is Namaste react web series</h2>
    
            <UserClass />
        </div>
    }

}

export default About;
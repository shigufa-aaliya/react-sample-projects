import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        name: "Dummy",
        location: "Default",
        // avatar_url:"http://dummy-photo.com"
      },
    };
  }

  async componentDidMount() {
    const data = await fetch("https://api.github.com/users/shigufa-aaliya");

    const json = await data.json();


    this.setState({
        userInfo: json, 
      });

    console.log(json)
  }

  render() {
    const { name, location, avatar_url } = this.state.userInfo;

    console.log({ name })

    return (
      <div className="user-card">
        <img src={avatar_url} alt="alt-img" />
        <h2>Name : {name}</h2>
        <h3>Location : {location}</h3>
        <h4>Contact : @AaliyaShigufa</h4>
      </div>
    );
  }
}

export default UserClass;
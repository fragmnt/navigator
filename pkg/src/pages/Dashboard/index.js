import React, { Component } from 'react';
import {getParcelInfo} from '../../services/api.service';

class DashboardPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            parcel: {
                name: null
            }
        };
        this.removeAuthenticationState = this.removeAuthenticationState.bind(this);
    };

    removeAuthenticationState = () => {
        localStorage.removeItem('token');
        // redirect
    };

    componentDidMount = async () => {
        const response = await getParcelInfo();
        this.setState({ parcel: {name: response.data.payload.id}});
    }

    render() {
        const {parcel} = this.state;
        return(
            <>
                <h1>Dashboard</h1>
                <p>You've added a package to Navigator. Now you can track, issue alerts and notifications for each problem along the way. Click the map to track the movement of your parcel in real-time. Enjoy!</p>
                <h3>Parcel: {parcel.name}</h3>
                <button onClick={this.removeAuthenticationState}>Logout</button>
            </>
        )
    }
}

export default DashboardPage;
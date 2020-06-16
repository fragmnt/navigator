import React, { Component, createRef } from 'react';
import './index.css';

import {Button, FormControl, InputLabel, Input, FormHelperText} from '@material-ui/core';
import {getParcelInfo, addTrackingToParcel} from '../../services/api.service';

class DashboardPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            parcel: {
                name: null,
                trackingNumber: null
            }
        };
        this.trackingNumRef = createRef();
        this.removeAuthenticationState = this.removeAuthenticationState.bind(this);
    };

    removeAuthenticationState = () => {
        localStorage.removeItem('token');
        // redirect
    };

    beginTrackingParcel = async () => {
        var tk = this.trackingNumRef.current.value;
        const response = await addTrackingToParcel(tk);
        console.log(response);
        if (response.status === 200 || 204) {
            this.setState({ trackingNumber: tk});
        };
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

                <div>
                <FormControl>
                    <InputLabel htmlFor="parcel-input">Tracking Number:</InputLabel>
                    <Input inputRef={this.trackingNumRef} id="parcel-input" aria-describedby="pTracking-text-helper" />
                    <FormHelperText id="pTracking-text-helper">We'll never share your tracking number, unless needed.</FormHelperText>
                    <Button className="primary_btn" variant="contained" color="primary" onClick={this.beginTrackingParcel}>
                        Add Tracking Number to Parcel
                    </Button>
                </FormControl>
                </div>

                <button onClick={this.removeAuthenticationState}>Logout</button>
            </>
        )
    }
}

export default DashboardPage;
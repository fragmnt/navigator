import React, { Component, createRef } from 'react';
import './index.css';

import {Button, FormControl, InputLabel, Input, FormHelperText} from '@material-ui/core';
import {addParcel} from '../../services/api.service';

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.parcelTextRef = createRef();
        this.addParcelToService = this.addParcelToService.bind(this);
    }

    addParcelToService = async () => {
        // show loading spinner
        var inputData = this.parcelTextRef.current.value;
        const response = await addParcel(inputData);
        if (response.status === 200) {
            localStorage.setItem('token', response.data.accessToken);
            // hide spinner, redirect
        } else if (response.status === 500) {
            console.log(response);
        }
    };

    render() {
        return(<>

        <h1>Traceability insights and traffic monitoring for last-mile parcel delivery.</h1>
        <p>Powered by PagerDuty.</p>
        
        <FormControl>
            <InputLabel htmlFor="parcel-input">Parcel Name:</InputLabel>
            <Input inputRef={this.parcelTextRef} id="parcel-input" aria-describedby="parcel-text-helper" />
            <FormHelperText id="parcel-text-helper">We'll never share your tracking number, unless needed.</FormHelperText>
            <Button className="primary_btn" variant="contained" color="primary" onClick={this.addParcelToService}>
                Add New Parcel
            </Button>
        </FormControl>

        </>);
    }
}

export default HomePage
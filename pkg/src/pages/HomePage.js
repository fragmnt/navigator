import React, { Component, createRef, useRef } from 'react';

import {Button, FormControl, InputLabel, Input, FormHelperText} from '@material-ui/core';

import {addParcel} from '../services/api.service';

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.parcelTextRef = createRef();
        this.addParcelToService = this.addParcelToService.bind(this);
    }

    addParcelToService = async () => {
        var inputData = this.parcelTextRef.current.value;
        const response = await addParcel(inputData);
        console.log(response.data, response.status);
    };

    render() {
        return(<>
        Navigator
        <FormControl>
            <InputLabel htmlFor="parcel-input">Parcel Name:</InputLabel>
            <Input inputRef={this.parcelTextRef} id="parcel-input" aria-describedby="parcel-text-helper" />
            <FormHelperText id="parcel-text-helper">We'll never share your tracking number, unless needed.</FormHelperText>
            <Button variant="contained" color="primary" onClick={this.addParcelToService}>
                Add New Parcel
            </Button>
        </FormControl>

        </>);
    }
}

export default HomePage
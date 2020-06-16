import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8009'

export const addParcel = (pk) => {
    const payload = pk.toString();
    return axios.post(`${API_BASE_URL}/add/parcel`, { parcelKey: payload}).then((res) => {
            return res;
    });
};

export const getParcelInfo = () => {
    return axios.get(`${API_BASE_URL}/parcel/info`, {
        headers: {'X-Access-Token': localStorage.getItem('token')}
    }).then((res) => {
        return res;
    })
};

export const addTrackingToParcel = (tk) => {
    const trackingNum = tk.toString();
    return axios.post(`${API_BASE_URL}/parcel/add/tracking`, {
        trackerNumber: trackingNum
    }, {
        headers: {
            'X-Access-Token': localStorage.getItem('token')
        },
    }).then((res) => {
        return res;
    })
};

export const retrieveTrackingNumberFromParcel = () => {
    return axios.get(`${API_BASE_URL}/parcel/tracking`, {
        headers: {'X-Access-Token': localStorage.getItem('token')}
    }).then((res) => {
        return res;
    })   
};
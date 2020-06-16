import axios from 'axios';

export const addParcel = (pk) => {
    const payload = pk.toString();
    return axios.post('http://127.0.0.1:8009/add/parcel', { parcelKey: payload}).then((res) => {
            return res;
    });
}
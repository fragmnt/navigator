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


// PAGERDUTY

export const createAnIncidentInPD = () => {
    return axios.post(`${API_BASE_URL}/parcel/create/incident`, {
            "incident": {
              "type": "incident",
              "title": "string",
              "service": {
                "id": "string",
                "summary": "string",
                "type": "service_reference",
                "self": "string",
                "html_url": "string"
              },
              "priority": {
                "id": "string",
                "summary": "string",
                "type": "priority_reference",
                "self": "string",
                "html_url": "string"
              },
              "urgency": "high",
              "body": {
                "type": "incident_body",
                "details": "string"
              },
              "incident_key": "string",
              "assignments": [
                {
                  "assignee": {
                    "id": "string",
                    "summary": "string",
                    "type": "user_reference",
                    "self": "string",
                    "html_url": "string"
                  }
                }
              ],
              "escalation_policy": {
                "id": "string",
                "summary": "string",
                "type": "escalation_policy_reference",
                "self": "string",
                "html_url": "string"
              },
              "conference_bridge": {
                "conference_number": "string",
                "conference_url": "string"
              }
            }
    }, {
        headers: {
            'X-Access-Token': localStorage.getItem('token')
        }
    })
}
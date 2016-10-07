import axios from 'axios';

export function createEvent(data) {
  return dispatch => {
    return axios.post('/api/events', data);
  }
}

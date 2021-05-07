export default {
    async addRequest(context, payload) {
        let newRequest = {
            email: payload.email,
            message: payload.message
        };
        const response = await fetch(`https://vue-http-demo-906e8-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`, {
            method: 'POST',
            body: JSON.stringify(newRequest)
        });
        const responseData = await response.json();
        if(!response.ok) {
            const error = new Error(responseData.message || 'Failed to Fetch');
            throw error;
        }
        newRequest['coachId'] = payload.coachId;
        context.commit('addNewRequest', newRequest);
    },
    async fetchRequests(context) {
        const coachId = context.rootGetters.userId;
        const response = await fetch(`https://vue-http-demo-906e8-default-rtdb.firebaseio.com/requests/${coachId}.json`);
        const responseData = await response.json();
        let requests = [];
        for(let key in responseData) {
            let request = {
                id: responseData[key],
                email: responseData[key]['email'],
                message: responseData[key]['message']
            }
            requests.push(request);
        }
        context.commit('setRequests', requests);
    }
}
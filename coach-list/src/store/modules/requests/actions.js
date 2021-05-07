export default {
    // To create a Request
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
            /* const error = new Error(responseData.message || 'Failed to Fetch');
            throw error; */
        }
        newRequest['id'] = responseData.name;
        newRequest['coachId'] = payload.coachId;
        context.commit('addNewRequest', newRequest);
    },
    // To fetch Requests
    async fetchRequests(context) {
        if(!context.getters.shouldUpdate) {
            return;
        }
        const coachId = context.rootGetters.userId;
        const response = await fetch(`https://vue-http-demo-906e8-default-rtdb.firebaseio.com/requests/${coachId}.json`);
        const responseData = await response.json();
        console.log("Requests ",responseData);
        if(!response.ok) {
            const error = new Error(error.message || 'Failed to fetch!');
            throw error;
        }
        let requests = [];
        for(let key in responseData) {
            let request = {
                id: key,
                coachId,
                email: responseData[key]['email'],
                message: responseData[key]['message']
            }
            requests.push(request);
        }
        context.commit('setRequests', requests);
        context.commit('setLastFetch');
    }
}
export default {
    // To add a new Coach
    async addNewCoach(context, data) {
        const userId = context.rootGetters.userId;
        let response = await fetch(`https://vue-http-demo-906e8-default-rtdb.firebaseio.com/coaches/${userId}.json`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
        if(!response.ok) {
            /* const error = new Error(error.message || 'Failed to fetch!');
            throw error; */
        }
        context.commit('registerCoach', {
            ...data,
            id: userId
        });
    },
    // To fetch existing Coaches
    async fetchCoaches(context, payload) {
        if(!payload.forceRefresh && !context.getters.shouldUpdate) {
            return;
        }
        let response = await fetch(`https://vue-http-demo-906e8-default-rtdb.firebaseio.com/coaches.json`);
        if(!response.ok) {
            // Error
            const error = new Error(error.message || 'Failed to fetch!');
            throw error;
        }
        let responseData = await response.json();
        console.log("Coaches ",responseData);
        let coaches = [];
        for(let key in responseData) {
            let coachData = {
                id: key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                areas: responseData[key].areas,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate,
            };
            coaches.push(coachData);
        }
        context.commit('setCoaches', coaches);
        context.commit('setLastFetch');
    }
}
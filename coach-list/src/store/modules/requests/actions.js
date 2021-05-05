export default {
    addRequest(context, data) {
        let newRequest = {
            id: new Date().toISOString(),
            coachId: data.coachId,
            email: data.email,
            message: data.message
        };
        context.commit('addNewRequest', newRequest);
    }
}
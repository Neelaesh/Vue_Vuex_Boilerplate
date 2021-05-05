export default {
    addNewCoach(context, data) {
        data['id'] = context.rootGetters.userId;
        console.log("Data ",data);
        context.commit('registerCoach', data);
    }
}
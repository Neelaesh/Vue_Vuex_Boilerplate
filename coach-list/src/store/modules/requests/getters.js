export default {
  requests(state, _, _2, rootGetters) {
    const coachId = rootGetters.userId;
    return state.requests.filter((coach) => coach.coachId == coachId);
  },
  hasRequests(_, getters) {
    return getters.requests && getters.requests.length > 0;
  },
  shouldUpdate(state) {
    const lastFetchTimeStamp = state.lastFetch;
    if (!lastFetchTimeStamp) {
      return true;
    }
    const currentTimeStamp = new Date().getTime();
    return (currentTimeStamp - lastFetchTimeStamp) / 1000 > 60;
  },
};

<template>
    <section>
        <base-card>
            <header>
                <h2>Requests Recieved</h2>
            </header>
            <ul v-if="hasRequests">
                <request-item v-for="req in recievedRequests" :key="req.id" :email="req.email" :message="req.message"></request-item>
            </ul>
            <h3 v-else>You haven't recieved any requests yet!</h3>
        </base-card>
    </section>
</template>

<script>
import RequestItem from './RequestItem.vue';

export default {
    components: {
        RequestItem
    },
    computed: {
        recievedRequests() {
            return this.$store.getters['requests/requests'];
        },
        hasRequests() {
            return this.$store.getters['requests/hasRequests'];
        }
    }
}
</script>
<template>
    <base-card>
        <h2>Register as a Coach now!</h2>
        <coach-form @save-data="saveData"></coach-form>
    </base-card>
</template>

<script>
import CoachForm from './CoachForm.vue';

export default {
    components: {
        CoachForm
    },
    methods: {
        saveData(formData) {
            console.log("formData ",formData);
            this.$store.dispatch('coaches/addNewCoach',formData);
            this.$router.replace('/coaches');
        }
    }
}
</script>
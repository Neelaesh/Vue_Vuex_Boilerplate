<template>
    <div>
        <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>
        <section>
            <coach-filter @change-filters="setFilters"></coach-filter>
        </section>
        <section>
        <base-card>
            <div class="controls">
                <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
                <base-button link to="/register" v-if="!isLoading && !isCoach">Register as a Coach</base-button>
            </div>
            <div v-if="isLoading">
                <base-spinner></base-spinner>
            </div>
            <ul v-else-if="hasCoaches">
                <coach-item v-for="coach in filteredCoaches" 
                :key="coach.id"
                :id="coach.id"
                :firstName="coach.firstName"
                :lastName="coach.lastName"
                :areas="coach.areas"
                :hourlyRate="coach.hourlyRate"
                >{{ coach.firstName }}</coach-item>
            </ul>
            <h3 v-else>No Coaches Found</h3>
        </base-card>
        </section>
    </div>
</template>

<script>
import CoachItem from './CoachItem.vue';
import CoachFilter from './CoachFilter.vue';

export default {
    data() {
        return {
            isLoading: false,
            error: null,
            activeFilters : {
                frontend: true,
                backend: true,
                career: true
            }
        }
    },
    components: {
        CoachItem,
        CoachFilter
    },
    computed: {
        isCoach() {
            return this.$store.getters['coaches/isCoach'];
        },
        filteredCoaches() {
            let coaches = this.$store.getters['coaches/coaches'];
            return coaches.filter(coach => {
                if(this.activeFilters.frontend && coach.areas.includes('frontend')) {
                    return true;
                }
                if(this.activeFilters.backend && coach.areas.includes('backend')) {
                    return true;
                }
                if(this.activeFilters.career && coach.areas.includes('career')) {
                    return true;
                }
                return false;
            });
        },
        hasCoaches() {
            return this.$store.getters['coaches/hasCoaches'];
        }
    },
    methods: {
        setFilters(updatedFilters) {
            this.activeFilters = updatedFilters;
        },
        async loadCoaches(refresh = false) {
            this.isLoading = true;
            try{
                await this.$store.dispatch('coaches/fetchCoaches', {forceRefresh: refresh});
            }
            catch(error){
                this.error = error.message || 'Something went wrong!';
            }
            this.isLoading = false;
        },
        handleError() {
            this.error = null;
        }
    },
    created() {
        this.loadCoaches();
    }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}

p {
    font-weight: bold;
}
</style>
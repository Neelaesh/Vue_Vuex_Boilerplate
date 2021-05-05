<template>
    <div>
        <section>
            <coach-filter @change-filters="setFilters"></coach-filter>
        </section>
        <section>
        <base-card>
            <div class="controls">
                <base-button mode="outline">Refresh</base-button>
                <base-button link to="/register" v-if="!isCoach">Register as a Coach</base-button>
            </div>
            <ul v-if="hasCoaches">
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
        }
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
</style>
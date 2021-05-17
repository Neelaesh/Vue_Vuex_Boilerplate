<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstName"
        >First Name<span class="requiredField">*</span></label
      >
      <input
        type="text"
        id="firstName"
        v-model.trim="firstName.val"
        @blur="clearValidity('firstName')"
      />
      <p v-if="!firstName.isValid">First Name must not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastName"
        >Last Name<span class="requiredField">*</span></label
      >
      <input
        type="text"
        id="lastName"
        v-model.trim="lastName.val"
        @blur="clearValidity('lastName')"
      />
      <p v-if="!lastName.isValid">Last Name must not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>Areas of Expertise<span class="requiredField">*</span></h3>
      <div>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="career"
          value="career"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="career">Career Advisory</label>
      </div>
      <p v-if="!areas.isValid">Select atleast one of the Area of Expertise</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description"
        >Description<span class="requiredField">*</span></label
      >
      <textarea
        id="description"
        rows="5"
        v-model.trim="description.val"
        @blur="clearValidity('description')"
      ></textarea>
      <p v-if="!description.isValid">Description must not be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !hourlyRate.isValid }">
      <label for="hourlyRate"
        >Hourly Rates<span class="requiredField">*</span></label
      >
      <input
        type="number"
        id="hourlyRate"
        v-model.number="hourlyRate.val"
        @blur="clearValidity('hourlyRate')"
      />
      <p v-if="!hourlyRate.isValid">Hourly Rate must be greater than 0</p>
    </div>
    <p v-if="!formIsValid">Please check the Errors</p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  emits: ["save-data"],
  data() {
    return {
      firstName: {
        val: "",
        isValid: true,
      },
      lastName: {
        val: "",
        isValid: true,
      },
      areas: {
        val: [],
        isValid: true,
      },
      description: {
        val: "",
        isValid: true,
      },
      hourlyRate: {
        val: null,
        isValid: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      if (this.firstName.val == "") {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }
      if (this.lastName.val == "") {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }
      if (this.areas.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }
      if (this.description.val == "") {
        this.description.isValid = false;
        this.formIsValid = false;
      }
      if (!this.hourlyRate.val || this.hourlyRate.val < 0) {
        this.hourlyRate.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.formIsValid = true;
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }

      let formData = {
        firstName: this.firstName.val,
        lastName: this.lastName.val,
        areas: this.areas.val,
        description: this.description.val,
        hourlyRate: this.hourlyRate.val,
      };
      console.log("formData ", formData);
      this.$emit("save-data", formData);
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label,
.invalid p {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}

.requiredField {
  color: red;
}
</style>

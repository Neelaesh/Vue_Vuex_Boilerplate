<template>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">E-Mail</label>
          <input type="email" id="email" placeholder="Enter Email" v-model.trim="email"/>
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="Enter Password" v-model.trim="password"/>
        </div>
        <p class="errors" v-if="!formIsValid">Please enter a valid email and password (must be atleast 6 characters long)</p>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button mode="flat" @click="switchAuthMode">{{ switchAuthModeCaption }}</base-button>
      </form>
    </base-card>
</template>

<script>
export default {
    data() {
      return{
        email: '',
        password: '',
        formIsValid: true,
        mode: 'login'
      }
    },
    computed: {
      submitButtonCaption() {
        if(this.mode == 'login')
          return 'Login';
        else
          return 'SignUp';
      },
      switchAuthModeCaption() {
        if(this.mode == 'login')
          return 'SignUp Instead';
        else
          return 'Login Instead';
      }
    },
    methods: {
      submitForm() {
        this.formIsValid = true;
        console.log("True ");
        if(this.email == "" || !this.email.includes('@') || this.password.length < 6) {
          this.formIsValid = false;
          return;
        }
      },
      switchAuthMode() {
        if(this.mode == 'login'){
          this.mode = 'signup';
        }
        else{
          this.mode = 'login';
        }
      }
    }
}
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}
</style>
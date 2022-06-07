<template>
  <v-row no-gutters>
    <v-col>
      <v-app>
        <v-container>
          <h2 class="mb-3">Sign Up</h2>
          <v-col lg="7" md="7" sm="12" class="mx-auto">
            <v-form ref="signUpForm" @submit.prevent="signUpSubmit()" class="mb-3">
              <v-text-field
                v-model="formSignUp.email.value"
                :type="formSignUp.email.type"
                :label="formSignUp.email.label"
                :rules="formSignUp.email.rules"
              ></v-text-field>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="formSignUp.firstname.value"
                    :type="formSignUp.firstname.type"
                    :label="formSignUp.firstname.label"
                    :rules="formSignUp.firstname.rules"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="formSignUp.lastname.value"
                    :type="formSignUp.lastname.type"
                    :label="formSignUp.lastname.label"
                    :rules="formSignUp.lastname.rules"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-text-field
                v-model="formSignUp.password.value"
                :type="formSignUp.password.type"
                :label="formSignUp.password.label"
                :rules="formSignUp.password.rules"
              ></v-text-field>
              <div class="text-center">
                <v-btn color="success" type="submit" class="my-3">Sign Up</v-btn>
                <p>
                  Already have an acoount, Please <nuxt-link to="/auth/signin">Sign In</nuxt-link>
                </p>
              </div>
            </v-form>
          </v-col>
        </v-container>
      </v-app>
    </v-col>
  </v-row>
</template>
<script>
import { SIGNUP_MUTATION } from "~/graphql/userMutation"
export default {
  name: "Signup",
  middleware: ["isGuest"],
  data() {
    return {
      formSignUp: {
        email: {
          value: "",
          type: "email",
          label: "อีเมล",
          rules: [
            (v) => !!v || "อีเมล จำเป็นต้องกรอก",
            (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || "อีเมล ต้องถูกต้อง",
          ],
        },
        firstname: {
          value: "",
          type: "text",
          label: "ชื่อ",
          rules: [(v) => !!v || "ชื่อ จำเป็นต้องกรอก"],
        },
        lastname: {
          value: "",
          type: "text",
          label: "นามสกุล",
          rules: [(v) => !!v || "นามสกุล จำเป็นต้องกรอก"],
        },
        password: {
          value: "",
          type: "password",
          label: "รหัสผ่าน",
          rules: [
            (v) => !!v || "รหัสผ่าน จำเป็นต้องกรอก",
            (v) => v.length >= 6 || "รหัสผ่าน ต้องมีความยาวอย่างน้อย 6 ตัวอักษร",
          ],
        },
      },
    }
  },
  methods: {
    signUpSubmit() {
      if (!this.$refs.signUpForm.validate()) return
      this.$apollo
        .mutate({
          mutation: SIGNUP_MUTATION,
          variables: {
            email: this.formSignUp.email.value,
            fullname: `${this.formSignUp.firstname.value} ${this.formSignUp.lastname.value}`,
            password: this.formSignUp.password.value,
          },
        })
        .then((res) => {
          this.$router.push("/auth/signin")
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<template>
  <v-row no-gutters>
    <v-col>
      <v-app>
        <v-container>
          <h2 class="mb-3">Sign In</h2>
          <v-col lg="7" md="7" sm="12" class="mx-auto">
            <v-form ref="signInSubmit" @submit.prevent="signInSubmit()" class="mb-3">
              <v-text-field
                v-model="formSignIn.email.value"
                :type="formSignIn.email.type"
                :label="formSignIn.email.label"
                :rules="formSignIn.email.rules"
              ></v-text-field>
              <v-text-field
                v-model="formSignIn.password.value"
                :type="formSignIn.password.type"
                :label="formSignIn.password.label"
                :rules="formSignIn.password.rules"
              ></v-text-field>
              <div class="text-center">
                <v-btn color="primary" type="submit" class="my-3">Sign In</v-btn>
                <p>Not have an acoount, Please <nuxt-link to="/auth/signup">Sign Up</nuxt-link></p>
              </div>
            </v-form>
          </v-col>
        </v-container>
      </v-app>
    </v-col>
  </v-row>
</template>

<script>
import { SIGNIN_MUTATION } from "~/graphql/userMutation"
export default {
  name: "Signin",
  middleware: ["isGuest"],
  head() {
    return {
      title: "Sign In",
      meta: [
        {
          hid: "StudentBook - Sign In",
          name: "StudentBook - Sign In",
          content: "StudentBook Crud | Sign In",
        },
      ],
    }
  },
  data() {
    return {
      formSignIn: {
        email: {
          value: "",
          type: "email",
          label: "อีเมล",
          rules: [
            (v) => !!v || "อีเมล จำเป็นต้องกรอก",
            (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || "อีเมล ต้องถูกต้อง",
          ],
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
    signInSubmit() {
      if (!this.$refs.signInSubmit.validate()) return
      this.$apollo
        .mutate({
          mutation: SIGNIN_MUTATION,
          variables: {
            email: this.formSignIn.email.value,
            password: this.formSignIn.password.value,
          },
        })
        .then(async ({ data }) => {
          await this.$apolloHelpers.onLogin(data.signin.accessToken)
          this.$router.push("/")
        })
        .catch((err) => {
          console.error(err)
        })
    },
  },
}
</script>

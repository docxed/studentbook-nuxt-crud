<template>
  <v-row no-gutters>
    <v-col>
      <p v-if="me">{{ me.email }}</p>
      <v-btn color="error" @click="onLogout()">ลงชื่อออก</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "Account",
  middleware: ["isAuth"],
  data() {
    return {}
  },
  methods: {
    async onLogout() {
      await this.$apolloHelpers.onLogout()
      this.$router.push("/")
    },
  },
  computed: {
    ...mapGetters({
      isAuthenticated: "isAuthenticated",
      me: "me",
    }),
  },
}
</script>

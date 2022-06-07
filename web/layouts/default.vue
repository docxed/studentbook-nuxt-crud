<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <div v-for="(item, i) in items" :key="i">
          <v-list-item
            v-if="item.isAuthenticated === 'skip' || item.isAuthenticated === isAuthenticated"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <div>
        <v-tooltip v-if="!$vuetify.theme.dark" bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="info" small fab @click="changeTheme()">
              <v-icon class="mr-1">mdi-moon-waxing-crescent</v-icon>
            </v-btn>
          </template>
          <span>Dark Mode On</span>
        </v-tooltip>

        <v-tooltip v-else bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" color="info" small fab @click="changeTheme()">
              <v-icon color="yellow">mdi-white-balance-sunny</v-icon>
            </v-btn>
          </template>
          <span>Dark Mode Off</span>
        </v-tooltip>
      </div>
    </v-app-bar>
    <v-main>
      <v-container class="my-5">
        <Nuxt :key="$route.fullPath" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
export default {
  name: "DefaultLayout",
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "",
          title: "ลงชื่อเข้าใช้งาน",
          to: "/auth/signin",
          isAuthenticated: false,
        },
        {
          icon: "",
          title: "ลงทะเบียนเข้าใช้งาน",
          to: "/auth/signup",
          isAuthenticated: false,
        },
        {
          icon: "mdi-cog",
          title: "บัญชีผู้ใช้",
          to: "/account",
          isAuthenticated: true,
        },
        {
          icon: "mdi-home",
          title: "หน้าแรก",
          to: "/",
          isAuthenticated: false || "skip",
        },
        {
          icon: "mdi-account-multiple",
          title: "สร้างข้อมูลนักเรียน",
          to: "/createstudent",
          isAuthenticated: true,
        },
      ],
      miniVariant: false,
      right: true,
      title: "StudentBook",
    }
  },
  methods: {
    onMeChange() {
      this.$store.dispatch("getMe")
    },
    changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      localStorage.setItem("dark", this.$vuetify.theme.dark)
    },
    async onLogout() {
      await this.$apolloHelpers.onLogout()
    },
  },
  computed: {
    ...mapGetters({
      isAuthenticated: "isAuthenticated",
      me: "me",
    }),
  },
  mounted() {
    this.onMeChange()
    const dark = localStorage.getItem("dark")
    if (dark) {
      this.$vuetify.theme.dark = JSON.parse(dark)
    }
  },
  watch: {
    $route(to, from) {
      this.onMeChange()
    },
  },
}
</script>

<template>
  <v-row no-gutters>
    <v-col>
      <h2 class="mb-3">เพิ่มข้อมูลนักเรียน</h2>
      <v-col lg="7" md="7" sm="12" class="mx-auto">
        <v-form ref="createStudentForm" @submit.prevent="createStudentSubmit()" class="mb-3">
          <v-text-field
            v-model="formCreateStudent.studentId.value"
            :type="formCreateStudent.studentId.type"
            :label="formCreateStudent.studentId.label"
            :rules="formCreateStudent.studentId.rules"
          ></v-text-field>
          <v-row>
            <v-col>
              <v-text-field
                v-model="formCreateStudent.firstname.value"
                :type="formCreateStudent.firstname.type"
                :label="formCreateStudent.firstname.label"
                :rules="formCreateStudent.firstname.rules"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="formCreateStudent.lastname.value"
                :type="formCreateStudent.lastname.type"
                :label="formCreateStudent.lastname.label"
                :rules="formCreateStudent.lastname.rules"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-text-field
            v-model="formCreateStudent.address.value"
            :type="formCreateStudent.address.type"
            :label="formCreateStudent.address.label"
            :rules="formCreateStudent.address.rules"
          ></v-text-field>
          <div class="text-center">
            <v-btn color="primary" type="submit" class="my-3">Create Student</v-btn>
          </div>
        </v-form>
      </v-col>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex"
import { STUDENTS_MUTATION } from "../../graphql/studentMutation"
export default {
  name: "Createstudent",
  middleware: ["isAuth"],
  head() {
    return {
      title: "Create Student",
      meta: [
        {
          hid: "StudentBook - Create Student",
          name: "StudentBook - Create Student",
          content: "StudentBook Crud | Create Student",
        },
      ],
    }
  },
  data() {
    return {
      formCreateStudent: {
        studentId: {
          value: "",
          type: "text",
          label: "รหัสนักเรียน",
          rules: [
            (v) => !!v || "รหัสนักเรียน จำเป็นต้องกรอก",
            (v) => /^[0-9]{5}$/.test(v) || "รหัสนักเรียน ต้องมีความยาว 5 ตัวอักษร",
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
        address: {
          value: "",
          type: "text",
          label: "ที่อยู่",
          rules: [(v) => !!v || "ที่อยู่ จำเป็นต้องกรอก"],
        },
      },
    }
  },
  methods: {
    createStudentSubmit() {
      if (!this.$refs.createStudentForm.validate()) return
      const payload = {
        studentId: this.formCreateStudent.studentId.value,
        firstname: this.formCreateStudent.firstname.value,
        lastname: this.formCreateStudent.lastname.value,
        address: this.formCreateStudent.address.value,
      }
      this.$apollo
        .mutate({
          mutation: STUDENTS_MUTATION,
          variables: {
            record: {
              ...payload,
              createByUserId: this.me.userId,
            },
          },
        })
        .then((res) => {
          this.$router.push("/")
        })
        .catch((err) => {
          console.log(err)
        })
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

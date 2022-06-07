<template>
  <v-row>
    <v-col>
      <h2>Home</h2>
      <br /><br />
      <v-row>
        <v-col lg="4" md="6" sm="6" cols="12" v-for="student in students.data" :key="student._id">
          <v-card class="pa-3">
            <v-card-title>{{ student.fullname }}</v-card-title>
            <v-card-subtitle>รหัสนักเรียน {{ student.studentId }}</v-card-subtitle>
            <v-card-text
              ><div>ที่อยู่ {{ student.address }}</div>
              <div class="text-right">โดย {{ student.user.fullname }}</div></v-card-text
            >
            <v-card-actions>
              <v-spacer />
              <span class="me-2"
                ><v-btn color="info" @click="pickToEdit(student)">แก้ไข</v-btn></span
              >
              <span><v-btn color="error" @click="onDeleteStudent(student._id)">ลบ</v-btn></span>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <div v-if="dialogVisible">
        <EditDialog
          :studentToEdit="studentToEdit"
          :dialogVisible.sync="dialogVisible"
          @onUpdateStudent="onUpdateStudent"
        />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { STUDENTS_QUERY } from "~/graphql/studentQuery"
import { DELETE_STUDENT_MUTATION, UPDATE_STUDENT_MUTATION } from "~/graphql/studentMutation"
import { mapGetters } from "vuex"
export default {
  name: "Home",
  data() {
    return {
      dialogVisible: false,
      studentToEdit: {},
      students: {
        data: [],
      },
    }
  },
  methods: {
    pickToEdit(student) {
      this.studentToEdit = student
      this.dialogVisible = true
    },
    onUpdateStudent(payload) {
      this.$apollo
        .mutate({
          mutation: UPDATE_STUDENT_MUTATION,
          variables: {
            id: payload._id,
            record: {
              studentId: payload.studentId,
              firstname: payload.firstname,
              lastname: payload.lastname,
              address: payload.address,
            },
          },
        })
        .then(({ data }) => {
          this.onGetStudents()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    onGetStudents() {
      this.$apollo
        .query({
          query: STUDENTS_QUERY,
          fetchPolicy: "network-only",
        })
        .then((res) => {
          this.students = {
            data: res.data.students,
          }
        })
    },
    onDeleteStudent(studentId) {
      this.$apollo
        .mutate({
          mutation: DELETE_STUDENT_MUTATION,
          variables: {
            studenId: studentId,
          },
        })
        .then(() => {
          this.onGetStudents()
        })
    },
  },
  computed: {
    ...mapGetters({
      isAuthenticated: "isAuthenticated",
      me: "me",
    }),
  },
  mounted() {
    this.onGetStudents()
  },
}
</script>

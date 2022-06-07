<template>
  <v-row justify="center">
    <v-dialog v-model="dialogVisible" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">แก้ไขข้อมูล</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="createStudentForm" @submit.prevent="" class="mb-3">
              <v-text-field
                v-model="formEditStudent.studentId.value"
                :type="formEditStudent.studentId.type"
                :label="formEditStudent.studentId.label"
                :rules="formEditStudent.studentId.rules"
              ></v-text-field>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="formEditStudent.firstname.value"
                    :type="formEditStudent.firstname.type"
                    :label="formEditStudent.firstname.label"
                    :rules="formEditStudent.firstname.rules"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="formEditStudent.lastname.value"
                    :type="formEditStudent.lastname.type"
                    :label="formEditStudent.lastname.label"
                    :rules="formEditStudent.lastname.rules"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-text-field
                v-model="formEditStudent.address.value"
                :type="formEditStudent.address.type"
                :label="formEditStudent.address.label"
                :rules="formEditStudent.address.rules"
              ></v-text-field>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="sendDialogVisible()"> ยกเลิก </v-btn>
          <v-btn color="blue darken-1" text @click="onUpdateStudent()"> บันทึก </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  name: "EditDialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    studentToEdit: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      formEditStudent: {
        studentId: {
          value: "",
          type: "text",
          label: "รหัสนักเรียน",
          rules: [
            (v) => !!v || "รหัสนักเรียน จำเป็นต้องกรอก",
            (v) => /^[0-9]{5}$/.test(v) || "รหัสนักเรียน ต้องมีความยาว 5 ตัวอัษร",
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
    setStudentEdit() {
      this.formEditStudent.studentId.value = this.studentToEdit.studentId
      this.formEditStudent.firstname.value = this.studentToEdit.firstname
      this.formEditStudent.lastname.value = this.studentToEdit.lastname
      this.formEditStudent.address.value = this.studentToEdit.address
    },
    sendDialogVisible() {
      this.$emit("update:dialogVisible", false)
    },
    onUpdateStudent() {
      const payload = {
        _id: this.studentToEdit._id,
        studentId: this.formEditStudent.studentId.value,
        firstname: this.formEditStudent.firstname.value,
        lastname: this.formEditStudent.lastname.value,
        address: this.formEditStudent.address.value,
      }
      this.$emit("onUpdateStudent", payload)
      this.sendDialogVisible()
    },
  },
  computed: {},
  watch: {},
  created() {
    this.setStudentEdit()
  },
}
</script>

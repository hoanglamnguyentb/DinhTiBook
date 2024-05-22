<template>
  <div>
    <a-modal v-model:open="open" title="Đổi mật khẩu" @ok="handleOk" @cancel="closeModal">
      <a-form ref="formRef" :model="matkhau" :rules="rules" layout="vertical">
        <a-form-item ref="oldPassword" label="Mật khẩu cũ ( chưa trả về lỗi khi nhập mk cũ sai )"  name="oldPassword">
          <a-input v-model:value="matkhau.oldPassword" />
        </a-form-item>
        <a-form-item ref="newPassword" label="Mật khẩu mới" name="newPassword">
          <a-input v-model:value="matkhau.newPassword" />
        </a-form-item>
        <a-form-item
          ref="confirmPassword"
          label="Nhập lại mật khẩu mới"
          name="confirmPassword"
        >
          <a-input v-model:value="matkhau.confirmPassword" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import APIService from "@/helpers/ApiService";
export default {
  data() {
    return {
      open: false,
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 14,
      },
      matkhau: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      rules: {
        oldPassword: [
          { required: true, message: "Nhập mật khẩu cũ!" },
          { min: 6, max: 20, message: "Độ dài từ 6-20 kí tự" },
        ],
        newPassword: [
          { required: true, message: "Nhập mật khẩu mới!" },
          { min: 6, max: 20, message: "Độ dài từ 6-20 kí tự" },
        ],
        confirmPassword: [
          { required: true, message: "Nhập lại mật khẩu mới!" },
          { min: 6, max: 20, message: "Độ dài từ 6-20 kí tự" },
          {
            validator: this.validateConfirmPassword,
            message: "Mật khẩu mới không trùng khớp!",
          },
        ],
      },
    };
  },
  methods: {
    async showModal() {
      this.open = true;
    },
    closeModal() {
      this.open = false;
    },
    handleOk() {
      this.$refs.formRef.validate().then(async () => {
        try {
          if (this.matkhau.newPassword != this.matkhau.confirmPassword) {
            this.$message.error("Mật khẩu nhập lại không trùng khớp!");
          } 
          else {
            var result = await APIService.put(`/user/ChangePassword`, this.matkhau);
            if (result.data.status === "Error") {
        // Nếu kết quả trả về là lỗi
        if (result.data.code === 0) {
          // Kiểm tra mã lỗi
          this.$message.error(result.data.message); // Hiển thị thông báo lỗi
          
        }
      }
            this.$message.success(result.data.message);
            this.closeModal();
            this.$emit("addSuccess");
          }
        } catch (error) {
          console.log("error", error);
        }
      });
    },
    resetForm() {
      this.$refs.formRef.resetFields();
    },
  },
};
</script>

<style></style>

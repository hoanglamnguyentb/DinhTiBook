<template>
  <div>
    <a-modal
      v-model:open="open"
      title="Cập nhật hồ sơ"
      @ok="handleOk"
      @cancel="closeModal"
    >
      <a-form ref="formRef" :model="profile" layout="vertical">
        <a-form-item ref="email" label="Địa chỉ Email" name="email">
          <a-input v-model:value="profile.email" />
        </a-form-item>
        <a-form-item ref="fullName" label="Tên đầy đủ" name="fullName">
          <a-input v-model:value="profile.fullName" />
        </a-form-item>
        <a-form-item ref="phoneNumber" label="Số điện thoại" name="phoneNumber">
          <a-input v-model:value="profile.phoneNumber" />
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
      profile: {
        email: "",
        fullName: "",
        phoneNumber: "",
      },
    };
  },
  methods: {
    async showModal() {
      this.open = true;
      var res = await APIService.get(`/user/FindUserInfo`);
      this.profile = res.data.data;
    },
    closeModal() {
      this.open = false;
      this.$router.go(0);
    },
    handleOk() {
      this.$refs.formRef.validate().then(async () => {
        try {
          var result = await APIService.put(`/user/EditProfile`, this.profile);
          this.closeModal();
          this.$message.success("result.data.message");
          this.$emit("addSuccess");
        } catch (error) {
          console.log("error", error);
          // Bạn có thể xử lý lỗi ở đây nếu cần
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

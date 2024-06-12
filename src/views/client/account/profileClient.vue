<template>
  <Header></Header>
  <div style="margin-top: 50px; margin-bottom: 50px;" class="container">
    <a-card>

<a-layout>
  
  <div class="edit-button">
    <a-button type="primary" @click="openModalChangePass()"> Đổi mật khẩu </a-button>
    <a-button style="margin-left: 10px" type="primary" @click="openModalEdit()">
      Chỉnh sửa hồ sơ
    </a-button>
  </div>
  <a-card style="margin-top: 10px">
    <h5>Thông tin tài khoản</h5>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :bordered="false"
      :pagination="false"
      :size="'small'"
    >
    </a-table>
  </a-card>
</a-layout>
</a-card>
  </div>
 
  <ModalChangePassword ref="modalChangePassword"></ModalChangePassword>
  <ModalEditProfile ref="modalEditProfile"></ModalEditProfile>
  <FooterClient></FooterClient>
</template>

<script>
import Header from '@/components/Header';
import FooterClient from '@/components/FooterClient.vue';
import APIService from "@/helpers/ApiService";
import ModalChangePassword from "./ModalChangePassword.vue";
import ModalEditProfile from "./ModalEditProfile.vue";
export default {
  created() {},
  mounted() {
    this.showModal();
  },
  components: {
    ModalChangePassword,
    ModalEditProfile,
    Header,
    FooterClient
  },
  data() {
    return {
      user: {},
      columns: [
        {
          dataIndex: "field",
        },
        {
          dataIndex: "value",
        },
      ],
      dataSource: [
        {
          key: "1",
          field: "Họ và tên",
          value: "",
        },
        {
          key: "2",
          field: "Địa chỉ Email",
          value: "",
        },
        
        {
          key: "3",
          field: "Só điện thoại",
          value: "",
        },
       
      ],
    };
  },
  methods: {
    openModalChangePass() {
      this.$refs.modalChangePassword.showModal();
    },
    openModalEdit() {
      this.$refs.modalEditProfile.showModal();
    },
    async showModal() {
      this.open = true;
      const id = localStorage.getItem('userClient')
      var res = await APIService.get(`/User/`+id);
      this.user = res.data.data;
      this.dataSource[0].value = this.user.fullName;
      this.dataSource[1].value = this.user.email;

      this.dataSource[2].value = this.user.phoneNumber;
      this.dataSource[4].value = this.user.phoneNumberComfirmed
        ? "Đã xác thực"
        : "Chưa xác thực";
      this.dataSource[5].value = this.user.twoFactorEnable ? "Bật" : "Tắt";
      this.dataSource[5].color = this.user.twoFactorEnable ? "green" : "red";

    },
  },
};
</script>

<style scoped>
h3 {
  color: white;
  white-space: nowrap;
}

.edit-button {
  margin-left: auto;
  margin-top: 20px;
}
.img-background {
  display: flex;
  justify-content: space-between;
  z-index: 1000;
  flex-wrap: wrap;
  display: block;
  color: white;
}
</style>

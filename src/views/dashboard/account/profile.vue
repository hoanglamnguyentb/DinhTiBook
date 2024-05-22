<template>
  <a-card>
    <div class="profile-wid-bg">
      <img
        width="100%"
        height="320px"
        src="https://velzon-svelte-default.vercel.app/_app/immutable/assets/profile-bg.da0d9401.jpg"
        alt=""
      />
    </div>
    <a-layout>
      <div class="img-background">
        <a-button type="primary" style="display: inline; float: right">
          <router-link :to="{ name: 'QL_NhatKy' }">
            <i
              class="ri-equalizer-line fs-16"
              style="margin-right: 5px; vertical-align: middle"
            ></i>
            <span style="vertical-align: middle">Nhật ký tài khoản</span>
          </router-link>
        </a-button>
        <h3>{{ user.fullName }}</h3>
        <p>Quyền :</p>
        <p>Địa chỉ :</p>
      </div>
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
  <ModalChangePassword ref="modalChangePassword"></ModalChangePassword>
  <ModalEditProfile ref="modalEditProfile"></ModalEditProfile>
</template>

<script>
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
          field: "Xác minh email",
          value: "",
        },
        {
          key: "4",
          field: "Só điện thoại",
          value: "",
        },
        {
          key: "5",
          field: "Xác minh số điện thoại",
          value: "",
        },
        {
          key: "6",
          field: "Xác thực 2 bước",
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
      var res = await APIService.get(`/user/FindUserInfo`);
      this.user = res.data.data;
      this.dataSource[0].value = this.user.fullName;
      this.dataSource[1].value = this.user.email;
      this.dataSource[2].value = this.user.emailComfirmed
        ? "Đã xác thực"
        : "Chưa xác thực";
      this.dataSource[3].value = this.user.phoneNumber;
      this.dataSource[4].value = this.user.phoneNumberComfirmed
        ? "Đã xác thực"
        : "Chưa xác thực";
      this.dataSource[5].value = this.user.twoFactorEnable ? "Bật" : "Tắt";
      this.dataSource[5].color = this.user.twoFactorEnable ? "green" : "red";
      //       this.dataSource[5].value = `<a-tag :color="this.user.twoFactorEnable ? 'blue' : 'gray'" @click="toggleTwoFactor">
      //   {this.user.twoFactorEnable ? 'Bật' : 'Tắt'}
      // </a-tag>`;
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
  margin-top: 50px;
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

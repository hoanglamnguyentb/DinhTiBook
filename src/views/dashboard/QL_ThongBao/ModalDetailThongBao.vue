<template>
  <div>
    <a-modal v-model:open="open" title="Chi tiết thông báo" :footer="null">
      <a-form 
      ref="formRef" 
      :model="thongbao" 
      :rules="rules" 
      layout="vertical">
        <a-form-item ref="createdBy" label="Người gửi" name="createdBy">
          <div>{{ thongbao.createdBy }}</div>
        </a-form-item>
        <a-form-item ref="noiDung" label="Nội dung" name="noiDung">
          <div>{{ thongbao.noiDung }}</div>
        </a-form-item>
        <a-form-item ref="link" label="Liên kết" name="link">
          <div>{{ thongbao.link }}</div>
        </a-form-item>
        <!-- <a-form-item ref="daXem" label="Trạng thái" name="daXem">
          <div :color="thongbao.daXem === false ? 'blue' : 'green'" >{{ thongbao.daXem ? "Đã đọc" : "Chưa đọc" }}</div>
        </a-form-item> -->
        <a-form-item ref="createdDate" label="Thời gian" name="createdDate">
          <span>{{ thongbao.createdDate }}</span>
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
      id: undefined,
      thongbao: {},
    };
  },
  methods: {
    formatDate(dateStr) {
      return (
        dateStr.slice(8, 10) +
        "-" +
        dateStr.slice(5, 7) +
        "-" +
        dateStr.slice(0, 4) +
        " " +
        dateStr.slice(11, 19)
      );
    },
    async showModal(id) {
      this.open = true;
      if (id) {
        var res = await APIService.get(`/ThongBao/${id}`);
        this.id = id;
        this.thongbao = res.data.data;
        this.thongbao.createdDate = this.formatDate(this.thongbao.createdDate)
      }
    },
  },
};
</script>

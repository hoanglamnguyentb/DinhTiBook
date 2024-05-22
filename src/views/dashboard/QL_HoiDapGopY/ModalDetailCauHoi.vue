<template>
  <div>
    <a-modal v-model:open="open" title="Thông tin câu hỏi" :footer="null">
      <a-form ref="formRef" :model="cauhoi" :rules="rules" layout="vertical">
        <a-form-item ref="cauHoi" label="Câu hỏi" name="cauHoi">
          <div>{{ cauhoi.cauHoi }}</div>
        </a-form-item>
        <a-form-item ref="ten" label="Câu trả lời" name="ten">
          <div>{{ cauhoi.cauTraLoi }}</div>
        </a-form-item>
        <a-form-item ref="trangThai" label="Trạng thái" name="trangThai">
          <div>{{ cauhoi.trangThai }}</div>
        </a-form-item>
        <a-form-item ref="ngayPhatHanh" label="Ngày phát hành" name="ngayPhatHanh">
          <span>{{ cauhoi.ngayPhatHanh }}</span>
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
      cauhoi: {},
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
        var res = await APIService.get(`/HoiDapGopY/${id}`);
        this.id = id;
        this.cauhoi = res.data.data;
        this.cauhoi.ngayPhatHanh = this.formatDate(this.cauhoi.ngayPhatHanh)
      }
    },
  },
};
</script>

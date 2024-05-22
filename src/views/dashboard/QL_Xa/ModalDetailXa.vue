<template>
  <div>
    <a-modal v-model:open="open" title="Thông tin xã" :footer="null">
      <a-form ref="formRef" :model="xa" :rules="rules" layout="vertical">
        <a-form-item ref="ma" label="Mã xã" name="ma">
          <div>{{ xa.ma }}</div>
        </a-form-item>
        <a-form-item ref="ten" label="Tên xã" name="ten">
          <div>{{ xa.ten }}</div>
        </a-form-item>
        <a-form-item ref="kinhDo" label="Kinh độ" name="kinhDo">
          <div>{{ xa.kinhDo }}</div>
        </a-form-item>
        <a-form-item ref="viDo" label="Vĩ độ" name="viDo">
          <div>{{ xa.viDo }}</div>
        </a-form-item>
        <a-form-item ref="polygon" label="Polygon" name="polygon">
          <div>{{ xa.polygon }}</div>
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
      xa: {},
    };
  },
  methods: {
    async showModal(id) {
      this.open = true;
      if (id) {
        var res = await APIService.get(`/DonViHanhChinh/${id}`);
        this.id = id;
        this.xa = res.data.data;
      }
    },
  },
};
</script>

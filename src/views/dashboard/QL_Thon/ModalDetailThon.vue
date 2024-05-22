<template>
  <div>
    <a-modal v-model:open="open" title="Thông tin thôn" :footer="null">
      <a-form ref="formRef" :model="thon" :rules="rules" layout="vertical">
        <a-form-item ref="ma" label="Mã thôn" name="ma">
          <div>{{ thon.ma }}</div>
        </a-form-item>
        <a-form-item ref="ten" label="Tên thôn" name="ten">
          <div>{{ thon.ten }}</div>
        </a-form-item>
        <a-form-item ref="kinhDo" label="Kinh độ" name="kinhDo">
          <div>{{ thon.kinhDo }}</div>
        </a-form-item>
        <a-form-item ref="viDo" label="Vĩ độ" name="viDo">
          <div>{{ thon.viDo }}</div>
        </a-form-item>
        <a-form-item ref="polygon" label="Polygon" name="polygon">
          <div>{{ thon.polygon }}</div>
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
      thon: {},
    };
  },
  methods: {
    async showModal(id) {
      this.open = true;
      if (id) {
        var res = await APIService.get(`/IpManager/${id}`);
        this.id = id;
        this.thon = res.data.data;
      }
    },
  },
};
</script>

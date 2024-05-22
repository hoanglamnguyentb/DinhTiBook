<template>
    <div>
      <a-modal v-model:open="open" title="Thông tin chi tiết" :footer="null">
        <a-form ref="formRef" :model="nhatky" :rules="rules" layout="vertical">
          <a-form-item ref="browser" label="Trình duyệt" name="browser">
            <div>{{ nhatky.browser }}</div>
          </a-form-item>
          <a-form-item ref="noiDung" label="Nội dung" name="noiDung">
            <div>{{ nhatky.noiDung }}</div> 
          </a-form-item>
          <a-form-item ref="platform" label="Hệ điều hành" name="platform">
            <div>{{ nhatky.platform }}</div>
          </a-form-item>
          <a-form-item ref="ip" label="IP" name="ip">
            <div>{{ nhatky.ip }}</div>
          </a-form-item>
          
          <a-form-item ref="isMobile" label="Mobile" name="isMobile">
            <div>{{ nhatky.isMobile }}</div>
          </a-form-item>
          <a-form-item ref="version" label="Phiên bản" name="version">
            <div>{{ nhatky.version }}</div>
          </a-form-item>
          <a-form-item ref="time" label="Thời gian" name="time">
            <div>{{ nhatky.time }}</div>
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
        nhatky: {},
      };
    },
    methods: {
      async showModal(id) {
        this.open = true;
        if (id) {
          var res = await APIService.get(`/loghethong/${id}`);
          this.id = id;
          this.nhatky = res.data.data;
        }
      },
    },
  };
  </script>
  
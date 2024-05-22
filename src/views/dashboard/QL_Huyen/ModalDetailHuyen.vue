<template>
  <div>
    <a-modal v-model:open="open" title="Thông tin huyện" :footer="null">
      <a-form 
        ref="formRef" 
        :model="huyen" 
        :rules="rules" 
        layout="vertical">
        <a-form-item ref="ten" label="Tên huyện" name="ten">
          <div>{{ huyen.ten}}</div>
        </a-form-item>
        <a-form-item ref="ma" label="Mã huyện" name="ma">
          <div>{{  huyen.ma}}</div>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import APIService from "@/helpers/ApiService"

export default {
  data() {
    return {
      open: false,
      id: undefined,
      huyen: {
      },
    };
  },
  methods: {
    async showModal(id) {
      this.open = true
      if(id) {
        var res = await APIService.get(`/DonViHanhChinh/${id}`)
        this.id = id
        this.huyen = res.data.data
      }
    },
  }
}

</script>
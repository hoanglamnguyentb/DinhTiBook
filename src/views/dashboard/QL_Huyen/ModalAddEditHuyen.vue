<template>
  <div>
    <a-modal v-model:open="open" :title="id ? 'Cập nhật huyện': 'Thêm huyện'" @ok="handleOk" @cancel="closeModal" >
      <a-form 
        ref="formRef" 
        :model="huyen" 
        :rules="rules" 
        layout="vertical">
        <a-form-item ref="ten" label="Tên huyện" name="ten">
          <a-input v-model:value="huyen.ten" />
        </a-form-item>
        <a-form-item ref="ma" label="Mã huyện" name="ma">
          <a-input v-model:value="huyen.ma" />
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
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 14,
      },
      id: undefined,
      huyen: {
        ten: '',
        ma: '',
        parentId: '6',
        kinhDo: 0,
        viDo: 0,
        polygon: "",
        loai:"HUYEN",
      },
      rules: {
        ten: [
          {
            required: true,
            message: 'Tên huyện là bắt buộc',
            trigger: 'change',
          },
          {
            min: 3,
            max: 20,
            message: 'Độ dài từ 3-20',
            trigger: 'blur',
          },
        ],
        ma: [
          {
            required: true,
            message: 'Mã huyện là bắt buộc',
            trigger: 'change',
          },
          {
            min: 3,
            max: 20,
            message: 'Độ dài từ 3-20',
            trigger: 'blur',
          },
        ],
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
    closeModal() {
      this.id = undefined
      this.resetForm()
    },
    handleOk() {
      this.$refs.formRef.validate().then(async () => {
        this.open = false
        if (this.id) {
          await APIService.put(`/DonViHanhChinh/edit/${this.id}`,this.huyen) 
          this.$message.success('Cập nhật huyện thành công')
        }
        else {
          await APIService.post("/DonViHanhChinh/createHuyen",this.huyen)
          this.$message.success('Thêm huyện thành công')
        }
        this.closeModal()
        this.$emit('addSuccess')
      }).catch(error => {
        console.log('error', error);
      });
    },
    resetForm() {
      this.$refs.formRef.resetFields();
    },
  }
}

</script>
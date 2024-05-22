<template>
  <div>
    <a-modal
      v-model:open="open"
      :title="id ? 'Cập nhật thôn' : 'Thêm thôn'"
      @ok="handleOk"
      @cancel="closeModal"
    >
      <a-form ref="formRef" :model="thon" :rules="rules" layout="vertical">
        <a-form-item ref="ma" label="Mã thôn" name="ma">
          <a-input v-model:value="thon.ma" />
        </a-form-item>
        <a-form-item ref="ten" label="Tên thôn" name="ten">
          <a-input v-model:value="thon.ten" />
        </a-form-item>
        <a-form-item ref="kinhDo" label="Kinh độ" name="kinhDo">
          <a-input v-model:value="thon.kinhDo" />
        </a-form-item>
        <a-form-item ref="viDo" label="Vĩ độ" name="viDo">
          <a-input v-model:value="thon.viDo" />
        </a-form-item>
        <a-form-item ref="polygon" label="Polygon" name="polygon">
          <a-input v-model:value="thon.polygon" />
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
      id: undefined,
      thon: {
        ten: "",
        ma: "",
        //parenId: "001",
        parentId: this.$route.params.id,
        kinhDo: 0,
        viDo: 0,
        polygon: "",
        loai:"THON",
      },
      rules: {
        ma: [
          {
            required: true,
            message: "Mã thôn là bắt buộc",
            trigger: "change",
          },
          {
            min: 2,
            max: 20,
            message: "Độ dài từ 2-20",
            trigger: "blur",
          },
        ],
        parentId:[],
        ten: [
          {
            required: true,
            message: "Tên thôn là bắt buộc",
            trigger: "change",
          },
          {
            min: 3,
            max: 20,
            message: "Độ dài từ 3-20",
            trigger: "blur",
          },
        ],
        // xaId: [],
        kinhDo: [],
        viDo: [],
        polygon: [],
        loai:[],
      },
    };
  },
  methods: {
    async showModal(id) {
      
      this.open = true;
      if (id) {
        var res = await APIService.get(`/DonViHanhChinh/${id}`);
        this.id = id;
        this.thon = res.data.data;
      }
    },
    closeModal() {
      this.open = false;
      this.id = undefined;
      this.resetForm();
    },
    handleOk() {
      this.$refs.formRef
        .validate()
        .then(async () => {
          if (this.id) {
            await APIService.put(`/DonViHanhChinh/edit/${this.id}`, this.thon);
            this.$message.success("Cập nhật thôn thành công");
          } else {
            await APIService.post(`/DonViHanhChinh/createThon`, this.thon);
            this.$message.success("Thêm thôn thành công");

          }
          this.closeModal();
          this.$emit("addSuccess");
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    resetForm() {
      this.$refs.formRef.resetFields();
    },
  },
};
</script>

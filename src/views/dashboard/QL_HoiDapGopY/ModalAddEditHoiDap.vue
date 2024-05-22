<template>
  <div>
    <a-modal
      v-model:open="open"
      title="Cập nhật hỏi đáp"
      @ok="handleOk"
      @cancel="closeModal"
    >
      <a-form ref="formRef" :model="cauhoi" :rules="rules" layout="vertical">
        <a-form-item ref="cauHoi" label="Câu hỏi" name="cauHoi">
          <a-input v-model:value="cauhoi.cauHoi" />
        </a-form-item>
        <a-form-item ref="cauTraLoi" label="Câu trả lời" name="cauTraLoi">
          <a-textarea v-model:value="cauhoi.cauTraLoi" />
        </a-form-item>
        <a-form-item
          :initial-value="lstTrangThai[1].value"
          ref="trangThai"
          label="Trạng thái"
          name="trangThai"
        >
          <a-select
            v-model:value="cauhoi.trangThai"
            autoClearSearchValue="true"
            @change="handleChangeSelect"
          >
            <a-select-option
              v-for="item in lstTrangThai"
              :key="item.key"
              :value="item.value"
              >{{ item.value }}</a-select-option
            >
          </a-select>
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
      lstTrangThai: [
        { key: "Chưa trả lời", value: "Chưa trả lời" },
        { key: "Đã xuất bản", value: "Đã xuất bản" },
        { key: "Đã trả lời", value: "Đã trả lời" },
      ],
      wrapperCol: {
        span: 14,
      },
      id: undefined,
      cauhoi: {
        cauHoi: "",
        cauTraLoi: "",
        trangThai: "0",
        ngayPhatHanh: "",
      },
      notifi: {
        nguoiGui: "",
        nguoiNhan: "",
        noiDung: "",
        daXem: false,
        link: this.$route.path,
      },
      rules: {
        cauHoi: [
          {
            required: true,
            message: "Trường này là bắt buộc",
            trigger: "change",
          },
          {
            min: 10,
            message: "Độ dài từ 10 kí tự trở lên",
            trigger: "blur",
          },
        ],
        cauTraLoi: [],
        trangThai: [],
      },
    };
  },
  methods: {
    async showModal(id) {
      this.open = true;
      if (id) {
        var res = await APIService.get(`/HoiDapGopY/${id}`);
        this.id = id;
        this.cauhoi = res.data.data;
      }
    },
    handleChangeSelect(selectedValue) {
      this.cauhoi.trangThai = selectedValue;
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
            this.cauhoi.ngayPhatHanh = "2002";
            await APIService.put(`/HoiDapGopY/edit/${this.id}`, this.cauhoi); // Update question and answer
            this.$message.success("Cập nhật thành công");
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

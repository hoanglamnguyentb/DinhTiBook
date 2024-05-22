<template>
  <a-card title="Import Huyện">
    <a-spin :spinning="loading" size="large">
      <div>
        <a-steps :current="current" :items="items"></a-steps>
        <div class="steps-content">
          <div v-if="current == 0">
            <a-form :label-col="labelCol" :wrapper-col="wrapperCol" ref="formRef" layout="horizontal">
              <a-form-item ref="maHuyen" label="Mẫu file Excel" style="margin-top: 10px;">
                <a-button style="color: #1677ff;" size="large" @click="downloadTemplate">
                  <template #icon>
                    <DownloadOutlined />
                  </template>
                  Huyen_Template.xlsx
                </a-button>
              </a-form-item>
              <a-form-item ref="fileNameUploaded" label="Tệp nhập dữ liệu" name="fileNameUploaded">
                <a-button size="large" style="color: #1677ff;" @click="$refs.inpFile.click()">
                  <template #icon>
                    <UploadOutlined />
                  </template>
                  {{ dataImport.fileNameUploaded ? dataImport.fileNameUploaded : 'Upload your file' }}
                  <input ref="inpFile" id="inpFile" accept=".xlsx,.xls" type="file" @change="upload"
                    style="display: none" />
                </a-button>
              </a-form-item>
            </a-form>
          </div>
          <div v-if="current == 1">
            <a-card>
              <a-table class="huyen-table" :columns="columns" :data-source="dataImport.huyens"
                :scroll="{ x: 1000 }" :row-selection="rowSelection" tableLayout="fixed" rowKey="ma">
                <template #title>
                  <h4>Dữ liệu hợp lệ</h4>
                </template>
                <template #footer>
                  <a-button :disabled="dataImport.huyens.length <= 0" @click="save" type="primary">Cập nhật</a-button>
                </template>
              </a-table>
            </a-card>
            <a-card style="margin-top: 10px;">
              <a-table class="huyen-table-error" :columns="columnsError" :data-source="dataImport.errorData"
                :pagination="{ pageSize: 50 }" :scroll="{ x: 1000}" tableLayout="fixed" rowKey="ma">
                <template #title>
                  <h4>Dữ liệu sai</h4>
                </template>
                <template #footer>
                  <a-button type="primary" @click="exportExcel" danger>Tải file lỗi</a-button>
                </template>
                <template #bodyCell="{ column, record }">
                  <template v-if="column.key === 'errorFields'">
                    <a-tag v-for="errorField in record.errorFields" :key="errorField" color="red">{{
                      errorField
                    }}</a-tag>
                  </template>
                </template>
              </a-table>
            </a-card>
          </div>
        </div>
        <div class="steps-action">
          <a-button v-if="current < steps.length - 1" type="primary" @click="next">Next</a-button>
          <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">Previous</a-button>
        </div>
      </div>
    </a-spin>
  </a-card>
</template>

<script>

const ExcelJS = require('exceljs')
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons-vue';
import APIService from "@/helpers/ApiService"


export default {
  components: {
    DownloadOutlined,
    UploadOutlined
  },
  data() {
    return {
      current: 0,
      open: false,
      loading: false,
      labelCol: { span: 3 },
      wrapperCol: { span: 3 },
      rules: {
        fileNameUploaded: [
          {
            required: true,
            message: 'Tên huyện là bắt buộc',
            trigger: 'change',
          }
        ],
      },
      columns: [
        {
          title: 'Mã Huyện',
          dataIndex: 'ma',
          width: 200
        },
        {
          title: 'Tên huyện',
          dataIndex: 'ten',
          width: 200
        },
      ],
      columnsError: [
        {
          title: 'Mã Huyện',
          dataIndex: 'ma',
          width: 200
        },
        {
          title: 'Tên huyện',
          dataIndex: 'ten',
          width: 200
        },
        {
          title: 'Loại lỗi',
          dataIndex: 'errorFields',
          key: "errorFields",
          width: 200
        },
      ],
      dataImport: {
        huyens: [],
        importSuccessfully: 0,
        errorData: [],
        importFailed: 0,
        fileNameUploaded: null
      },
      steps: [
        {
          title: 'Nhập dữ liệu excel',
          content: 'First-content',
        },
        {
          title: 'Kiểm tra dữ liệu',
          content: 'Second-content',
        },
      ],
      selectedRowIds: [],
      selectedRows: [],
      lstMaHuyen: []
    }
  },
  async mounted() {
    this.getAllDataHuyen()
  },
  computed: {
    items() {
      return this.steps.map(item => ({
        key: item.title,
        title: item.title,
      }));
    },
    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowIds,
        onChange: this.onChangeRow,
        onSelect: this.onSelect,
        onSelectAll: this.onSelectAll,
        columnWidth: 50
      }
    },
  },
  methods: {
    onChange(current) {
      this.current = current
    },
    downloadTemplate() {
      window.open(this.$configs.VUE_APP_APP_URL + '/EmployeeSalary_Template.xlsx')
      if (this.current === 0 || this.current === undefined) {
        this.current = 1
      }
    },
    onChangeRow(selectedRowIds) {
      this.selectedRowIds = selectedRowIds
    },
    onSelect(record, selected, selectedRows) {
      this.selectedRows = selectedRows
    },
    onSelectAll(selected, selectedRows) {
      this.selectedRows = selectedRows
    },
    next() {
      if (!this.dataImport.fileNameUploaded) {
        this.$message.error('File không tồn tại')
        return
      }
      this.current++;
      this.importExcel()
    },
    upload() {
      const FILE_IMPORT = document.querySelector('#inpFile')
      this.dataImport.fileNameUploaded = FILE_IMPORT.files[0].name
    },
    prev() {
      this.current--
      this.dataImport = {
        employees: [],
        importSuccessfully: 0,
        importFailed: 0,
        fileNameUploaded: null,
        errorData: []
      }
    },
    async importExcel() {
      const FILE_IMPORT = document.querySelector('#inpFile')
      if (/(.*?)\.(xlsx|xls)$/.test(FILE_IMPORT.files[0].name)) {
        this.dataImport.fileNameUploaded = FILE_IMPORT.files[0].name
        try {
          const START_ROW = 2
          this.dataImport.huyens = []
          this.dataImport.importSuccessfully = 0
          this.dataImport.importFailed = 0
          const READER = new FileReader()
          READER.onload = async (e) => {
            try {
              this.loading = true
              const DATA = new Uint8Array(e.target.result)
              const WORK_BOOK = new ExcelJS.Workbook()
              await WORK_BOOK.xlsx.load(DATA)
              var sheetEmployee = WORK_BOOK.worksheets[0]
              for (let i = START_ROW, j = 1; i <= sheetEmployee.rowCount; i++, j++) {
                const ROW = sheetEmployee.getRow(i)
                if (!ROW.hasValues) continue
                const HUYEN = {
                  ma: ROW.getCell(1).text,
                  ten: ROW.getCell(2).text,
                  parentId: 6,
                  loai: 'HUYEN',
                  polygon: "",
                  errorFields: []
                }
                // ckeck mã huyện
                if (!HUYEN.ma) {
                  HUYEN.errorFields.push('Mã huyện là bắt buộc')
                } else {
                  if (this.lstMaHuyen.includes(HUYEN.ma)) {
                    HUYEN.errorFields.push('Trùng mã huyện')
                  } else if (HUYEN.ma.length > 10) {
                    HUYEN.errorFields.push('Độ dài mã huyện tối đa 10 kí tự')
                  }
                }
                // check tên huyện
                if (!HUYEN.ten) {
                  HUYEN.errorFields.push('Tên huyện là bắt buộc')
                } 

                // sau khi check
                if (HUYEN.errorFields.length > 0) {
                  this.dataImport.importFailed++
                  this.dataImport.errorData.push(HUYEN)
                } else {
                  this.dataImport.importSuccessfully++
                  this.dataImport.huyens.push(HUYEN)
                }
              }
            } catch (error) {
              this.$message.error(error)
            } finally {
              FILE_IMPORT.value = null
              this.dataImport.huyens.sort((a, b) => b.errorFields.length - a.errorFields.length)
              this.onChange(1)
              this.loading = false
            }
          }
          READER.readAsArrayBuffer(FILE_IMPORT.files[0])
        } catch (error) {
          this.$message.error('Lỗi file')
        }
      } else {
        this.$message.error('Lỗi định dạng')
      }
    },
    isValidDate(d) {
      return d instanceof Date && !isNaN(d)
    },
    async save() {
      if (this.selectedRows.length <= 0) {
        this.$message.error('Chọn dòng cần import')
      } else {
        await APIService.post("/DonViHanhChinh/import", this.selectedRows)
        this.$message.success('Import huyện thành công')
        this.dataImport.huyens = this.dataImport.huyens.filter(huyen => !this.selectedRows.includes(huyen))
        this.selectedRows = []
        this.selectedRowIds = []
      }

    },
    async submit() {
    },
    async getAllDataHuyen() {
      var searchParam = {
        pageIndex: 1,
        pageSize: -1
      }
      var urlQuery = new URLSearchParams(searchParam).toString();
      var LoaiFilter = `HUYEN`;
      var result = (await APIService.get(
        `/DonViHanhChinh/GetDataPage?LoaiFilter=${LoaiFilter}&` + urlQuery
      )).data
      this.lstMaHuyen = result.data.items.map((x) => { return x.ma })
    },
    hide() {
      this.dataImport = {
        huyens: [],
        importSuccessfully: 0,
        importFailed: 0,
        fileNameUploaded: null
      }
    },
    exportExcel () {
      const data = this.dataImport.errorData
      const workbook = new ExcelJS.Workbook()
      const sheet = workbook.addWorksheet('Sheet1')
      sheet.columns = [
        { key: 'ten', header: 'Mã Huyện', width: 25 },
        { key: 'ma', header: 'Tên Huyện', width: 25 },
        { key: 'errorFields', header: 'Loại lỗi', width: 25 },

      ]
      sheet.addRows(data)
      sheet.eachRow({ includeEmpty: true }, function (row) {
        row.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
      })
      workbook.xlsx
        .writeBuffer({
          base64: true
        })
        .then(function (xls64) {
          // build anchor tag and attach file (works in chrome)
          var a = document.createElement('a')
          var data = new Blob([xls64], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          })
          var url = URL.createObjectURL(data)
          a.href = url
          a.download = 'Huyen_ErrorData.xlsx'
          document.body.appendChild(a)
          a.click()
          setTimeout(function () {
            document.body.removeChild(a)
            window.URL.revokeObjectURL(url)
          }, 0)
        })
        .catch(function (error) {
          this.$message.error(error.message)
        })
    },
  }
}
</script>

<style scoped>
::v-deep .table-striped {
  background-color: rgb(241, 143, 159) !important;
}

.steps-content {
  margin-top: 16px;
  border-radius: 6px;
  min-height: 200px;
}

.steps-action {
  margin-top: 24px;
}

::v-deep .ant-form-item-label {
  display: flex !important;
  margin-left: 10px;
}

::v-deep .ant-table-footer {
  display: flex !important;
  justify-content: center !important;
}
</style>

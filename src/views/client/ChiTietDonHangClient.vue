<template>
  <a-row>
    <a-col :span="24">
      <a-card title="Chi tiết đơn hàng">
        <h4>Thông tin người đặt hàng</h4>
        <div class="ml-5 mt-4">
          <div class="d-flex">
            <b>Họ và tên:</b> <p style="margin-left: 15px;">{{ DonHangDetail.tenKhachHang }}</p>
          </div>
          <div class="d-flex">
            <b>Số điện thoại:</b> <p style="margin-left: 15px;">{{ DonHangDetail.soDienThoai }}</p>
          </div>
          <div class="d-flex">
            <b>Địa chỉ:</b> <p style="margin-left: 15px;">{{ DonHangDetail.diaChi }} / {{ DonHangDetail.xa }} / {{DonHangDetail.huyen }} / {{ DonHangDetail.tinh }}</p>
          </div>
          <div class="d-flex">
            <b>Ngày đặt hàng:</b> <p style="margin-left: 15px;">{{ DonHangDetail.ngayDatHang }}</p>
          </div>
          <div class="d-flex">
            <b>Tình trạng đơn hàng:</b> 
              <p v-if="DonHangDetail.trangThaiDonHang === 1" style="margin-left: 15px;">Chờ xác nhận</p>
              <p v-if="DonHangDetail.trangThaiDonHang === 2" style="margin-left: 15px;">Chờ giao hàng</p>
              <p v-if="DonHangDetail.trangThaiDonHang === 3" style="margin-left: 15px;">Đã giao hàng</p>
              <p v-if="DonHangDetail.trangThaiDonHang === 4" style="margin-left: 15px;">Đã hủy</p>
          </div>
        </div>

        <h4 class="mt-5">Chi tiết đơn hàng</h4>
        <a-table
          :columns="tableColumns"
          :dataSource="lstSanPham"
          :pagination="false"
          :loading="loading">
          <template #bodyCell="{ column, index, record }">
            <template v-if="column.key === 'STT'">
              <ul class="list-inline hstack gap-2 mb-0">
                <li>{{ index+1 }}</li>
              </ul>
            </template>
            <template v-if="column.key === 'ThanhTien'">
              <ul class="list-inline hstack gap-2 mb-0">
                <li>{{ record.giaTien * record.soLuong }}</li>
              </ul>
            </template>
              
          </template>
      </a-table>

      <!-- <div v-if="DonHangDetail.trangThaiDonHang ===1">
        <a-space style="display: flex; justify-content: flex-end; margin-top: 50px; margin-right: 100px;" wrap>
          <a-button size="large" type="primary" style="background-color: green;" @click="ChangeStatus">Xác nhận đơn hàng</a-button>
          <a-button size="large" type="primary" danger @click="cancelOrder">Hủy đơn hàng</a-button>
        </a-space>
      </div> -->
      <div v-if="DonHangDetail.trangThaiDonHang ===2">
        <a-space style="display: flex; justify-content: flex-end; margin-top: 50px; margin-right: 100px;" wrap>
          <a-button size="large" type="primary" style="background-color: green;" @click="ChangeStatus">Đã nhận được hàng</a-button>
          <!-- <a-button size="large" type="primary" danger @click="ChangeStatus">Hủy đơn hàng</a-button> -->
        </a-space>
      </div>
      
      <!-- <div v-if="DonHangDetail.trangThaiDonHang ===3">
        <a-space style="display: flex; justify-content: flex-end; margin-top: 50px; margin-right: 100px;" wrap>
          <a-button size="large" type="primary" danger @click="ChangeStatus">Hủy đơn hàng</a-button>
        </a-space>
      </div> -->
      </a-card>
    </a-col>
    
  </a-row>

</template>

<script>
import APIService from "@/helpers/ApiService";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
  data(){
    return{
      DonHangDetail:{},
      tableColumns: [
        { title: "STT", width: 100, key: "STT" },
        { title: "Tên sản phẩm", dataIndex: "tenSach", width:400},
        { title: "Giá tiền", dataIndex: "giaTien" },
        { title: "Số lượng", dataIndex: "soLuong" },
        { title: "Thành tiền", key: "ThanhTien", width:150 },
    
      ],
      lstSanPham: [],
    }
  }, 
  methods:{
    async GetDonHangDetail(){
      try {
        var paramId = this.$route.params.id;
        var data = await APIService.get("/Order/" + paramId);
        
        var res = data;
        if(res != null ){
          this.DonHangDetail = res.data.data
          console.log('oo', res.data.data.ngayDatHang)
        }else{
          toast.error("Không tìm thấy thông tin đơn hàng.",{
            "theme": "colored",
            autoClose: 2000
          });
        }
      } catch (e) {
        if(e.status == 401){
          toast.error("Bạn không có quyền truy cập.",{
            "theme": "colored",
            autoClose: 2000
          });
        }else {
          if(e.data && e.data.Message){
            this.errMessage = e.data.Message;
            toast.error(e.data.Message,{
              "theme": "colored",
              autoClose: 2000
            });
          }else{
            toast.error("Không tìm thấy thông tin bài viết.",{
              "theme": "colored",
              autoClose: 2000
            });
          }
        }
      }
    },
    async getOrderDetail(){
      try {
        var paramId = this.$route.params.id;
        var data = await APIService.get("/OrderDetail/GetByOrderId/" + paramId);
        
        var res = data;
        if(res != null ){
          this.lstSanPham = res.data.data
          console.log('lokk',this.lstSanPham)
        }else{
          toast.error("Không tìm thấy thông tin đơn hàng.",{
            "theme": "colored",
            autoClose: 2000
          });
        }
      } catch (e) {
        if(e.status == 401){
          toast.error("Bạn không có quyền truy cập.",{
            "theme": "colored",
            autoClose: 2000
          });
        }else {
          if(e.data && e.data.Message){
            this.errMessage = e.data.Message;
            toast.error(e.data.Message,{
              "theme": "colored",
              autoClose: 2000
            });
          }else{
            toast.error("Không tìm thấy thông tin bài viết.",{
              "theme": "colored",
              autoClose: 2000
            });
          }
        }
      }
    },
    ChangeStatus(){
      try{
        this.DonHangDetail.trangThaiDonHang = this.DonHangDetail.trangThaiDonHang+1
        console.log('thaydpo', this.DonHangDetail.trangThaiDonHang)
      APIService.put("Order/edit/" + this.DonHangDetail.id, this.DonHangDetail);
       
        toast.success("Cập nhật trạng thái thành công.", {
          "theme": "colored",
          autoClose: 2000
        });

      } catch (e) {
        this.submitted = false;
        if(e.status == 401){
          toast.error("Bạn không có quyền truy cập.",{
            "theme": "colored",
            autoClose: 2000
          });
        }else {
          if(e.data && e.data.Message){
            this.errMessage = e.data.Message;
            toast.error(e.data.Message,{
              "theme": "colored",
              autoClose: 2000
            });
          }else{
            toast.error("Chỉnh sửa sản phẩm thất bại. Vui lòng thử lại sau.",{
              "theme": "colored",
              autoClose: 2000
            });
          }
        }
      }
    },
    cancelOrder(){
      try{
        this.DonHangDetail.trangThaiDonHang = 4;
        console.log('thaydpo', this.DonHangDetail.trangThaiDonHang)
      APIService.put("Order/edit/" + this.DonHangDetail.id, this.DonHangDetail);
       
        toast.success("Hủy đơn hàng thành công.", {
          "theme": "colored",
          autoClose: 2000
        });

      } catch (e) {
        this.submitted = false;
        if(e.status == 401){
          toast.error("Bạn không có quyền truy cập.",{
            "theme": "colored",
            autoClose: 2000
          });
        }else {
          if(e.data && e.data.Message){
            this.errMessage = e.data.Message;
            toast.error(e.data.Message,{
              "theme": "colored",
              autoClose: 2000
            });
          }else{
            toast.error("Chỉnh sửa sản phẩm thất bại. Vui lòng thử lại sau.",{
              "theme": "colored",
              autoClose: 2000
            });
          }
        }
      }
    }
  },
  mounted(){
    this.GetDonHangDetail()
    this.getOrderDetail()
  }
}
</script>

<style>

</style>
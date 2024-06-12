<template>
  <Header></Header>
  <div style="padding-top: 70px; padding-bottom: 100px; background-color: white;">
    <div class="container">
      <div class="main-info">
        <a-row :gutter="50">
          <a-col :span="16" class="left">
            <a-form
              :rules="rules"
              :model="ThongTinKH"
              name="basic"
              ref="formRef"             
            >
              <p style="font-size: 17px; font-weight: 600;">Thông tin giao hàng</p>
              <div class="box">
                <a-row :gutter="[24]">
                  <a-col :span="12">
                    <a-form-item 
                    name="TenKhachHang" 
                    ref="TenKhachHang" 
                    :rules="[{ required: true, message: 'Thông tin này không được để trống!' }]">
                      <a-input
                        v-model:value="ThongTinKH.TenKhachHang"
                        placeholder="Họ và tên"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="12">
                    <a-form-item 
                      name="SoDienThoai"
                      :rules="[
                          { required: true, message: 'Thông tin này không được để trống!' },
                          { pattern: /^\d+$/, message: 'Vui lòng chỉ nhập số!' },
                          { min: 10, max: 10, message: 'Số điện thoại phải có 10 số', trigger: 'blur' },
                      ]"
                      > 
                      <a-input
                        v-model:value="ThongTinKH.SoDienThoai"
                        placeholder="Số điện thoại"
                      />
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-row :gutter="[20]">
                <a-col :span="8">
                  <a-form-item 
                  :rules="[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố!' }]"
                  name="Tinh"
                  >
                    <a-select 
                     
                      v-model:value="ThongTinKH.Tinh" 
                      placeholder="Tỉnh/Thành phố"
                      :options="Tinh"
                      :field-names="{ label: 'name', value: 'name', options: 'Tinh' }"
                      @change="getHuyen">
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item 
                  :rules="[{ required: true, message: 'Vui lòng chọn Quận/Huyện!' }]"
                  name="Huyen"
                  >
                    <a-select 
                      v-model:value="ThongTinKH.Huyen" 
                      :options="Huyen"
                      :field-names="{ label: 'name', value: 'name', options: 'Huyen' }"
                      placeholder="Quận/Huyện"
                      @change="getXa">
                      
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item 
                  :rules="[{ required: true, message: 'Vui lòng chọn Phường/Xã!' }]"
                  name="Xa"
                  >
                    <a-select 
                      v-model:value="ThongTinKH.Xa" 
                      placeholder="Phường/Xã"
                      :options="Xa"
                      :field-names="{ label: 'name', value: 'name', options: 'Xa' }"
                      >
                      
                    </a-select>
                  </a-form-item>
                </a-col>
              </a-row>
                
                <a-form-item
                :rules="[{ required: true, message: 'Thông tin này không được để trống!' }]"
                name="DiaChi"
                >
                  <a-textarea
                    :rows="5"
                    v-model:value="ThongTinKH.DiaChi"
                    placeholder="Địa chỉ cụ thể"
                  />
                </a-form-item>
                <a-form-item>
                  <a-textarea
                    :rows="5"
                    v-model:value="ThongTinKH.GhiChu"
                    placeholder="Ghi chú"
                  />
                </a-form-item>
              </div>
              <div class="btn-submit">
                <a-button @click="handleOk" size="large" type="success"
                  >Hoàn thành</a-button
                >
              </div>
            </a-form>
          </a-col>
          <a-col :span="8">
            <div class="order">
              <p class="outer-title">
                <span class="title">Đơn hàng </span>
                <span class="tt-bs"
                  >( {{ $store.state.cart.length }} sản phẩm )</span
                >
              </p>
              <div class="list-in-order">
                <div
                  v-for="item in $store.state.cart"
                  :key="item.id"
                  class="item"
                >
                  <div class="left">
                    <img :src="URL + item.pathAnh" alt="">
                  </div>
                  <div class="mid">
                    <p class="name">{{ item.tenSach }}</p>
                    <p class="price">
                      <span class="price_new">{{ item.giaTien }}</span>
                      <span class="normal">{{ item.giaTien }}</span>
                    </p>
                    <p class="quantity">
                      x {{ item.quantity }}
                    </p>
                  </div>
                </div>
              </div>
              <!-- <div class="discount">
                            <p class="title">Mã giảm giá</p>

                            <div class="c-box_promotion">
                                <input type="text" class="c-input_promotion" id="discount_code" value="" placeholder="Nhập mã giảm giá...">
                                <a class="c-btn c-btn_promotion" href="javascript:void(0)" onclick="validApplyDiscount();" title="Gửi">
                                    Áp dụng                                </a>
                                
                            </div>

                        </div> -->
                        <!-- <p class="discount_value"><span>Giảm giá</span><span class="discount_money"></span></p> -->
                        <p class="total  fix">
                            <span>Tổng cộng</span><span class="right total_temporary">{{ $store.state.cartTotal}}</span>
                        </p>

            </div>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
  <ModalThanhCong
    ref="modalThanhCong">
  </ModalThanhCong>
  <FooterClient></FooterClient>
</template>

<script>
import { Modal } from 'ant-design-vue';
import ModalThanhCong from "./ModalThanhCong.vue";
import tinhThanhData from '@/stores/dataTinhThanh.json';
import APIService from "@/helpers/ApiService";
import Header from '@/components/Header';
import FooterClient from '@/components/FooterClient.vue';
export default {
  components:{
    ModalThanhCong,
    Header,
    FooterClient
  },
  data() {
    return {
      URL: "http://localhost:44301/",
      ThongTinKH: {
      },
      Tinh: tinhThanhData.data,
      Huyen:[],
      Xa:[],
      rules:{
        Tinh:{
          required: true, message: 'Thông tin này không được để trống', trigger: 'change'
        },
        tenNhom:{
          required: true, message: 'Thông tin này không được để trống', trigger: 'change'
        },
       
        
      },
    };
  },
  methods: {
    openModalThanhCong() {
      this.$refs.modalThanhCong.showModal();
    },
    getUserId(){
      const userClientString = localStorage.getItem('userClient');
      if (userClientString) {
        try {
          const userClient = JSON.parse(userClientString);
          const userId = userClient.userId;
          this.ThongTinKH.UserId = userId;
          console.log('User ID:', this.ThongTinKH.UserId);
        } catch (error) {
          console.error('Error parsing userClient:', error);
        }
      } else {
        console.log('No userClient found in localStorage');
      }
    },
    countDown() {
      let secondsToGo = 5;
      const modal = Modal.success({
        title: 'Đặt hàng thành công!',
        content: `Hệ thống sẽ tự động quay về trang chủ sau ${secondsToGo} giây.`,
        onOk: () => {
          this.$router.push('/');
        }
      });
      const interval = setInterval(() => {
        secondsToGo -= 1;
        modal.update({
          content: `Hệ thống sẽ tự động quay về trang chủ sau ${secondsToGo} giây.`,
        });
      }, 1000);
      setTimeout(() => {
        clearInterval(interval);
        modal.destroy();
        this.$router.push('/');
      }, secondsToGo * 1000);
    },
    handleOk() {
      this.$refs.formRef.validate().then(async () => {
       
        const Order ={
        idUser : this.ThongTinKH.UserId,
        tenKhachHang: this.ThongTinKH.TenKhachHang,
        soDienThoai: this.ThongTinKH.SoDienThoai,
        diaChi: this.ThongTinKH.DiaChi,
        tinh: this.ThongTinKH.Tinh,
        huyen: this.ThongTinKH.Huyen,
        xa: this.ThongTinKH.Xa,
        trangThaiDonHang: 1
      }
      // APIService.post("NhaXuatBan/Create",this.nxb)
      APIService.post("/Order/Create", Order)
      .then(response =>{
        console.log('orderData',response.data);
        // Lấy orderId từ response và lưu vào trường dữ liệu
        var orderId = response.data.data.id;
        console.log('order', orderId);
        console.log('gio hang', this.$store.state.cart)
        this.OrderDetail(orderId);
        this.$store.commit('clearCart');
        this.countDown();
      })
      .catch(error => {
        console.log('orderloi',error);
      })
      })
      .catch(error =>{
        console.log('error', error);
      })
     
      
    },
    OrderDetail(orderId){
      console.log('ki', orderId)
      this.$store.state.cart.forEach(product => {
        const orderDetail = {
          orderId: orderId,
          idSanPham: product.id,  
          giaTien: product.giaTien,
          soLuong: product.quantity
        };
        APIService.post("/OrderDetail/Create", orderDetail)
        .then(response =>{
          console.log('orderDetailData',response.data);
          // Lấy orderId từ response và lưu vào trường dữ liệu
          
        })
        .catch(error => {
          console.log('orderdetailloi',error);
        })
      })
      
   
      this.ThongTinKH.TenKhachHang =''
      this.ThongTinKH.SoDienThoai='',
      this.ThongTinKH.DiaChi='',
      this.ThongTinKH.Tinh='',
      this.ThongTinKH.Huyen='',
      this.ThongTinKH.Xa=''
    },
    getHuyen(){
        if (this.ThongTinKH.Tinh) {
            const selectedCity = this.Tinh.find(city => city.name === this.ThongTinKH.Tinh);
            if (selectedCity ) {
            this.Huyen = selectedCity.districts;
        }
        } else {
            console.log('ok Loi')
            return [];
        }
      },
      getXa(){
        if (this.ThongTinKH.Huyen) {
            const selectedDistricts = this.Huyen.find(districts => districts.name === this.ThongTinKH.Huyen);            
            if (selectedDistricts ) {
            this.Xa = selectedDistricts.wards;
        }
        } else {
            console.log('ok Loi')
            return [];
        }
      }
  },
  mounted(){
    this.getUserId();
  },
  watch:{
    'ThongTinKH.Tinh' : function(newVal, oldVal){
      if (newVal !== oldVal) {
        this.ThongTinKH.Huyen = [];
        this.ThongTinKH.Xa = [];
      }
    },
    'ThongTinKH.Huyen' : function(newVal, oldVal){
      if (newVal !== oldVal) {
      
        this.ThongTinKH.Xa = [];
      }
    }
  }
};
</script>

<style>
.left {
  position: relative;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px 20px 24px;
}
.btn-submit {
  text-align: center;
  margin-top: 36px;
}
.btn-submit a {
  background: #e9262a;
  padding: 15px 27px;
  color: #fff;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 700;
}
 .order {
    padding: 18px 20px 22px 20px;
    border: 1px solid #dddddd;
    border-radius: 5px;
}
.order .outer-title {
    font-size: 18px;
    font-weight: 700;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    margin-bottom: 20px;
}
.order .list-in-order .item {
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-gap: 20px;
    margin-bottom: 20px;
    position: relative;
}
.order .list-in-order .item .left {
    width: 100px;
    height: 100px;
    overflow: hidden;
    border: 1px solid #eee;
}
.order .list-in-order .item .left img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
.order .list-in-order .item .mid .name {
    font-size: 15px;
    line-height: 18px;
    font-weight: 700;
    color: #252525;
}
.order .list-in-order .item .mid .price {
    margin-top: 10px;
    margin-bottom: 10px;
    color: #e9262a;
    font-size: 16px;
    font-weight: 700;
}
.order .list-in-order .item .mid .price .normal {
    text-decoration: line-through;
    color: #252525;
    font-weight: 400;
    margin-left: 10px;
}
.order .discount {
    padding: 20px 20px 25px 20px;
    border: 1px solid #ddd;
    margin-bottom: 20px;
}
.order .discount .title {
    font-size: 18px;
    font-weight: 700;
    line-height: 22px;
    color: #252525;
}
.order .discount .c-box_promotion {
    display: flex;
    width: 100%;
}
.order .ship-fee {
    padding-top: 22px;
    padding-bottom: 23px;
}
.order .fix {
    background-color: #eee;
    margin: 0;
}
.order .fix span {
    margin-left: 20px;
}
.order .fix .right {
    float: right;
    margin-right: 20px;
}
.order .temporary {
    padding-top: 20px;
    padding-bottom: 20px;
}
.order .fix span {
    margin-left: 20px;
}
.order .fix .right {
    float: right;
    margin-right: 20px;
}
.order .discount_value {
    padding-top: 22px;
    padding-bottom: 23px;
}
.order .discount_value span {
    margin-left: 20px;
}
.order .discount_value .discount_money {
    float: right;
    margin-right: 20px;
}
.order .total {
    background-color: #fff;
}
.order .total span {
    margin: 0;
    padding: 0;
    font-size: 16px;
    font-weight: 700;
}
 .order .total .right {
    color: #e9262a;
    margin: 0;
}
main .main-info .order .fix .right {
    float: right;

}
.container{
  max-width: 1200px;
}
</style>
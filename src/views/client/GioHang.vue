<template>
  <Header></Header>
  <div style="background-color: white; padding-bottom: 200px;">
    <div style="padding-top: 50px;" class="container">
    <a-row>
      <a-col :span="16">
        <div class="cart-box">
          <div class="flex-top">
            <p class="title-bag">
              <span class="bold">Giỏ hàng của bạn</span>
              <span class="bold"> ({{ $store.state.cart.length }}) </span>
            </p>                  
          </div>
          <table>
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Tạm tính</th>
              </tr>
            </thead>
            <tbody>
              <tr  v-for="item in $store.state.cart" :key="item.id">
                <td  >
                  <a-row>
                  
                      <a-col class="col-ten" :span="6">
                      <img class="img" :src="URL + item.pathAnh">
                      </a-col>
                      <a-col style="padding-left: 10px;" :span ="18">
                        <a href="" class="name">{{ item.tenSach }}</a>                                              
                        <div class="bottom">
                          <p href="" @click="XoaSP(item)">
                            <i class="ri-close-circle-line"></i>
                            <span>Xóa</span>
                          </p>
                        </div>   
                      </a-col>
           
                    
                  </a-row>
                </td>
                <td>
                  <span class="red">{{ item.giaTien }} đ</span>
                </td>
                <td>
                  <div class="count-number">
                    <div class="toggle-quantity">
                            <button @click="addOrRemove(-1, item.id)" id="decrement-5528" class="decrement ml-1" data-id="5528">-
                            </button>
                        </div>
                        <input id="quantity-5528" class="quantity" type="text" v-model="item.quantity" >
                        <!--                                    <input id="total_temp" type="text" value="-->
                        <!--" disabled/>-->
                        <div class="toggle-quantity">
                            <button  @click="addOrRemove(1, item.id)" id="increment-5528" class="increment mr-1" data-id="5528">+
                            </button>
                        </div>
                    </div>
                </td>
                <td class="money-per-prd money-sprd">{{ item.giaTien * item.quantity }} đ</td>
                
              </tr>
            </tbody>
          </table>
        </div>
      </a-col>

      <a-col :span="8">
        <div class="right-box">
                        <div class="total">
                            <p>Tổng giá sản phẩm<span class="right">{{ $store.state.cartTotal }} đ</span>
                            </p>
                            <p>Phí vận chuyển<span class="right">Có thể phát sinh</span></p>
                            <p>Tạm tính<span class="right">{{ $store.state.cartTotal }} đ</span>
                            </p>
                            <a  @click="ThanhToan">Tiến hành thanh toán</a>
                        </div>
                    </div>
      </a-col>
    </a-row>
  </div>
  </div>
  <FooterClient></FooterClient>
</template>

<script>

import Swal from "sweetalert2";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import Header from '@/components/Header';
import FooterClient from '@/components/FooterClient.vue';

export default {
  components:{
    Header,
    FooterClient
  },
  data(){
    return{
      URL: "http://localhost:44301/",
      qty: 1,
      SanPham:{}
    }
  },
  mounted(){
    this.SanPham = this.$store.state.cart;
    console.log("SanPham initially: ", this.SanPham);
  },
  methods:{
    XoaSP(item){
      this.$store.commit('addRemoveCart',{products:item,toAdd:false})
    },
    addOrRemove(number, itemId){
      const item = this.SanPham.find(o => o.id === itemId);
     
      console.log('itemss', item)
      if(number == 1){
                if(item.quantity < item.soLuongTon){
                this.qty = item.quantity;
                const updatedItem = { ...item, quantity: item.quantity + 1 };      
                this.$store.commit('updateCart',{products:updatedItem})
                    toast.success('Cập nhật thành công', {
                        autoClose: 1000,
                    });
                }else{
                    toast.warning('Không đủ số lượng', {
                        autoClose: 3000,
                    });  
                }
            }
            if(number == -1){
                if(item.quantity > 1){
                    const updatedItem = { ...item, quantity: item.quantity - 1 };      
                    this.$store.commit('updateCart',{products:updatedItem})
                    toast.success('Cập nhật thành công', {
                            autoClose: 1000,
                    });
                }else{
                    toast.warning('Không giảm được nữa', {
                        autoClose: 3000,
                    });  
                }
            }
    
         
    },
    ThanhToan(){
      if(localStorage.getItem('userClient') == null){
        Swal.fire({
        title: "Bạn chưa đăng nhập",
        text: "Bạn phải đăng nhập trước mới được thanh toán.",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Hủy",
        cancelButtonColor: "#f46a6a",
        confirmButtonColor: "#34c38f",
        confirmButtonText: "Đăng nhập",
      }).then(async (result) => {
        if (result.value) {
      
            this.$router.push('/dang-nhap'); 
        }
      });
      }else{
        this.$router.push('/thanh-toan'); 
  
        console.log('userClient', localStorage.getItem('userClient'))
      }
      
    },
    
  }
}
</script>

<style>
.cart-box{
  border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 25px;
    padding: 20px 10px;
}
.cart-box .flex-top{
  display: flex;
    background: #fff;
    padding: 0px 10px;
}
.cart-box .flex-top .title-bag{
  margin-bottom: 20px;
    font-family: Omnes, sans-serif !important;
    font-size: 15px;
    line-height: 20px;
    color: #333333;
}
.cart-box table {
  width: 100%;
    background: #fff;
    border-collapse: collapse;
}
.cart-box table thead tr{
  background: #F3F3F3;
    height: 50px;
}
.cart-box table th:first-child{
  width: 50%;
}
.cart-box table th{
  padding: 10px;
    background: #F3F3F3;
}
.main-step .cart-box table tr td {
  border-bottom: 1px solid #f3f3f3;
    margin-bottom: 10px;
    padding: 10px 0px;
}
 .col-ten img{
  width: 100%;
    height: 100%;
    -o-object-fit: contain;
    object-fit: contain;
    /* margin-left: 15px; */
    border: 1px solid #f3f3f3;
    -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}
 .col-ten{
  padding: 0;
    width: 100%;
    height: 100px;
    overflow: hidden;

}
.name{
  color: #252525;
    font-size: 16px;
    font-weight: 600;

}
.bottom{
  display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-left: 10px;
    
}
.bottom > p{
  color: red;
  font-size: 15px;
  cursor: pointer;
}
.red{
  font-size: 16px;
    font-weight: 700;
    color: #E9262A;
    
}
.count-number{
  display: flex;
}
.cart-box table tr td .count-number button{
  width: 30px;
    height: 30px;
    border: 1px solid #E9EDF0;
    background: #fff;
}
.count-number .quantity{
  width: 40px;
    text-align: center;
    background: #F3F3F3;
    border: none;
}
.cart-box table tr .money-per-prd{
  font-size: 16px;
    line-height: 19px;
    font-weight: 700;
    color: #E9262A;
}
.right-box{
  background: #fff;
    border-radius: 3px;
    border: 1px solid #ddd;
    padding: 30px;
    margin-left: 10px;
}
.right-box .total p:nth-child(1) .right{
    color: #E9262A;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
}
.right-box .total p .right{
  float: right;
}
.right-box .total a {
  display: block;
    width: 100%;
    padding: 10px;
    background: #E9262A;
    text-align: center;
    text-transform: uppercase;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 15px;
    border-radius: 3px;
}
.right-box .total p:nth-child(3) .right{
  color: #E9262A;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
}
a:not([href]):not([class]):hover{
  color: white;
}
</style>
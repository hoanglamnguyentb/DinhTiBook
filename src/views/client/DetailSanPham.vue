<template>
  <Header></Header>
  <div>
    <div
      style="padding-top: 50px; padding-bottom: 100px"
      v-if="SanPham"
      class="container"
    >
      <a-row class="block-product">
        <a-col :span="10">
          <div style="width: 484px" class="product-essential-media">
            <div style="display: flex" class="product-view-image">
              <div class="product-view-thumbnail">
                <div class="list-anh">
                  <a v-for="(item, index) in lstAnh" :key="index" href="" @click.prevent="selectImage(item)">
                    <img :src="URL + item.path" />
                  </a>
                </div>
              </div>

              <div v-if="selectedImage" class="product-image">
                <a href="URL + selectedImage.path" class="easyzoom" ref="zoom"></a>
                <img   :src="URL + selectedImage.path" alt="" />
              </div>
            </div>
          </div>
        </a-col>
        <a-col :span="14">
          <div class="info-prd">
            <div class="left">
              <h1 class="name">
                {{ SanPham.tenSach }}
                <p></p>
                <ul>
                  
                  <li>Danh mục: {{ SanPham.tenDanhMuc }}</li>
                  <li>Tác giả: {{ SanPham.tenTacGia }}</li>
                  <li>Nhà xuất bản: {{ SanPham.tenNXB }}</li>
                  <li>Năm xuất bản: {{ SanPham.namXuatBan }}</li>
                  <li>Số lượng còn: {{ SanPham.soLuongTon }}</li>
                </ul>
                <div>
                  <a-space style="margin-bottom: 25px;" wrap>
                    <a-button @click="openTomtatNoiDung">Tóm tắt nội dung</a-button>
                    <a-button @click="openThongTinTacGia">Thông tin về tác giả</a-button>
                  </a-space>
                  
                </div>
                <div class="price-share">
                  <p class="price">
                    Giá :
                    <span class="red">{{formatCurrency(SanPham.giaTien)}}</span>
                    <strike class="normal">69,000đ</strike>
                    <span class="discount">-{{SanPham.giamGia}}%</span>
                  </p>
                </div>
                <div class="count-box">
                  <div class="count-number">
                    <div class="toggle-quantity">
                      <button
                        @click="GiamSoLuong"
                        id="decrement"
                        class="decrement ml-1"
                      >
                        -
                      </button>
                    </div>
                    <input
                      id="quantity"
                      class="quantity"
                      type="text"
                      v-model="quantity"
                    />
                    <div class="toggle-quantity">
                      <button
                        @click="TangSoLuong"
                        id="increment"
                        class="increment mr-1"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </h1>
            </div>
            <div class="right">
              <div class="block_prd_banner">
                <div class="item">
                  <div class="left">
                    <img
                      onerror="this.src='/images/not_picture.png'"
                      src="https://dinhtibooks.com.vn/images/banners/original/icon_1652865441.webp"
                      alt="Sản phẩm chất lượng"
                    />
                  </div>
                  <div class="right">
                    <p class="name">Sản phẩm chất lượng</p>
                    <p>Top thương hiệu vàng 2022</p>
                    <p></p>
                  </div>
                </div>
                <div class="item">
                  <div class="left">
                    <img
                      onerror="this.src='/images/not_picture.png'"
                      src="https://dinhtibooks.com.vn/images/banners/original/free-delivery-1_1651042129.webp"
                      alt="Giao hàng toàn quốc"
                    />
                  </div>
                  <div class="right">
                    <p class="name">Giao hàng toàn quốc</p>
                    <p>Miễn phí từ đơn hàng 500k</p>
                    <p></p>
                  </div>
                </div>
                <div class="item">
                  <div class="left">
                    <img
                      onerror="this.src='/images/not_picture.png'"
                      src="https://dinhtibooks.com.vn/images/banners/original/free-delivery-2_1651042195.webp"
                      alt="Thanh toán linh hoạt"
                    />
                  </div>
                  <div class="right">
                    <p class="name">Thanh toán linh hoạt</p>
                    <p>Tùy chọn nhiều hình thức</p>
                    <p></p>
                  </div>
                </div>
                <div class="item">
                  <div class="left">
                    <img
                      onerror="this.src='/images/not_picture.png'"
                      src="https://dinhtibooks.com.vn/images/banners/original/free-delivery-4_1651042320.webp"
                      alt="Tư vấn miễn phí trực tuyến"
                    />
                  </div>
                  <div class="right">
                    <p class="name">Tư vấn miễn phí trực tuyến</p>
                    <p>
                      <strong
                        >Tổng đài
                        <span style="color: #e74c3c"
                          >098 985 62 85</span
                        ></strong
                      >
                    </p>
                    <p></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cart-box">
            <!--                                nếu số lượng sản phẩm tồn kho > 0-->
            <div class="top">
              <a
                class="add-to-cart addCart"

                @click="addCart()"
              >
                <i
                  style="
                    color: white;
                    background: #e9262a;
                    font-size: 18px;
                    margin-right: 10px;
                  "
                  class="ri-shopping-cart-2-line"
                ></i>
                Thêm vào giỏ</a
              >
              <a class="buy-now" href="javascript:void(0)" @click="buyNow()"
                >Mua ngay</a
              >
            </div>
          </div>
        </a-col>
      </a-row>
      <a-row style="margin-top: 50px">
        <a-col :span="24">
          <div class="outer-title">
            <p class="title">Mô tả sản phẩm</p>
          </div>
        </a-col>
        <a-col>
          <div class="description-content" v-html="SanPham.moTaSach"></div>
        </a-col>
      </a-row>
    </div>
  </div>

  <a-modal v-model:open="openModal" width="1000px" title="" >
    <div class="chat">
      <div class="chat-header clearfix">
        <div class="row">
        <div class="col-lg-6">
        <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
        <img src="https://lf16-alice-tos-sign.oceanapi-i18n.com/obj/ocean-cloud-tos-sg/FileBizType.BIZ_BOT_ICON/7371838831589868545_1716390117416036960.jpeg?lk3s=50ccb0c5&x-expires=1718037862&x-signature=4A0UbFnnSb4ExbMgN3j41zVU%2BgI%3D" alt="avatar">
        </a>
        <div class="chat-about">
        <h6 class="m-b-0">Trợ lý nhà sách</h6>
        
        </div>
        </div>
        
        </div>
      </div>
      <div class="chat-history">

        <ul class="m-b-0">
          <div
            :class="['chat-msg', item.type]"
            style=""
            v-for="(item, index) in chatLogs"
            :key="index"
          >
            <li v-if="item.type == 'user'" class="clearfix">
              <div class="message-data">
              <img src="https://lf16-alice-tos-sign.oceanapi-i18n.com/obj/ocean-cloud-tos-sg/FileBizType.BIZ_BOT_ICON/7371838831589868545_1716390117416036960.jpeg?lk3s=50ccb0c5&x-expires=1718037862&x-signature=4A0UbFnnSb4ExbMgN3j41zVU%2BgI%3D" alt="avatar">
              </div>
              <div class="message my-message"> {{ item.message }} </div>
            </li>

            <li v-if="item.type == 'self'" class="clearfix">
              <div class="message-data text-right">
              <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar">
              </div>
              <div class="message other-message float-right"> {{ item.message }} </div>
            </li>
          </div>
          <div id="cm-msg-1" class="chat-msg user" v-if="isLoading">
            <!-- <span class="msg-avatar"
              ><img
                src="https://cdn.eva.vn/upload/2-2023/images/2023-05-16/dau-phai-tu-nhien-ngoc-trinh-dep-vao-hau-truong-moi-biet-duoc-bi-kip-img_7829-1684233366-654-width780height1040.jpg"
            /></span> -->
            <div class="cm-msg-text">
              <div class="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </ul>

      </div>
      <!-- <div class="chat-message clearfix">
        <div class="input-group mb-0">
        <div class="input-group-prepend">
        <span class="input-group-text"><i class="ri-send-plane-fill"></i></span>
        </div>
        <input type="text" class="form-control" placeholder="Enter text here...">
        </div>
        </div> -->
      </div>  
  </a-modal>

  <FooterClient></FooterClient>
  <ChatBox></ChatBox>
</template>

<script>
import Header from "@/components/Header.vue";
import FooterClient from "@/components/FooterClient.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import APIService from "@/helpers/ApiService";
import Common from '@/helpers/Common';
import axios from 'axios';
import ChatBox from '@/components/ChatBox';
export default {
  components: {
    Header,
    FooterClient,
    ChatBox
  },
  data() {
    return {
      URL: "http://localhost:44301/",
      SanPham: {},
      lstAnh: [],
      quantity: 1,
      Add: true,
      selectedImage: null, // Khởi tạo biến để lưu trữ ảnh được chọn,
      openModal: false,

      chatLogs: [
        
      ],
      message: '',
      isLoading: false,
    };
  },
  methods: {
    formatCurrency(x) {
      return Common.formatCurrency(x);
    },
    async openThongTinTacGia(){
      this.openModal = true;
      this.isLoading = true;
      const userMessage =  "Thông tin về tác giả " +this.SanPham.tenTacGia ;
      this.chatLogs.push({ type: 'self', message: userMessage });
      this.message = '';
      try {
        const response = await axios.post(
          // `https://api.docsbot.ai/teams/ZrbLG98bbxZ9EFqiPvyl/bots/oFFiXuQsakcqyEdpLvCB/ask`,
          `https://api.coze.com/open_api/v2/chat`,
          {
            // conversation_id: '123',
            bot_id: '7371838891596595217',
            user: '29032201862555',
            query: userMessage,
            stream: false,
          },
          {
            headers: {
              Authorization:
              'Bearer pat_SBfelSjRBVO8v0Qp8p9OedtkzunLLlUsLjqaxQmgn2ixklRyO7i1wg4PX8RrhugM',
              'Content-Type': 'application/json',
              Accept: '*/*',
              Host: 'api.coze.com',
              Connection: 'keep-alive',
            },
          }
        );

        var botMessage = "Không tìm thấy thông tin!"
        response.data.messages.forEach(item => {
          if(item.type == "answer") {
             botMessage = item.content;
          }
        });
        this.chatLogs.push({ type: 'user', message: botMessage });
        this.isLoading = false;
        localStorage.setItem('chatLogs', JSON.stringify(this.chatLogs));
      } catch (error) {
        console.log(error);
      }
      this.scrollToBottom();
    },
    async openTomtatNoiDung(){
      this.openModal = true;
      this.isLoading = true;
      const userMessage = "Tóm tắt nội dung cuốn sách "+this.SanPham.tenSach + " của tác giả " +this.SanPham.tenTacGia ;
      this.chatLogs.push({ type: 'self', message: userMessage });
      this.message = '';
      try {
        const response = await axios.post(
          // `https://api.docsbot.ai/teams/ZrbLG98bbxZ9EFqiPvyl/bots/oFFiXuQsakcqyEdpLvCB/ask`,
          `https://api.coze.com/open_api/v2/chat`,
          {
            // conversation_id: '123',
            bot_id: '7371838891596595217',
            user: '29032201862555',
            query: "Tóm tắt khoảng 100 từ nội dung cuốn sách "+this.SanPham.tenSach + "của tác giả "+ this.SanPham.tenTacGia,
            stream: false,
          },
          {
            headers: {
              Authorization:
              'Bearer pat_SBfelSjRBVO8v0Qp8p9OedtkzunLLlUsLjqaxQmgn2ixklRyO7i1wg4PX8RrhugM',
              'Content-Type': 'application/json',
              Accept: '*/*',
              Host: 'api.coze.com',
              Connection: 'keep-alive',
            },
          }
        );

        var botMessage = "Không tìm thấy thông tin!"
        response.data.messages.forEach(item => {
          if(item.type == "answer") {
             botMessage = item.content;
          }
        });
        this.chatLogs.push({ type: 'user', message: botMessage });
        this.isLoading = false;
        localStorage.setItem('chatLogs', JSON.stringify(this.chatLogs));
      } catch (error) {
        console.log(error);
      }
      this.scrollToBottom();
    },
    scrollToBottom() {
      this.$nextTick(() => {
        let scrollableDiv = document.getElementById('chat-logs');
        if (scrollableDiv) {
          scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
        }
      });
    },
    async getSanPhamById() {
      var paramId = this.$route.params.id;
      console.log("id", paramId);
      APIService.get("SanPham/" + paramId).then((response) => {
        console.log(response);
        this.SanPham = response.data.objInfo;
        console.log("sp", this.SanPham);

        this.lstAnh = response.data.anhSanPham;
        console.log("anh", this.lstAnh);
        this.SanPham.pathAnh = this.lstAnh[0].path;
        console.log("sp theem anh", this.SanPham);
        if (this.lstAnh && this.lstAnh.length > 0) {
          
          this.selectedImage = this.lstAnh[0]; // Gán ảnh đầu tiên làm ảnh mặc định
          
        }
      });
    },
    TangSoLuong() {
      this.quantity++;
    },
    GiamSoLuong() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    addCart() {
      let cart = this.$store.state.cart;
      let object = cart.find((o) => o.id === this.SanPham.id);
      if (object) {
        console.log("Co san pham roi");

        // console.log(this.Product[0].qty)
        // console.log("quantity",this.quantity)
        toast.success('Thêm thành công', {
          autoClose: 1000,
        });
      } else {
        // this.Product[0].qty = this.quantity
        this.SanPham.quantity = this.quantity;

        console.log("giỏ hàng nè");
        this.$store.commit("addCart", {
          products: this.SanPham,
          Add: this.Add,
        });
        toast.success('Thêm thành công', {
          autoClose: 1000,
        });
        console.log(this.SanPham.quantity);
        console.log(this.$store.state.cart);
        // this.$router.push('/gio-hang');

        // this.$router.push({name: 'QL-'});
      }
    },
    buyNow() {
      let cart = this.$store.state.cart;
      let object = cart.find((o) => o.id === this.SanPham.id);
      if (object) {
        console.log("Co san pham roi");
        this.$router.push("/gio-hang");
      } else {
        this.SanPham.quantity = this.quantity;
        this.$store.commit("addCart", {
          products: this.SanPham,
          Add: this.Add,
        });
        console.log(this.$store.state.cart);
        this.$router.push("/gio-hang");
      }
    },
    selectImage(item) {
      this.selectedImage = item; // Cập nhật ảnh được chọn
      
        
    },
    
  },
  mounted() {
    this.getSanPhamById();
   
  },
};
</script>

<style scoped>
* {
  background-color: white;
}
.container {
  max-width: 1200px;
}
.product-view-thumbnail {
  width: 76px;
  margin-right: 8px;
}
.product-view-thumbnail .list-anh img {
  max-width: 100%;
}
.product-essential-media .product-view-image .product-image {
  height: 400px;
  width: 400px;
  justify-content: center;
  padding: 6px;
}
.product-essential-media .product-view-image .product-image > img {
  max-height: 392px;
  max-width: 100%;
  height: auto;
  width: 100%;
}
.info-prd {
  display: flex;
  justify-content: space-between;
}
.info-prd .left {
  width: 60%;
}
.info-prd .left .name {
  font-weight: 600;
  font-size: 18px;
  color: #252525;
  line-height: 21.6px;
  margin-bottom: 20px !important;
}
.info-prd .left .name p {
  margin-bottom: 20px;
  font-family: Omnes, sans-serif !important;
  font-size: 15px;
  line-height: 20px;
  color: #333333;
}
.info-prd .left ul {
  padding-left: 35px;
  margin-bottom: 20px !important;
}
.info-prd .left ul li {
  font-size: 15px;
  line-height: 18px;
  font-weight: 400;
  margin-bottom: 12px;
}
.info-prd .left .count-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.info-prd .left .count-box .count-number {
  display: flex;
  margin-top: 18px;
}
.info-prd .left .count-box .count-number #decrement {
  height: 40px;
  width: 40px;
  border: 1px solid #999999;
  background: none;
  border-right: 0px;
  outline: none;
}
.info-prd .left .count-box .count-number .quantity {
  text-align: center;
  width: 80px;
  height: 40px;
  border: 1px solid #e9262a;
  outline-color: #e9262a;
}
.info-prd .left .count-box .count-number #increment {
  height: 40px;
  width: 40px;
  border: 1px solid #999999;
  background: none;
  border-left: 0px;
  outline: none;
}
.info-prd .right .block_prd_banner {
  border: 1px dashed #e9262a;
  border-radius: 15px;
  padding: 20px 15px 9px 15px;
}
.info-prd .right .block_prd_banner .item {
  display: flex;
  border-bottom: 1px dashed #dddddd;
  /* padding: 15px 0px 15px 0px; */
}
.info-prd .right .block_prd_banner .item .left {
  width: 100%;
  max-width: 35px;
  height: 35px;
  overflow: hidden;
  margin-right: 10px;
}
.info-prd .right .block_prd_banner .item .left img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.info-prd .right .block_prd_banner .item .right {
  width: auto;
}
.info-prd .right .block_prd_banner .item .right .name {
  font-weight: 700;
  line-height: 18px;
  margin-bottom: 5px !important;
}
.cart-box {
  margin-top: 18px;
}
.cart-box .top {
  display: flex;
  column-gap: 20px;
}
.cart-box .top .add-to-cart {
  background: #e9262a;
  padding: 11px 21px 10px 21px;
  border-radius: 3px;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  text-transform: uppercase;
  color: #ffffff;
  text-decoration: none;
  display: flex;
  align-items: center;
}
.cart-box .top .buy-now {
  background: #ff9900;
  padding: 11px 39px 10px 39px;
  border-radius: 3px;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  text-transform: uppercase;
  color: #ffffff;
  text-decoration: none;
  display: flex;
  align-items: center;
}
.info-prd .left .price-share .price .red {
  font-weight: 700;
  line-height: 19px;
  color: #e9262a;
  font-size: 18px;
  margin-right: 15px;
}
.info-prd .left .price-share .price .normal {
  font-weight: 400;
  line-height: 18px;
  color: #252525;
  font-size: 15px;
  text-decoration: line-through;
}
.info-prd .left .price-share .price .discount {
  border: 1px solid #e9262a;
  border-radius: 3px;
  margin-left: 10px;
  padding: 4px 7px;
  font-size: 14px;
}
.outer-title {
  border-bottom: 1px solid #dddddd;
  margin-bottom: 20px;
}
.outer-title .title {
  color: #252525;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  padding: 0px 30px 7px;
  border-bottom: 3px solid #e9262a;
  margin-bottom: 0px;
  display: table;
}
.chat {
    
    border-left: 1px solid #eaeaea;
}
.chat .chat-header {
    padding: 15px 20px;
    border-bottom: 2px solid #f4f7f6;
}
.chat .chat-history {
    padding: 20px;
    border-bottom: 2px solid #fff;
}
.chat .chat-history ul {
    padding: 0;
}
.chat .chat-history ul li {
    list-style: none;
    margin-bottom: 30px;
}
.chat .chat-history .message-data {
    margin-bottom: 15px;
}
.text-right {
    text-align: right !important;
}
img {
    vertical-align: middle;
    border-style: none;
}
.chat .chat-history .other-message {
    background: #e8f1f3;
    text-align: right;
}
.chat .chat-history .message {
    color: #444;
    padding: 18px 20px;
    line-height: 26px;
    font-size: 16px;
    border-radius: 7px;
    display: inline-block;
    position: relative;
}
.chat .chat-history .message-data img {
    border-radius: 40px;
    width: 40px;
}
.chat .chat-header img {
    float: left;
    border-radius: 40px;
    width: 40px;
}
.chat .chat-history .my-message {
    background: #efefef;
}
.float-right {
    float: right !important;
}
.chat .chat-message {
    padding: 20px;
}
.input-group {
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -ms-flex-align: stretch;
    align-items: stretch;
    width: 100%;
}
.input-group-prepend {
    display: -ms-flexbox;
    display: flex;
}
</style>
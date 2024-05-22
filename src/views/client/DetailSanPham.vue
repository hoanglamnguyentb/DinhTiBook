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
                  <a v-for="(item, index) in lstAnh" :key="index" href="">
                    <img :src="URL + item.path" />
                  </a>
                </div>
              </div>

              <div v-if="lstAnh && lstAnh.length > 0" class="product-image">
                <img :src="URL + lstAnh[0].path" alt="" />
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
                  <li>Mã sản phẩm: 561823132122</li>
                  <li>Danh mục: Bách khoa</li>
                  <li>Tác giả: Nick Denchfield; Minh họa: Ant Parker</li>
                  <li>Nhà xuất bản: NXB Hà Nội</li>
                  <li>Năm xuất bản: 2022- 468</li>
                </ul>
                <div class="price-share">
                  <p class="price">
                    Giá :
                    <span class="red">55,200đ</span>
                    <strike class="normal">69,000đ</strike>
                    <span class="discount">-20%</span>
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
                href="javascript:void(0)"
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
  <FooterClient></FooterClient>
</template>

<script>
import Header from "@/components/Header.vue";
import FooterClient from "@/components/FooterClient.vue";

import APIService from "@/helpers/ApiService";
export default {
  components: {
    Header,
    FooterClient,
  },
  data() {
    return {
      URL: "http://localhost:44301/",
      SanPham: {},
      lstAnh: [],
      quantity: 1,
      Add: true,
    };
  },
  methods: {
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
    addCard() {
      let cart = this.$store.state.cart;
      let object = cart.find((o) => o.id === this.SanPham.id);
      if (object) {
        console.log("Co san pham roi");

        // console.log(this.Product[0].qty)
        // console.log("quantity",this.quantity)
        this.$router.push("/gio-hang");
      } else {
        // this.Product[0].qty = this.quantity
        this.SanPham.quantity = this.quantity;

        console.log("giỏ hàng nè");
        this.$store.commit("addCart", {
          products: this.SanPham,
          Add: this.Add,
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
</style>
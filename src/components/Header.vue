<template>
  <header style="background-color: white">
    <div class="container">
      <div class="header-top">
        <a-row>
          <a-col :span="10">
            <a href="/">
              <img width="190px" src="@/assets/images/logoheader.png" />
            </a>
          </a-col>
          <a-col style="display: flex">
            <ul class="top-menu">
              <li style="border-left: 1px solid #ddd">
                <a href="">Về Đinh Tị</a>
              </li>
              <li><a href="">Hệ thống phân phối</a></li>
              <li><a href="">Liên hệ</a></li>
            </ul>
            <div v-if="!isLoggedIn">
              <a class="dangnhap" href="/dang-nhap">Đăng nhập / Đăng ký</a>
            </div>
            <div v-if="isLoggedIn">
              <div style="margin-left: 15px; margin-top: 15px" class="User">
                <a-button @click="openUser"
                  ><i style="margin-right: 10px" class="ri-user-line"></i
                  >{{fullName }}</a-button
                >
                <!-- <form v-if="isUserOpen" class="thongtin" name="thongtin" id="thongtin">
                  
                  <button type="submit">
                    <i style="font-size: 18px; color: white;" class="ri-search-line"></i>
                  </button>
                </form> -->

                <ul v-if="isUserOpen" class="thongtin" id="thongtin">
                  <li class="sub-menu-level1">
                    <a href="/profile">Thông tin tài khoản</a>
                  </li>
                  <li class="sub-menu-level1">
                    <a href="/don-hang">Đơn hàng của tôi</a>
                  </li>
                  <li class="sub-menu-level1">
                    <a @click="DangXuat">Đăng xuất</a>
                  </li>
                  <!-- <li class="sub-menu-level1"><p  @click="DangXuat">Đăng xuất</p></li> -->
                </ul>
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="header-bottom">
      <div class="container">
        <div class="header-menu">
          <div id="cssmenu">
            <ul id="megamenu">
              <li class="level_0 sort" style="font-size: 16px">
                <a href="/"><i class="ri-home-4-line"></i></a>
              </li>
              <li class="level_0 sort">
                <a href=""
                  >Danh mục sách <i class="ri-arrow-down-s-line"></i
                ></a>
                <ul>
                  <li
                    v-for="(item, index) in lstMenuDanhMuc"
                    :key="index"
                    class="sub-menu-level1"
                  >
                    <a :href="`/danh-muc/` + item.maCategory">{{
                      item.categoryName
                    }}</a>
                  </li>
                </ul>
              </li>
              <li class="level_0 sort">
                <a style="cursor: pointer;"
                  >Sách theo độ tuổi <i class="ri-arrow-down-s-line"></i
                ></a>
                <ul>
                  <li
                    v-for="(item, index) in lstMenuDoTuoi"
                    :key="index"
                    class="sub-menu-level1"
                  >
                    <a :href="`/nhom-do-tuoi/` + item.maNhomDoTuoi">{{
                      item.tenNhom
                    }}</a>
                  </li>
                </ul>
              </li>
              <li class="level_0 sort">
                <a href="/tat-ca-san-pham">Chọn sách <i class="ri-arrow-down-s-line"></i></a>
                <ul>
                  <li class="sub-menu-level1">
                    <a href="/sach-noi-bat">Sách nổi bật</a>
                  </li>
                  <li class="sub-menu-level1">
                    <a href="/sach-khuyen-doc">Sách khuyên đọc</a>
                  </li>
                </ul>
              </li>
              <li class="level_0 sort">
                <a :href="`/tin-tuc/TINTUC`">Tin tức </a>
              </li>
              <li class="level_0 sort">
                <a href="/tin-tuc/LAMCHAME">Làm cha mẹ </a>
              </li>
              <li class="level_0 sort">
                <a href="/tin-tuc/TIENICH">Tiện ích </a>
              </li>
              <li class="level_0 sort"><a href="/tin-tuc/REVIEW">Review sách </a></li>
            </ul>
          </div>
          <div class="right">
            <div style="margin-left: 15px" class="dropdown cart">
              <a-badge :count="$store.state.cart.length" show-zero>
                <a-button @click="openGioHang" type="dashed" shape="circle"
                  ><i
                    style="font-size: 18px"
                    class="ri-shopping-cart-2-line"
                  ></i
                ></a-button>
              </a-badge>
            </div>
            <div style="margin-left: 15px" class="search position-relative">
              <a-button @click="openSearch" type="dashed" shape="circle"
                ><i style="font-size: 18px" class="ri-search-line"></i
              ></a-button>
              <form
                v-if="isSearchOpen"
                class="frmSearch position-absolute shadow"
                @submit.prevent="onSubmit"
                id="frmSearch"
              >
                <input
                  type="text"
                  class="form-control"
                  placeholder="Tìm kiếm..."
                  v-model="keyword"
                  name="keyword"
                  id="keyword"
                  ref="input"
                  autocomplete="off"
                  v-on:keyup="fastSearch"
                />
                <button type="submit">
                  <i
                    style="font-size: 18px; color: white"
                    class="ri-search-line"
                  ></i>
                </button>
                <div
                  class="position-absolute top-100 start-0 bg-white border border-1 w-100 search-box"
                >
                  <a
                    :href="`/sach/${item.slug}`"
                    class="search-box-item text-primary"
                    v-for="(item, index) in lstSanPham"
                    :key="index"
                  >
                    <img
                      :src="URL + item.pathAnh"
                      :alt="item.tenSach"
                      style="width: 45px; height: 50px"
                    />
                    <span>{{ item.tenSach }}</span>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { ref, onMounted } from 'vue';
import APIService from '@/helpers/ApiService';
import router from '@/router/index';
const input = ref(null);

export default {
  data() {
    return {
      isSearchOpen: false,
      isUserOpen: false,
      lstMenuDoTuoi: [],
      lstMenuDanhMuc: [],
      keyword: '',
      URL: 'http://localhost:44301/',
      lstSanPham: [],
      fullName: localStorage.getItem('FullName') || 'Xin chào bạn'
    };
  },
  methods: {
    openSearch() {
      this.isSearchOpen = !this.isSearchOpen;
      input.value.focus();
    },
    openUser() {
      this.isUserOpen = !this.isUserOpen;
    },
    DangXuat() {
      router.push('/');
      localStorage.removeItem('accessTokenClient');
      localStorage.removeItem('userClient');
      localStorage.removeItem('FullName');
      localStorage.removeItem('UserId');
      this.isLoggedIn = false;
     
      this.$router.go(0);
      
    },
    openGioHang() {
      router.push('/gio-hang');
    },
    async getMenuDoTuoi() {
      var result = await APIService.get('/NhomDoTuoi');
      if (result.data.data != null && result.data.data.items != null) {
        this.lstMenuDoTuoi = result.data.data.items;
      }
    },
    async getMenuDanhMuc() {
      var result = await APIService.get('/DanhMuc/GetDataByPage');
      if (result.data.data != null && result.data.data.items != null) {
        this.lstMenuDanhMuc = result.data.data.items;
      }
    },
    onSubmit() {
      router.push('/tim-kiem/' + this.keyword);
    },

    fastSearch() {
      console.log(this.keyword);
      APIService.get('SanPham?TenSanPhamFilter=' + this.keyword).then(
        (response) => {
          var data = response.data.data;
          this.lstSanPham = data.items;
        }
      );
    },
  },
  computed: {
    isLoggedIn() {
      // Kiểm tra xem đã đăng nhập hay chưa
      return !!localStorage.getItem('accessTokenClient');
    },
  },
  mounted() {
    this.getMenuDoTuoi();
    this.getMenuDanhMuc();
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}
.header-top {
  padding: 16px 0 16px 0;

  justify-content: space-between;
  align-items: center;
}
.top-menu {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
}
.top-menu > li {
  padding: 15px 20px;
  border-right: 1px solid #ddd;
}
.top-menu > li > a {
  color: black;
}
.header-bottom {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}
.header-menu {
  display: flex;
}
#cssmenu ul#megamenu {
  width: 100%;
  display: flex;
  margin: auto;
  padding: 0;
  list-style: none;
  height: 50px;
  position: relative;
  background: #fff;
  border-left: 1px solid #ddd;
}
#cssmenu ul#megamenu .level_0 {
  padding: 15px 15px;
  border-right: 1px solid #ddd;
}
#cssmenu ul#megamenu .level_0:hover {
  background-color: #f3f3f3;
}

#cssmenu ul li {
  vertical-align: middle;
  position: relative;
  display: flex;
  align-items: center;
  font-weight: 500;
}
#cssmenu ul li a {
  color: black;
  font-weight: 600;
  text-decoration: none;
  font-size: 16px;
}
#cssmenu ul li:hover > a {
  color: #fd0d00;
}
.right {
  display: flex;
  align-items: center;
}
#cssmenu ul#megamenu .level_0 ul {
  padding: 0 !important;
}
#cssmenu ul ul {
  visibility: hidden;
  position: absolute;
  z-index: 598;
  min-width: 245px;
  border-radius: 0 3px 3px 0;
  padding: 24px 20px !important;
  background: #fff;
  filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.16));
  top: 50px;
  left: 0px;
}
#cssmenu ul li:hover > ul {
  visibility: visible;
}
#cssmenu ul .sub-menu-level1 {
  padding: 12px 0 12px 15px;
  border-bottom: 1px dashed #ccc;
}
.header-top .top-menu li {
  color: black;
  text-decoration: none;
  padding: 0px 20px;
  border-left: 1px solid #dddddd;
  border-right: 1px solid #dddddd;
}
.header-top .dangnhap {
  display: flex;
  background-color: #e9262a;
  align-items: center;
  width: 180px;
  height: 40px;
  border-radius: 30px;
  color: #ffffff;
  text-decoration: none;
  justify-content: center;
  gap: 10px;
  text-transform: uppercase;
  margin-top: 12px;
  margin-left: 25px;
}
.header-menu .right button {
  height: 40px;
  width: 40px;
  border: 1px dashed;
}
.search {
  position: relative;
}
.User {
  position: relative;
}
.User #thongtin {
  position: absolute;
  padding: 0px;
  top: 36px;
  width: 250px;
  z-index: 99;
  background: #fff;
  box-shadow: 1px 1px 2px 2px #e5e5e5;
}
.User #thongtin ul {
  min-width: 245px;

  padding: 24px 20px !important;
  background: #fff;
  filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.16));
  top: 50px;
  left: 0px;
}
.User #thongtin .sub-menu-level1 {
  border-bottom: 1px dashed #ccc;
  vertical-align: middle;
  position: relative;
  display: flex;
  align-items: center;
  font-weight: 500;
}
.User #thongtin .sub-menu-level1 a {
  color: black;
  font-weight: 600;
  text-decoration: none;
  font-size: 16px;
  padding: 12px 0px 12px 12px;
  width: 100%;
}
.search #frmSearch {
  /* display: none; */
  position: absolute;
  right: 0;
  top: 100%;
  width: 350px;
  z-index: 99;
  background: #fff;
  border-radius: 5px;
}
.form-control {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  /* border: 1px solid #ced4da; */
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.search #frmSearch button {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 35px;
  background: #e9262a;
  border: 1px solid #fff;
  border-radius: 0 5px 5px 0;
  outline: none;
}
</style>

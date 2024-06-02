<template>
  <div style="background-color: white; padding-top: 70px">
    <div class="container">
      <div class="filter">
        <div class="filter-left">
          <div class="box-filter">
            <span class="btn-drop-filter btn-drop-filter3"
              ><i class="fa fa-angle-down"></i
            ></span>
            <p class="titlea"><span>Lọc theo</span> <br />Danh mục</p>
            <div class="outer outer-filter3">
              <!-- <div class="div-input cat-box div-a">
                        <input type="checkbox" onclick="checkCat(43)" name="cat_child" id="cat_43" value="43">
                        <label for="cat_43">Top 4 sách tiếng Anh cho trẻ tự học</label>
                    </div>
                                    <div class="div-input cat-box div-a">
                        <input type="checkbox" onclick="checkCat(40)" name="cat_child" id="cat_40" value="40">
                        <label for="cat_40">Seri Sách hay</label>
                    </div>
                                    <div class="div-input cat-box div-a">
                        <input type="checkbox" onclick="checkCat(39)" name="cat_child" id="cat_39" value="39">
                        <label for="cat_39">Hộp quà Trung thu Trăng tròn gói trọn yêu thương</label>
                    </div>
                                    <div class="div-input cat-box div-a">
                        <input type="checkbox" onclick="checkCat(27)" name="cat_child" id="cat_27" value="27">
                        <label for="cat_27">Ý  Tưởng Quà tặng</label>
                    </div>
                                    <div class="div-input cat-box div-a">
                        <input type="checkbox" onclick="checkCat(24)" name="cat_child" id="cat_24" value="24">
                        <label for="cat_24">Combo Hot</label>
                    </div>
                                    <div class="div-input cat-box div-a">
                        <input type="checkbox" onclick="checkCat(23)" name="cat_child" id="cat_23" value="23">
                        <label for="cat_23">Sách Usborne</label>
                    </div>
                                    <div class="div-input cat-box div-a">
                        <input type="checkbox" onclick="checkCat(20)" name="cat_child" id="cat_20" value="20">
                        <label for="cat_20">Sách ươm mầm</label>
                    </div>
                                    <div class="div-input cat-box div-a">
                        <input type="checkbox" onclick="checkCat(15)" name="cat_child" id="cat_15" value="15">
                        <label for="cat_15">Tương tác thông minh</label>
                    </div>
                                    <div class="div-input cat-box div-a">
                        <input type="checkbox" onclick="checkCat(1)" name="cat_child" id="cat_1" value="1">
                        <label for="cat_1">Tủ cho người lớn</label>
                    </div>
                                    <div class="div-input cat-box div-a">
                        <input type="checkbox" onclick="checkCat(2)" name="cat_child" id="cat_2" value="2">
                        <label for="cat_2">Văn học</label>
                    </div>
                                    <div class="div-input cat-box div-a">
                        <input type="checkbox" onclick="checkCat(9)" name="cat_child" id="cat_9" value="9">
                        <label for="cat_9">Cùng con trưởng thành</label>
                    </div>
                                    <div class="div-input cat-box div-a">
                        <input type="checkbox" onclick="checkCat(16)" name="cat_child" id="cat_16" value="16">
                        <label for="cat_16">Bách khoa tri thức</label>
                    </div>
                                    <div class="div-input cat-box div-a">
                        <input type="checkbox" onclick="checkCat(17)" name="cat_child" id="cat_17" value="17">
                        <label for="cat_17">Người kể chuyện</label>
                    </div>
                                    <div class="div-input cat-box div-a">
                        <input type="checkbox" onclick="checkCat(18)" name="cat_child" id="cat_18" value="18">
                        <label for="cat_18">Sáng tạo</label>
                    </div> -->
              <div v-for="(item, index) in lstDanhMuc" :key="index">
                <div class="div-input cat-box div-a">
                  <input
                    type="checkbox"
                    onclick="checkCat(18)"
                    name="cat_child"
                    id="cat_18"
                    value="18"
                  />
                  <label for="cat_18">{{ item.categoryName }}</label>
                </div>
              </div>
            </div>
          </div>
          <div class="box-filter">
            <span class="btn-drop-filter btn-drop-filter4"
              ><i class="fa fa-angle-down"></i
            ></span>
            <a class="titlea"><span>Lọc theo</span> <br />Độ tuổi</a>
            <div class="outer outer-filter4">
              <div class="div-input">
                <input
                  type="checkbox"
                  onclick="checkAge(9)"
                  name="age"
                  id="age_9"
                  value="9"
                />
                <label for="age_9">Từ 0-3</label>
              </div>
              <div class="div-input">
                <input
                  type="checkbox"
                  onclick="checkAge(1)"
                  name="age"
                  id="age_1"
                  value="1"
                />
                <label for="age_1">Từ 3-6</label>
              </div>
              <div class="div-input">
                <input
                  type="checkbox"
                  onclick="checkAge(2)"
                  name="age"
                  id="age_2"
                  value="2"
                />
                <label for="age_2">Từ 6-9</label>
              </div>
              <div class="div-input">
                <input
                  type="checkbox"
                  onclick="checkAge(3)"
                  name="age"
                  id="age_3"
                  value="3"
                />
                <label for="age_3">Từ 9-12</label>
              </div>
              <div class="div-input">
                <input
                  type="checkbox"
                  onclick="checkAge(4)"
                  name="age"
                  id="age_4"
                  value="4"
                />
                <label for="age_4">Từ 12-15</label>
              </div>
              <div class="div-input">
                <input
                  type="checkbox"
                  onclick="checkAge(5)"
                  name="age"
                  id="age_5"
                  value="5"
                />
                <label for="age_5">Từ 15+</label>
              </div>
              <div class="div-input">
                <input
                  type="checkbox"
                  onclick="checkAge(10)"
                  name="age"
                  id="age_10"
                  value="10"
                />
                <label for="age_10">0-6 tuổi</label>
              </div>
            </div>
          </div>
          <div class="box-filter">
            <span class="btn-drop-filter btn-drop-filter5"
              ><i class="fa fa-angle-down"></i
            ></span>
            <a class="titlea"><span>Lọc theo</span> <br />Loại sách</a>
            <div class="outer outer-filter5">
              <div class="div-input">
                <input
                  type="checkbox"
                  onclick="checkType(1)"
                  name="age"
                  id="type_1"
                  value="1"
                />
                <label for="type_1">Sách nổi bật</label>
              </div>

              <div class="div-input">
                <input
                  type="checkbox"
                  onclick="checkType(3)"
                  name="age"
                  id="type_3"
                  value="3"
                />
                <label for="type_3">Sách khuyên đọc</label>
              </div>
            </div>
          </div>
          <div class="box-filter">
            <a class="titlea"><span>Lọc theo</span> <br />Giá</a>
            <span class="btn-drop-filter btn-drop-filter6"
              ><i class="fa fa-angle-down"></i
            ></span>

            <div class="outer outer-filter6 box boxe">
              <div class="div-input">
                <input
                  type="checkbox"
                  onclick="checkPrice(99)"
                  name="price_prd"
                  id="price_prd_99"
                  value="99"
                />
                <label for="price_prd_99">Tất cả</label>
              </div>
              <div class="div-input">
                <input
                  type="checkbox"
                  onclick="checkPrice(1)"
                  name="price_prd"
                  id="price_prd_1"
                  value="1"
                />
                <label for="price_prd_1">Dưới 50,000₫</label>
              </div>
              <div class="div-input">
                <input
                  type="checkbox"
                  onclick="checkPrice(2)"
                  name="price_prd"
                  id="price_prd_2"
                  value="2"
                />
                <label for="price_prd_2">Từ 50,000₫ - 99,000₫</label>
              </div>
              <div class="div-input">
                <input
                  type="checkbox"
                  onclick="checkPrice(3)"
                  name="price_prd"
                  id="price_prd_3"
                  value="3"
                />
                <label for="price_prd_3">Từ 100,000₫ - 199,000₫</label>
              </div>
              <div class="div-input">
                <input
                  type="checkbox"
                  onclick="checkPrice(4)"
                  name="price_prd"
                  id="price_prd_4"
                  value="4"
                />
                <label for="price_prd_4">Từ 200,000₫ - 299,000₫</label>
              </div>
              <div class="div-input">
                <input
                  type="checkbox"
                  onclick="checkPrice(5)"
                  name="price_prd"
                  id="price_prd_5"
                  value="5"
                />
                <label for="price_prd_5">Lớn hơn 300,000đ</label>
              </div>
            </div>
          </div>

          <div class="box-filter">
            <a class="titlea"><span>Giảm giá</span></a>
            <span class="btn-drop-filter btn-drop-filter6"
              ><i class="fa fa-angle-down"></i
            ></span>

            <div class="outer outer-filter7 box boxe">
              <div class="div-input">
                <input
                  type="checkbox"
                  onclick="checkDiscount(1)"
                  name="price_discount"
                  id="price_discount_1"
                  value="1"
                />
                <label for="price_discount_1">Có</label>
              </div>
              <div class="div-input">
                <input
                  type="checkbox"
                  onclick="checkDiscount(0)"
                  name="price_discount"
                  id="price_discount_0"
                  value="0"
                  checked=""
                />
                <label for="price_discount_0">Không</label>
              </div>
            </div>
          </div>
          <div class="box-filter last-box">
            <span class="btn-drop-filter btn-drop-filter7"
              ><i class="fa fa-angle-down"></i
            ></span>
            <select class="" onchange="loadPrices(this.value)">
              <option value="0">Sắp xếp theo</option>
              <option value="price_asc">Giá tăng dần</option>
              <option value="price_desc">Giá giảm dần</option>
            </select>
          </div>
        </div>
      </div>
      <div class="bottom">
        <span class="count_all">{{ this.optionPage.totalCount }} kết quả</span>
        <div class="grid">
          <div v-for="(item, index) in lstSanPham" :key="index" class="item">
            <a :href="`/detail/` + item.id" class="img_box">
              <img :src="URL + item.pathAnh" alt="" />
            </a>
            <div class="info-box">
              <a class="name" :href="`/detail/` + item.id">{{
                item.tenSach
              }}</a>
              <p class="price">
                Giá:
                <span class="price_new">{{
                  formatCurrency(
                    item.giaTien - (item.giaTien / 100) * item.giamGia
                  )
                }}</span>
                <span class="normal">{{ formatCurrency(item.giaTien) }}</span>
              </p>
              <span class="discount"> -{{ item.giamGia }}% </span>

              <div class="note-stick"></div>
            </div>
          </div>
        </div>
        <Pagination
          :total="optionPage.totalCount"
          :current="optionPage.pageIndex"
          :per-page="optionPage.pageSize"
          :pageRange="optionPage.totalCount"
          @page-changed="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/widgets/Pagination.vue';
import Header from '@/components/Header';
import FooterClient from '@/components/FooterClient.vue';
import APIService from '@/helpers/ApiService';
import Common from '@/helpers/Common';
export default {
  components: {
    Header,
    FooterClient,
    Pagination,
  },
  data() {
    return {
      lstSanPham: [],
      URL: 'http://localhost:44301/',
      optionPage: {
        pageIndex: 1,
        pageSize: 20,
        totalCount: 0,
      },
      lstDanhMuc: [],
    };
  },
  methods: {
    async getDanhMuc() {
      await APIService.get('/DanhMuc/GetDataByPage')
        .then((response) => {
          this.lstDanhMuc = response.data.data.items;
          console.log('sdww', this.lstDanhMuc);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handlePageChange(page) {
      this.optionPage.pageIndex = page;
      this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);
    },
    async loadData(pageIndex, pageSize, params) {
      var searchParam = {
        pageIndex: pageIndex,
        pageSize: pageSize,
      };
      if (params) {
        searchParam = params;
      }

      var urlQuery = new URLSearchParams(searchParam).toString();
      var result = await APIService.get('/SanPham?' + urlQuery);
      this.lstSanPham = result.data.data.items;
      if (result.data.data != null && result.data.data.items != null) {
        var res = result.data.data;
        this.lstSanPham = result.data.data.items;
        this.optionPage.pageIndex = res.pageIndex;
        this.optionPage.pageSize = res.pageSize;
        this.optionPage.totalCount = res.totalCount;
      }
    },
    formatCurrency(x) {
      return Common.formatCurrency(x);
    },
  },
  mounted() {
    this.loadData(this.optionPage.pageIndex, this.optionPage.pageSize);
    this.getDanhMuc();
  },
};
</script>

<style>
.top .title {
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 24px;
  color: #252525;
}
.top .img_box {
  margin-bottom: 20px;
  width: 100%;
  height: 70px;
  display: block;
  max-width: 100px;
  overflow: hidden;
}
.top .title {
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 24px;
  color: #252525;
}
.top .summary {
  line-height: 20px;
  position: relative;
}
.top .summary p {
  margin-bottom: 0px;
  font-size: 16px !important;
  overflow: hidden;
  text-overflow: ellipsis;
  /* line-height: 25px; */
  -webkit-line-clamp: 3;
  /* height: 75px; */
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.see-more {
  border: 1px dashed #e9262a;
  border-radius: 30px;
  padding: 8px 13px 8px 16px;
  color: #e9262a;
  text-transform: uppercase;
  text-decoration: none;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  width: unset !important;
  height: unset !important;
}
.summary p {
  margin-bottom: 0px;
  font-size: 16px !important;
  overflow: hidden;
  text-overflow: ellipsis;
  /* line-height: 25px; */
  -webkit-line-clamp: 3;
  /* height: 75px; */
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
}
.bottom .count_all {
  border: 2px dashed #e9262a;
  border-radius: 50px;
  padding: 5px 40px;
  color: #e9262a;
  margin-bottom: 30px;
}
.bottom .grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 30px;
  padding-bottom: 20px;
}
.bottom .grid .item {
  position: relative;
  padding: 10px;
}
.bottom .grid .item .img_box {
  width: 100%;
  height: 216px;
  overflow: hidden;
  max-width: 216px;
  display: flex;
  justify-content: center;
}
.bottom .grid .item .img_box img {
  width: 100%;
  height: auto;
  object-fit: contain;
}
.bottom .grid .item .info-box .name {
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  margin-top: 20px;
  line-height: 20px;
  text-decoration: none;
  font-weight: 700;
  height: 40px;
  color: #009fdb;
  padding: 0 10px;
}
.bottom .grid .item .info-box .price {
  margin: 15px 10px;
}
.bottom .grid .item .info-box .discount {
  position: absolute;
  top: -14px;
  right: 0px;
  border-radius: 3px;
  background-color: #e9262a;
  padding: 3px 3px;
  font-size: 12px;
  color: #fff;
  text-align: center;
  display: table;
}
.bottom .grid .item .info-box .price .price_new {
  font-weight: 700;
  color: #e9262a;
  margin-right: 4px;
}
.bottom .grid .item .info-box .price .normal {
  text-decoration: line-through;
}
.bottom .grid .item:hover {
  background-color: #fff;
  transition: 0.4s;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transform: translate3d(0, -2px, 0);
}
.filter-left {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  border-right: 1px solid #dddddd;
  border-left: 1px solid #dddddd;
  border-top: 1px solid #dcdcdc;
  border-bottom: 1px solid #dcdcdc;
  position: relative;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.filter-left .box-filter {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  position: relative;
  padding: 5px 20px;
  border-right: 1px solid #ddd;
  width: 100%;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.filter-left .box-filter .btn-drop-filter {
  -webkit-box-ordinal-group: 2;
  -ms-flex-order: 1;
  order: 1;
  position: absolute;
  right: 20px;
}
.fa {
  display: inline-block;
  font: normal normal normal 14px / 1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.filter-left .box-filter .titlea {
  margin: 0px !important;
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  color: #252525;
}
.filter-left .box-filter .titlea span {
  color: #777777;
}
.filter-left .box-filter .outer {
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 20px;
  visibility: hidden;
  position: absolute;
  z-index: 598;
  top: 51px;
  left: 0;
  background: #fff;
  width: -webkit-max-content;
  width: -moz-max-content;
  width: max-content;
  -webkit-filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.16));
  filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.16));
}
.filter-left .box-filter .outer .div-input {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding-bottom: 12px;
  padding-top: 12px;
  padding-left: 10px;
  padding-right: 10px;
}
.filter-left .box-filter .div-input input {
  margin-right: 10px;
  border: 1px solid #cccccc;
  background-color: #fff;
}
.filter-left .box-filter .outer .div-input label {
  margin-bottom: 0;
  font-weight: 400;
}
.filter-left .box-filter:hover {
  position: relative;
  z-index: 599;
  cursor: pointer;
}
.filter-left .box-filter:hover .outer {
  visibility: visible;
}
</style>

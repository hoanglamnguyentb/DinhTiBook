<template>
  <form @change="updateSearchModel" class="w-100">
    <div class="filter">
      <div class="filter-left">
        <div class="box-filter">
          <span class="btn-drop-filter btn-drop-filter3"
            ><i class="fa fa-angle-down"></i
          ></span>
          <p class="titlea"><span>Lọc theo</span> <br />Danh mục</p>
          <div class="outer outer-filter3">
            <div
              class="div-input cat-box div-a"
              v-for="(item, index) in categories"
              :key="index"
            >
              <input
                type="checkbox"
                :id="`category_${index}`"
                :value="item.maCategory"
                v-model="searchModel.categories"
              />
              <label :for="`category_${index}`">{{ item.categoryName }}</label>
            </div>
          </div>
        </div>
        <div class="box-filter">
          <span class="btn-drop-filter btn-drop-filter4"
            ><i class="fa fa-angle-down"></i
          ></span>
          <a class="titlea"><span>Lọc theo</span> <br />Độ tuổi</a>
          <div class="outer outer-filter4">
            <div
              class="div-input"
              v-for="(item, index) in nhomDoTuoi"
              :key="index"
            >
              <input
                type="checkbox"
                name="age"
                :id="`doTuoi_${index}`"
                :value="item.maNhomDoTuoi"
                v-model="searchModel.ages"
              />
              <label :for="`doTuoi_${index}`">{{ item.tenNhom }}</label>
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
                v-model="searchModel.types"
                id="type_1"
                value="noiBat"
              />
              <label for="type_1">Sách nổi bật</label>
            </div>

            <div class="div-input">
              <input
                type="checkbox"
                v-model="searchModel.types"
                id="type_2"
                value="khuyenDoc"
              />
              <label for="type_2">Sách khuyên đọc</label>
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
                v-model="searchModel.prices"
                id="price_prd_0"
                value="0"
              />
              <label for="price_prd_0">Tất cả</label>
            </div>
            <div class="div-input">
              <input
                type="checkbox"
                v-model="searchModel.prices"
                id="price_prd_1"
                value="<50"
              />
              <label for="price_prd_1">Dưới 50,000₫</label>
            </div>
            <div class="div-input">
              <input
                type="checkbox"
                id="price_prd_2"
                v-model="searchModel.prices"
                value="50-99"
              />
              <label for="price_prd_2">Từ 50,000₫ - 99,000₫</label>
            </div>
            <div class="div-input">
              <input
                type="checkbox"
                v-model="searchModel.prices"
                id="price_prd_3"
                value="100-199"
              />
              <label for="price_prd_3">Từ 100,000₫ - 199,000₫</label>
            </div>
            <div class="div-input">
              <input
                type="checkbox"
                v-model="searchModel.prices"
                id="price_prd_4"
                value="200-299"
              />
              <label for="price_prd_4">Từ 200,000₫ - 299,000₫</label>
            </div>
            <div class="div-input">
              <input
                type="checkbox"
                v-model="searchModel.prices"
                id="price_prd_5"
                value=">300"
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
                v-model="searchModel.discounts"
                id="price_discount_1"
                value="1"
              />
              <label for="price_discount_1">Có</label>
            </div>
            <div class="div-input">
              <input
                type="checkbox"
                v-model="searchModel.discounts"
                id="price_discount_0"
                value="0"
              />
              <label for="price_discount_0">Không</label>
            </div>
          </div>
        </div>
        <div class="box-filter last-box">
          <span class="btn-drop-filter btn-drop-filter7"
            ><i class="fa fa-angle-down"></i
          ></span>
          <select class="" v-model="searchModel.sortBy">
            <option value="0">Sắp xếp theo</option>
            <option value="price_asc">Giá tăng dần</option>
            <option value="price_desc">Giá giảm dần</option>
          </select>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import APIService from '@/helpers/ApiService';

export default {
  data() {
    return {
      searchModel: {
        categories: [],
        ages: [],
        types: [],
        prices: [],
        discounts: [],
        sortBy: '0',
        data: {},
      },
      categories: [],
      nhomDoTuoi: [],
    };
  },
  created() {
    APIService.get('/DanhMuc/GetDataByPage').then((response) => {
      var data = response.data.data;
      this.categories = data.items;
    });

    APIService.get('/NhomDoTuoi').then((response) => {
      var data = response.data.data;
      this.nhomDoTuoi = data.items;
    });
  },
  methods: {
    updateSearchModel() {
      console.log(this.searchModel);
      APIService.post('SanPham/Filter', this.searchModel).then((response) => {
        this.data = response.data.data;
        this.$emit('update-search-model', this.data);
      });
    },
  },
};
</script>
<style scoped>
.filter {
  width: 100%;
  margin-bottom: 20px;
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

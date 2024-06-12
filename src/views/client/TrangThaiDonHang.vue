<template>
  <Header></Header>
  <div style="background-color: white;">
    <div style="padding-top: 100px; padding-bottom: 100px; height: 1035px;" class="container">
      <a-tabs v-model:activeKey="activeKey" type="card">
        <a-tab-pane key="1" tab="Chờ xác nhận">
          <a-card>
            <a-table
              :columns="tableColumns"
              :dataSource="lstTrangThai1"
            >
            <template #bodyCell="{ column, index, record }">
                    <template v-if="column.key === 'STT'">
                      <ul class="list-inline hstack gap-2 mb-0">
                        <li>{{ index+1 }}</li>
                      </ul>
                    </template>
                    <template v-if="column.key === 'ngayDatHang'">
                      {{ formatDateTime(record.ngayDatHang) }}
                    </template>
                    <template v-if="column.key === 'diaChi'">
                      <ul class="list-inline hstack gap-2 mb-0">
                        <li>{{ record.diaChi }}, {{ record.xa }}, {{ record.huyen }}, {{ record.tinh }}</li>
                      </ul>
                    </template>
                    <template v-if="column.key === 'action'">
                      <ul class="list-inline hstack gap-2 mb-0">
                        <li>
                          <router-link :to="{ name: 'ChiTietDonHangClient', params: { id: record.id } }">
                            <i class="ri-information-line fs-16"></i>
                          </router-link>
                        </li>
                        </ul>
                  </template>
                </template>
            </a-table>
          </a-card>

        </a-tab-pane>
        <a-tab-pane key="2" tab="Chờ giao hàng">
          <a-card>
            <a-table
              :columns="tableColumns"
              :dataSource="lstTrangThai2"
            >
            <template #bodyCell="{ column, index, record }">
                    <template v-if="column.key === 'STT'">
                      <ul class="list-inline hstack gap-2 mb-0">
                        <li>{{ index+1 }}</li>
                      </ul>
                    </template>
                    <template v-if="column.key === 'ngayDatHang'">
                      {{ formatDateTime(record.ngayDatHang) }}
                    </template>
                    <template v-if="column.key === 'diaChi'">
                      <ul class="list-inline hstack gap-2 mb-0">
                        <li>{{ record.diaChi }}, {{ record.xa }}, {{ record.huyen }}, {{ record.tinh }}</li>
                      </ul>
                    </template>
                    <template v-if="column.key === 'action'">
                      <ul class="list-inline hstack gap-2 mb-0">
                        <li>
                          <router-link :to="{ name: 'ChiTietDonHangClient', params: { id: record.id } }">
                            <i class="ri-information-line fs-16"></i>
                          </router-link>
                        </li>
                        </ul>
                  </template>
                </template>
            </a-table>
          </a-card>
        </a-tab-pane>
        <a-tab-pane key="3" tab="Đã giao hàng">
          <a-card>
            <a-table
              :columns="tableColumns"
              :dataSource="lstTrangThai3"
            >
            <template #bodyCell="{ column, index, record }">
                    <template v-if="column.key === 'STT'">
                      <ul class="list-inline hstack gap-2 mb-0">
                        <li>{{ index+1 }}</li>
                      </ul>
                    </template>
                    <template v-if="column.key === 'diaChi'">
                      <ul class="list-inline hstack gap-2 mb-0">
                        <li>{{ record.diaChi }}, {{ record.xa }}, {{ record.huyen }}, {{ record.tinh }}</li>
                      </ul>
                    </template>
                    <template v-if="column.key === 'ngayDatHang'">
                      {{ formatDateTime(record.ngayDatHang) }}
                    </template>
                    <template v-if="column.key === 'action'">
                      <ul class="list-inline hstack gap-2 mb-0">
                        <li>
                          <router-link :to="{ name: 'ChiTietDonHangClient', params: { id: record.id } }">
                            <i class="ri-information-line fs-16"></i>
                          </router-link>
                        </li>
                        </ul>
                  </template>
                </template>
            </a-table>
          </a-card>
        </a-tab-pane>
        <a-tab-pane key="4" tab="Đã hủy">
          <a-card>
            <a-table
              :columns="tableColumns"
              :dataSource="lstTrangThai4"
            >
            <template #bodyCell="{ column, index, record }">
                    <template v-if="column.key === 'STT'">
                      <ul class="list-inline hstack gap-2 mb-0">
                        <li>{{ index+1 }}</li>
                      </ul>
                    </template>
                    <template v-if="column.key === 'diaChi'">
                      <ul class="list-inline hstack gap-2 mb-0">
                        <li>{{ record.diaChi }}, {{ record.xa }}, {{ record.huyen }}, {{ record.tinh }}</li>
                      </ul>
                    </template>
                    <template v-if="column.key === 'ngayDatHang'">
                      {{ formatDateTime(record.ngayDatHang) }}
                    </template>
                    <template v-if="column.key === 'action'">
                      <ul class="list-inline hstack gap-2 mb-0">
                        <li>
                          <router-link :to="{ name: 'ChiTietDonHangClient', params: { id: record.id } }">
                            <i class="ri-information-line fs-16"></i>
                          </router-link>
                        </li>
                        </ul>
                  </template>
                </template>
            </a-table>
          </a-card>
        </a-tab-pane>
      </a-tabs>
    </div>

  </div>
 <FooterClient></FooterClient>
</template>

<script>
import Common from "@/helpers/Common"
import APIService from '@/helpers/ApiService';
import Header from '@/components/Header';
import FooterClient from '@/components/FooterClient.vue';
export default {
  components:{
    Header,
    FooterClient
  },
  data(){
    return{
      activeKey: '1',
      
      lstTrangThai1 :[],
      lstTrangThai2 :[],
      lstTrangThai3 :[],
      lstTrangThai4 :[],
      UserId : '',
      tableColumns: [
        { title: "STT", width: 100, key: "STT" },
        { title: "Họ tên người nhận", dataIndex: "tenKhachHang", width:300},
        { title: "Địa chỉ", key: "diaChi", width:450 },
        { title: "Ngày đặt hàng", key: "ngayDatHang", width:450 },
        { title: "Thao tác",key: "action", width: 200}
      ],
    }
  },
  methods:{
    formatDateTime: Common.formatDateTime,
    async getDonHang(){
      console.log('id', this.UserId)
        var searchParam = {
          id: this.UserId,
         
        };
        var urlQuery = new URLSearchParams(searchParam).toString();
        var result = await APIService.get("/Order/GetByUserId?" + urlQuery);
        console.log('result', result)
        if (result.data.data != null) {
          var lstDonHang = result.data.data;
          this.lstTrangThai1 = lstDonHang.filter(x => x.trangThaiDonHang == 1)
          this.lstTrangThai2 = lstDonHang.filter(x => x.trangThaiDonHang == 2)
          this.lstTrangThai3 = lstDonHang.filter(x => x.trangThaiDonHang == 3)
          this.lstTrangThai4 = lstDonHang.filter(x => x.trangThaiDonHang == 4)
          console.log('kokok',result)
          console.log('lstTrangThai2',this.lstTrangThai2)
        } 
       
    },
    
  },
  mounted(){
    this.UserId = localStorage.getItem('UserId')
    this.getDonHang();
 
    
  }
}
</script>

<style>

</style>
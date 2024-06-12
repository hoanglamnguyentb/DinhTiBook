<template>
  <a-row style="padding-bottom: 20px;"  :gutter="20">
    <a-col :span="12">
      <a-card title="Top 5 sản phẩm bán chạy nhất">
    <div id="chartdiv" style="width: 100%; height: 500px;"></div>
  </a-card>
    </a-col>
    <a-col :span="12">
      <a-card style="height: 605px;" title="Danh sách sản phẩm sắp hết hàng">

        <a-table
              :columns="tableColumns"
              :dataSource="lstHetHang"
              :pagination="false"
              :loading="loading"
            >
              <template #bodyCell="{ column, index, record }">
                <template v-if="column.key === 'STT'">
                  <ul class="list-inline hstack gap-2 mb-0">
                    <li style="font-size: 18px; ">{{ index+1 }}</li>
                  </ul>
                </template>
                <template v-if="column.key === 'soLuongTon'">
                  <ul class="list-inline hstack gap-2 mb-0">
                    <li v-if="record.soLuongTon <= 5" style="color: red; font-size: 18px;">{{ record.soLuongTon}}</li>
                    <li v-if="record.soLuongTon > 5" style="color: #ffa300; font-size: 18px; font-weight: 600;">{{ record.soLuongTon }}</li>
                  </ul>
                </template>
               
              </template>
            </a-table>

      </a-card>
      
    </a-col>
  </a-row>
  
    
</template>

<script>
import APIService from "@/helpers/ApiService";
export default {
 
  name: "AmChartComponent",
  data(){
    return{
      top5SanPham:[],
      lstHetHang:[],
      tableColumns: [
        { title: "STT", width: 100, key: "STT" },
        { title: "Tên sách", dataIndex: "tenSach", width:300},      
        { title: "Số lượng ", key: "soLuongTon",  width:80 },  
      ],
    }
  },
  created(){
    this.getTop();

  },
  mounted() {
    this.getHetHang()
  },
  methods: {
    async getTop() {
      var result = await APIService.get("/SanPham/Top5");
      this.top5SanPham = result.data.map(item => {
      return {
        tenSach: item.tenSach,
        tenSachNgan: item.tenSach.length > 15 ? item.tenSach.substring(0, 15) + '...' : item.tenSach,
        soLuongDaBan: item.soLuongDaBan
      };
    });
      this.createChart();
    },
    async getHetHang() {
      var result = await APIService.get("/SanPham/HetHang");
      this.lstHetHang = result.data  
      console.log('sadasd', this.lstHetHang)
    },
    createChart() {
      // Create root element
      let root = am5.Root.new("chartdiv");

      // Set themes
      root.setThemes([am5themes_Animated.new(root)]);

      // Create chart
      let chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: true,
          panY: true,
          wheelX: "panX",
          wheelY: "zoomX",
          pinchZoomX: true,
          paddingLeft: 0,
          paddingRight: 1
        })
      );

      // Add cursor
      let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
      cursor.lineY.set("visible", false);

      // Create axes
      let xRenderer = am5xy.AxisRendererX.new(root, {
        minGridDistance: 30,
        minorGridEnabled: true
      });

      xRenderer.labels.template.setAll({
        rotation: -90,
        centerY: am5.p50,
        centerX: am5.p100,
        paddingRight: 15
      });

      xRenderer.grid.template.setAll({
        location: 1
      });

      let xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          maxDeviation: 0.3,
          categoryField: "tenSachNgan",
          renderer: xRenderer,
          tooltip: am5.Tooltip.new(root, {labelText: "{tenSach}"})
        })
      );

      let yRenderer = am5xy.AxisRendererY.new(root, {
        strokeOpacity: 0.1
      });

      let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          maxDeviation: 0.3,
          renderer: yRenderer
        })
      );

      // Create series
      let series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Series 1",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "soLuongDaBan",
          sequencedInterpolation: true,
          categoryXField: "tenSachNgan",
          tooltip: am5.Tooltip.new(root, {
            labelText: "Đã bán: {soLuongDaBan} sản phẩm"
          })
        })
      );

      series.columns.template.setAll({
        cornerRadiusTL: 5,
        cornerRadiusTR: 5,
        strokeOpacity: 0
      });

      series.columns.template.adapters.add("fill", function (fill, target) {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
      });

      series.columns.template.adapters.add("stroke", function (stroke, target) {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
      });


      let data = this.top5SanPham;
        console.log('dât',this.top5SanPham)
      xAxis.data.setAll(data);
      series.data.setAll(data);

      // Make stuff animate on load
      series.appear(1000);
      chart.appear(1000, 100);
    }
  }
};

</script>

<style lang="css" scoped>
#chartdiv {
  width: 100%;
  height: 500px;
}
</style>
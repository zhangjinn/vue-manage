<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div class="mod-demo-echarts">
    <el-alert
      title="提示："
      type="warning"
      :closable="false">
      <div slot-scope="description">
        <p class="el-alert__description">1.echarts官方网址：http://echarts.baidu.com/index.html</p>
      </div>
    </el-alert>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-card>
          <div id="J_chartBarBox" class="chart-box"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div id="J_chartPieBox" class="chart-box"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script type="text/ecmascript-6">
  import echarts from 'echarts'
  var app = {};
  app.config = {
    rotate: 0,
    align: 'center',
    verticalAlign: 'middle',
    position: 'top',
    distance: 15
  };
  var labelOptionBar = {
    normal: {
      show: true,
      position: app.config.position,
      distance: app.config.distance,
      align: app.config.align,
      verticalAlign: app.config.verticalAlign,
      rotate: app.config.rotate,
//            formatter: '{c}  {name|{a}}',
      formatter: '{c}',
      fontSize: 16,
      rich: {
        name: {
          textBorderColor: '#fff'
        }
      }
    }
  };
  var labelOptionPie = {
    normal: {
      show: true,
      position: 'inside',
//            formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
      formatter: '{d}%',//模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。{d}数据会根据value值计算百分比
      borderWidth: 1,
      borderRadius: 4,
      rich: {
        a: {
          color: '#999',
          lineHeight: 22,
          align: 'center'
        },
        hr: {
          borderColor: '#aaa',
          width: '100%',
          borderWidth: 0.5,
          height: 0
        },
        b: {
          fontSize: 16,
          lineHeight: 33
        },
        per: {
          color: '#eee',
          backgroundColor: '#334455',
          padding: [2, 4],
          borderRadius: 2
        }
      }
    }
  };
  //表示柱状图
  var ItemBar = function () {
    return {
      name: '',
      type: 'bar',
      barCateGoryGap:100,
      label: labelOptionBar,
      data: []
    }
  };
  export default {
    name: '',
    data () {
      return {
        chartBar: null,
        chartPie: null,
        optionBar:{//----bar parameter
          title: {// 图表标题
            text: '',
            x:'center',
            y: 'top',
            textAlign: null,
            borderColor: '#ccc',
            borderWidth: 0,
            padding: 5,
            itemGap: 10,
            textStyle: { }

          },
          color: ['#516b91', '#59c4e6', '#edafda', '#93b7e3'],
          tooltip: { //提示触发类型，默认（'item'）数据触发，可选为：'item' | 'axis'
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'  // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            orient: 'horizontal', // 'vertical'
            x: 'center',
            y: 'bottom',
            data: []
          },
          toolbox: {
            show: false, //是否显示工具栏组件
            orient: 'vertical', //工具栏 icon 的布局朝向'horizontal' 'vertical'
            left: 'right',  ////组件离容器左侧的距离,'left', 'center', 'right','20%'
            top: 'center', //组件离容器上侧的距离,'top', 'middle', 'bottom','20%'
            feature: {
              mark: {show: true},// '辅助线开关'
              dataView: {show: true, readOnly: false},////数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新
              magicType: {
                show: true,
                type: ['line', 'bar', 'stack', 'tiled']////启用的动态类型，包括'line'（切换为折线图）, 'bar'（切换为柱状图）, 'stack'（切换为堆叠模式）, 'tiled'（切换为平铺模式）
              },
              restore: {show: true},////配置项还原。//是否显示该工具。
              saveAsImage: {show: true}////保存为图片。//是否显示该工具。
            }
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',// //坐标轴类型。'value' 数值轴，适用于连续数据。'category' 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
              axisTick: {//坐标轴刻度相关设置
                show: false //是否显示坐标轴刻度。
              },
              data: [] //类目数据
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: []
        },
        optionPie:{//----pie parameter
          title : {
            text: '',
            subtext: '',
            x:'center',
            y: '20'
          },
          color: ['#516b91', '#59c4e6', '#edafda', '#93b7e3'],
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"

          },
          legend: {
            orient: 'horizontal',
            x: 'center',
            bottom:'20',
            data: []
          },
          series : [
            {
              name: '',
              type: 'pie',
              radius : '55%',
              center: ['50%', '50%'],
              label:labelOptionPie,
              data:[],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      }
    },
    activated(){
      // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
      if (this.chartBar) {
        this.chartBar.resize()
      }
      if (this.chartPie) {
        this.chartPie.resize()
      }
    },
    mounted(){
      this.$nextTick(function() {
        this.initChartBar('J_chartBarBox');
        this.initChartPie('J_chartPieBox');
      })
    },
    methods:{
      getBarData(){
        //当请求成功时，会执行 .then，否则执行 .catch
        // 这两个回调函数都有各自独立的作用域，如果直接在里面访问 this，无法访问到 Vue 实例,需加bind(this)
        this.$http({
          method: 'get',
          url: 'http://localhost:8083/static/data/dataBar.json',
          data: {}
        }).then(function(res){
            res=res.data;
            console.log(res);
            //定义4个变量分别存储title，legend,xAxis，series的值。
            var oTitle="";
            var legends=[];
            var xDateArr=[];
            var SeriesTotal=[];
            if (res) {
              this.chartBar.hideLoading();
              //获取图表标题
              oTitle=res.total.title;
              //给x轴赋值
              xDateArr=res.total.groups;
              for (var k in res.total.classifies) {
                //给legend赋值
                legends.push(res.total.classifies[k].name);
                //核心，给series赋值，分开包装的思想。
                var itemBar = new ItemBar();
                itemBar.name = res.total.classifies[k].name;
                itemBar.data = res.total.classifies[k].value;
                if(k==0){
                  itemBar['barGap'] = 0.25;
                }
                SeriesTotal.push(itemBar);
              }
              this.optionBar.title.text=oTitle;
              this.optionBar.legend.data = legends;
              //注意这里是xAxis[0],如果直接写xAxis会报错，因为x轴默认有2个，上半年轴和下半轴。
              this.optionBar.xAxis[0].data = xDateArr;
              this.optionBar.series = SeriesTotal;
              //这里最好加上true参数，否则会出现切换图表时前面数据不会清除掉的情况。
              if (this.optionBar && typeof this.optionBar === "object") {
                this.chartBar.setOption(this.optionBar, true);
              }
            }
          }.bind(this)).catch(function(err){
            console.log(err)
          })
      },
      getPieData(){
        this.$http({
          method: 'get',
          url: 'http://localhost:8083/static/data/dataPie.json',
          data: {}
        }).then(function(res){
          res=res.data;
          //定义4个变量分别存储title,legend,series.name，series.data值。
          var oTitle="";
          var legends=[];
          var SeriesName="";
          var SeriesTotal=[];
          console.log(res);
          if (res) {
            this.chartPie.hideLoading();
            //获取图表标题
            oTitle=res.total.title;
            //给series下name赋值
            SeriesName=res.total.seriesName;
            for (var k in res.total.classifies) {
              //给legend赋值
              legends.push(res.total.classifies[k].name);
              //核心，给series下data赋值
              SeriesTotal.push(res.total.classifies[k]);
            }

            this.optionPie.title.text=oTitle;
            this.optionPie.legend.data = legends;
            //注意这里是xAxis[0],如果直接写xAxis会报错，因为x轴默认有2个，上半年轴和下半轴。
            this.optionPie.series[0]['name'] = SeriesName;
            this.optionPie.series[0]['data'] = SeriesTotal;
            //这里最好加上true参数，否则会出现切换图表时前面数据不会清除掉的情况。
            if (this.optionPie && typeof this.optionPie === "object") {
              this.chartPie.setOption(this.optionPie, true);
            }
          }
        }.bind(this)).catch(function(err){
          console.log(err)
        })
      },
      //柱状图
      initChartBar(id){
        this.chartBar = echarts.init(document.getElementById(id));
        this.chartBar.showLoading();
        this.getBarData();
        window.addEventListener('resize', () => {
          this.chartBar.resize()
        })
      },
      //饼图
      initChartPie(id){
        this.chartPie = echarts.init(document.getElementById(id));
        this.chartPie.showLoading();
        this.getPieData();
        window.addEventListener('resize', () => {
          this.chartPie.resize()
        })
      }
    }
  }
</script>
<style scoped lang="less">
.mod-demo-echarts{
  > .el-alert {
    margin-bottom: 10px;
  }
  >.el-row{
     margin-top: -10px;
     margin-bottom: -10px;
     .el-col {
       padding-top: 10px;
       padding-bottom: 10px;
     }
  }
  .chart-box {
    min-height: 400px;
  }

}
</style>

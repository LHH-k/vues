<template>
  <div class="360info">
    <div class="list-box">
      <van-row>
          <van-col span="6" class="v-l">
            <ul>
              <li :class="{'active':service_type=='rsqwx'}" @click="select('rsqwx')">热水器维修</li>
              <li :class="{'active':service_type=='xxjwx'}" @click="select('xxjwx')">洗衣机维修</li>
              <li :class="{'active':service_type=='bxwx'}" @click="select('bxwx')">冰箱维修</li>
              <li :class="{'active':service_type=='dswx'}" @click="select('dswx')">电视维修</li>
              <li :class="{'active':service_type=='yyjwx'}" @click="select('yyjwx')">油烟机维修</li>
              <li :class="{'active':service_type=='rqzwx'}" @click="select('rqzwx')">燃气灶维修</li>
              <li :class="{'active':service_type=='ktwx'}" @click="select('ktwx')">空调维修</li>
            </ul>
          </van-col>
          <van-col span="18" class="v-r">
            <ul>
              <li v-for="(item , index) in service_show_info" :key="index">
                {{item.name}}
                <span>参考价：{{item.price}} 元</span>
              </li>
            </ul>
            <div class="statement">
              <div>
                <p>温馨提示：</p>
                <p>以上配件价格仅供部分参考，实际费用以用户选择的真实配件价格为准。</p>
              </div>
              <!-- <div>					  			
                <p>收费标准：</p>
                <p>1、每次服务费用为50元。</p>
                <p>2、如需要维修的配件价格在300元之内，平台将不收取任何配件费；如需要维修的配件价格超出300元，超出部分的费用由用户自行承担。</p>
              </div> -->
            </div>
          </van-col>
      </van-row>
      <!-- <a class="next" :href='"call-callService.html?order_id=" + order_id + "#" + hash'>下一步</a> -->
    </div>
  </div>
</template>

<script>
  export default {
    name: '360info',
    data () {
      return {
        service_type: 'rsqwx',
        service_info: [],
        service_show_info: [] //当前选中的项目
      }
    },
    created(){
      var _this = this;
      //获取服务价格内容
      this.$http.get('./static/data/service-price.json').then(function (res) {
        _this.service_info = res.data;
        _this.service_show_info = _this.service_info['rsqwx'];
      });
    },
    methods:{
      //选择
      select: function select(num) {
        this.service_type = num;
        this.service_show_info = this.service_info[num];
        document.documentElement.scrollTop = document.body.scrollTop = 0;
      },
    }
   
  }
</script>

<style scoped>
  .list-box{color: #999;position: relative;height: 100vh;}
  .list-box .van-row{height: 100%;}
  .next{position: absolute;left: 0;bottom: 0;background: #489EF0;height:.45rem;line-height: .45rem;text-align: center;width: 100%;color: #fff;font-size: .16rem;}
  .v-l{font-size: .14rem;padding-bottom: .45rem;border-right: 1px solid #ddd;position: fixed;z-index: 2;min-height: 100vh;background: #fff;}
  .v-l ul li{line-height: 2.5;border-bottom: 1px solid #ddd;text-align: center;}
  .v-l ul li.active{background: #489EF0;color: #fff;border-color: #4890EB;}
  .v-r{padding-left: 5px;padding-bottom: .45rem;position: relative;z-index: 1;left: 25%;top: 0;background: #fff;}
  .v-r ul li{font-size: .12rem;line-height: 2.5;border-bottom: 1px solid #ddd;padding: 0 5px;overflow: hidden;}
  .v-r ul li span{float: right;}
  .statement{padding: 5px;line-height: 1.6;text-align: justify;font-size: .12rem;}
  .statement div{margin: 5px 0;}
  
</style>

<template>
  <div class="rate">
    <div class="box-b">
      <p>请为本次服务打分</p>
      <el-rate v-model="rate.star" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" style="margin:20px 0 30px;height:auto;"></el-rate>
      <van-field class="my-textarea" v-model="rate.txts" type="textarea" placeholder="有什么想说的吗？" rows="2" autosize></van-field>
    </div>
    <div style="margin: 40px 0 20px;text-align:center;">					
      <van-button class='btn-primary' size="large" @click="register()">提交</van-button>
    </div>
  </div>
</template>

<script>
  import BASE_URL from '../constants';
  export default {
    name: 'home',
    data () {
      return {
        rate:{
          star:0,
          txts:'',
        },
      }
    },
    components:{
      
    },
    created(){
      
    },
    methods:{
      register(id){
        if (!this.rate.star) {
          this.$toast.fail("请为本次服务打分!");
        } else {
          //验证通过，提交数据
          this.globalToast = this.$toast.loading({
            duration: 0, // 持续展示 toast
            mask: true, //背景层
            forbidClick: true, // 禁用背景点击
            message: '提交中...'
          });
          //提交服务结果
          var datas = {
            card_id: this.$route.query.card_id,
            content: this.rate.txts,
            star: this.rate.star
          };
          this.$http.post(`${BASE_URL}/fnw/post/ServiceComment/${localStorage.getItem('phone')}`,datas).then((res)=>{
            this.globalToast.clear();
            if(res.data.res){
              this.$router.replace({name:'success',params:{type:'afterS'}});
            }else{
              this.$toast.fail(res.data.ex)
            }
          })
        }
      }
    }
   
  }
</script>

<style>
  .rate{background: #fff;padding: 20px 25px 30px;}
  .rate .box-b{text-align: center;}
  .rate .el-rate__icon{font-size: .26rem;margin-right: 10px;}
</style>

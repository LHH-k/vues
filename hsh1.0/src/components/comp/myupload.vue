<template>
  <div class="pic-box"> 
    <input id="imgUpload" type="file" @change="addPic" accept="image/*" name="photo" capture="camera"/>
    <img v-if="img" :src="img"/>
    <div v-else>
      <van-icon name="add-o"></van-icon>
      <span>{{txt}}</span>
    </div>
  </div>
</template>

<script>
import BASE_URL from '../../constants';
export default {
  name: "myupload",
  props: ['ind', 'txt'],
  data() {
    return {
      globalToast: null,
      myFile:null,
      img: '',
      picInfo: {
        //图片上传的属性
        url: `${BASE_URL}/fnw/post/uploadBlob`,
        name: "photo"
      },
      Orientation:null,
    };
  },
  methods:{
    /////////////////js原生的上传并压缩图片///////////////////////
    addPic: function addPic(e) {
        var _this = this;
        if (typeof FileReader === 'undefined') {
            return alert('你的浏览器不支持上传图片哟！');
        }
        var files = e.target.files || e.dataTransfer.files;
        if(this.myFile !== files[0] && files.length > 0){
            this.myFile = files[0];
            EXIF.getData(_this.myFile, function() {  
                _this.Orientation = EXIF.getTag(this, 'Orientation');
            });
            this.imgResize(files[0]);
            this.globalToast = this.$toast.loading({
                duration: 0, // 持续展示 toast
                mask: true, //背景层
                forbidClick: true, // 禁用背景点击
                message: '图片上传中...'
            });
        }
    },

    //压缩图片
    imgResize: function imgResize(file) {
        var fileReader = new FileReader();
        var _that = this;
        fileReader.onload = function () {
            var IMG = new Image();
            IMG.src = this.result;
            IMG.onload = function () {
                var w = this.naturalWidth,
                    h = this.naturalHeight,
                    resizeW = 0,
                    resizeH = 0;
                // maxSize 是压缩的设置，设置图片的最大宽度和最大高度，等比缩放，level是报错的质量，数值越小质量越低
                var maxSize = {
                    width: 768,
                    height: 768,
                    level: 0.8
                };
                var multiple = Math.max(w / maxSize.width, h / maxSize.height);
                resizeW = w / multiple;
                resizeH = h / multiple;
                var canvas = document.createElement('canvas'),
                    ctx = canvas.getContext('2d');
                if(_that.Orientation && _that.Orientation!=1){
                    switch(_that.Orientation){
                        case 6:
                            canvas.width = resizeH;    
                            canvas.height = resizeW;    
                            ctx.rotate(Math.PI / 2);    
                            ctx.drawImage(IMG, 0, -resizeH, resizeW, resizeH);
                            break;
                        case 3:
                            ctx.rotate(Math.PI);    
                            ctx.drawImage(IMG, -resizeW, -resizeH, resizeW, resizeH);
                            break;
                        case 8:
                            canvas.width = resizeH;    
                            canvas.height = resizeW;    
                            ctx.rotate(3 * Math.PI / 2);    
                            ctx.drawImage(IMG, -resizeW, 0, resizeW, resizeH);
                            break;
                    }
                }else{
                    canvas.width = resizeW;
                    canvas.height = resizeH;
                    ctx.drawImage(IMG, 0, 0, resizeW, resizeH);
                }
                var base64 = canvas.toDataURL('image/jpeg', maxSize.level);
                _that.convertBlob(window.atob(base64.split(',')[1]));
            };
        };
        fileReader.readAsDataURL(file);
    },

    // 将base64的数据转换成一个Blob对象
    // 安卓手机不支持Blob构造方法
    convertBlob: function convertBlob(base64) {
        var buffer = new ArrayBuffer(base64.length);
        var ubuffer = new Uint8Array(buffer);
        for (var i = 0; i < base64.length; i++) {
            ubuffer[i] = base64.charCodeAt(i);
        }
        var blob;
        try {
            blob = new Blob([buffer], { type: 'image/jpg' });
        } catch (e) {
            window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
            if (e.name === 'TypeError' && window.BlobBuilder) {
                var blobBuilder = new BlobBuilder();
                blobBuilder.append(buffer);
                blob = blobBuilder.getBlob('image/jpg');
            }
        }
        this.callback(blob);
    },

    // 使用HTML5的FormData对象上传数据
    callback: function callback(fileResize) {
        var _this = this;
        var data = new FormData();
        data.append(this.picInfo.name, fileResize);
        var config = {
            headers: { 'Content-Types': 'multipart/form-data' }
        };
        //上传图片给后台
        this.$http.post(this.picInfo.url, data, config).then(function (res) {
            _this.globalToast.clear();
            _this.img = BASE_URL + res.data.data.store_result;
            //子组件间数据返回父组件
            _this.$emit("childget", _this.ind, res.data.data.store_result);
        }).catch(function (err) {});
    }
  }
};
</script>

<style scoped>
  
</style>

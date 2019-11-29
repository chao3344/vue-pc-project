<template>
    <div>
        
        <Table border :columns="columns12" :data="data">
            <div slot="header" class="Title">
                <Button @click="addMovie" type="success" style="margin-left: 5px">添加电影</Button>
                <PageNum @Page="OnPageInfo" :total="total"></PageNum>
            </div>
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>
                <Button type="error" size="small" @click="remove(index,row)">Delete</Button>
            </template>
        </Table>

        <Modal 
            v-model="showadd" width="800" :styles="{top:'30px'}"
            @on-ok="sureadd"
        >
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>添加电影</span>
            </p>
            <div style="text-align:center">
                <Form :model="formData" ref="formValidate" :label-width="80">
                    <FormItem label="电影海报">
                        <Upload 
                            name="positionImg"
                            :before-upload="handleUpload" 
                            action="/api/position/upload_img"
                            :on-success="handleSucc"
                        >
                        <div v-if="file !== null">
                            <img :src="insideSrc" alt="" style="width: 60px; height: 60px;" />
                        </div>
                        <Button icon="ios-cloud-upload-outline">点击上传图片</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label="电影名称">
                        <Input v-model="formData.nm" placeholder="请输入电影名称" />
                    </FormItem>
                    <FormItem label="评分">
                        <Input v-model="formData.sc" placeholder="请输入评分" />
                    </FormItem>
                    <FormItem label="主演">
                        <Input v-model="formData.star" placeholder="请输入主演" />
                    </FormItem>
                    <FormItem label="上映时间">
                        <Input v-model="formData.rt" placeholder="请输入上映时间" />
                    </FormItem>
                    <FormItem label="单价">
                        <Input v-model="formData.InMoney" placeholder="请输入单价" />
                    </FormItem>
                    <FormItem label="发布时间">
                        <Row>
                          <Col span="6">
                            <FormItem prop="date">
                              <DatePicker :value="date" @on-change="handleDateChange" type="date" placeholder="Select date"></DatePicker>
                            </FormItem>
                          </Col>
                          <Col span="2" style="text-align: center">-</Col>
                          <Col span="11">
                            <FormItem prop="time">
                              <TimePicker :value="time" @on-change="handleTimeChange" type="time" placeholder="Select time"></TimePicker>
                            </FormItem>
                          </Col>
                        </Row>
                      </FormItem>
                </Form>

            </div>
          
        </Modal>
    </div>
</template>

<script>
import { 
    Table, 
    Button,
    Modal,
    Icon,
    Form,
    FormItem,
    Input,
    Upload,
    Col,
    DatePicker,
    TimePicker,
    Row,
    

} from 'view-design'
import { get,post } from '../utils/http'
import moment from 'moment'
import PageNum from './Page'
import _ from 'lodash'

export default {
    data () {
        return {
            formData:{
                
                insideSrc:'',
                nm:'',
                sc:'',
                star:'',
                rt:'',
                InMoney:'',
                datetime:'',
                
            },
            columns12: [
                {
                    title: '电影剧照',
                    key: 'positionImg',
                    className:'pic',
                    render:(h,{row})=>{
                        
                        return h('img',{
                            attrs:{
                                src: 'http://localhost:3000/uploads/' + row.positionImg,
                            }
                        },null)
                    }
                },
                {
                    title: '电影名称',
                    key: 'nm'
                },
                {
                    title: '评分',
                    key: 'sc'
                },
                {
                    title: '主演',
                    key: 'star'
                },
                {
                    title: '上映时间',
                    key: 'rt'
                },
                {
                    title: '影片单价',
                    key: 'InMoney'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 150,
                    align: 'center',
                }
            ],
            data:[

            ],
            
            showadd:false,
            modal_loading:false,
            file:null,
            insideSrc:[],
            date: new Date(),
            time: new Date(),
            middledata:[],
            pageNo:1,
            pageSize:5,
            total:null
            
        }
    },
    components:{
        Table,
        Button,
        Modal,
        Icon,
        Form,
        FormItem,
        Input,
        Upload,
        Col,
        DatePicker,
        TimePicker,
        Row,
        PageNum
        
    },
    async mounted(){
        let result = await get('/api/position')
        
        this.middledata = result.list
        // 一共含有的数据
        this.total = this.middledata.length

        this.data = _.chunk(this.middledata, this.pageSize)[this.pageNo - 1]
        
    },
    beforeRouteEnter (to, from, next) {
        next((vm) => {
        vm.$emit('onRouteChange', to)
        })
    },
    methods: {
        show(index){
            this.$Modal.info({
                title: "User Info",
                content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
            })
        },
        async remove(index,row){
           
            // this.data.splice(index, 1);
            let id = row._id
            let tempHotelImg = row.positionImg  
            let result = await post('/api/position/delete',{id,tempHotelImg}) 
            

            let newresult = await get('/api/position')
            this.middledata = newresult.list
            this.data = _.chunk(this.middledata, this.pageSize)[this.pageNo - 1]
        },
        addMovie(){
            this.showadd = true
            
        },
        sure(){
            this.modal_loading = true;
            setTimeout(() => {
                this.modal_loading = false;
                this.showadd = false;
                
            }, 1000);

           

        },
        handleUpload(file){
            this.file = file;

            // 转换为base64
            const reader = new FileReader()
            // 将读取到的文件编码成Data URL
            reader.readAsDataURL(file)
            reader.onload = (event) => {
            this.insideSrc = event.srcElement.result
            }
        },
        async handleSucc(response,file,fileList){
            let ret = response.ret
            
            if ( ret ) {
                let filename = response.data.filename
                this.formData.positionImg = filename
                this.file = null
               
               
            } else {
                this.$Message.error("图片上传失败.");
            }
        },
        async sureadd(err){
           
            if (this.formData.datetime === '') {
                this.formData.datetime = moment().format('YYYY-MM-DD, HH:mm:ss');
            }
            if(this.formData.positionImg){
                
                let result = await post('/api/position/addInfo',this.formData)
                
                
                // 添加完成后再做一次ajax请求，完成数据的更新
                let newresult = await get('/api/position')

                this.middledata = newresult.list
                this.data = _.chunk(this.middledata, this.pageSize)[this.pageNo - 1]
                // console.log(this.$refs.formValidate.resetFields)
            }else {
                this.$Message.error('error.')
            }

        },
        handleDateChange(date){
            this.formData.datetime = date + this.time
        },
        handleTimeChange(time){
            this.formData.datetime = this.date + time
        },
        OnPageInfo({pageNo,pageSize}){
            this.pageNo = pageNo
            this.pageSize = pageSize
            // 重新渲染数据
            this.data = _.chunk(this.middledata, this.pageSize)[this.pageNo - 1]
        }
    }


}
</script>

<style lang="less">
.Title{
    button{
        float: left;
        margin-right: 30px
    }
}
.pic{
    img{
        width: 60px;
        height: 60px;
    }
}
</style>
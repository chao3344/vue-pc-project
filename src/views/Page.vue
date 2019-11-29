<template>
    <Page 
        :total="total"
        :page-size="pageSize"
        :page-size-opts="[5, 10, 20]"
        :show-sizer="true"
        @on-change="handleChange"
        placement="bottom"
        @on-page-size-change="handlePageSizeChange"
        class="page"
        show-elevator
/>
</template>

<script>
import {
    Page,
} from 'view-design'
export default {
    props:{
        total:Number
    },
    data () {
        return {
            pageNo: 1,
            pageSize: 5,
            
        }
    },
    created() {
    this.$watch(
      () => {
        this.$emit('Page', {
          pageNo: this.pageNo,
          pageSize: this.pageSize
          
        })
      }
    )
  },
  methods: {
    handleChange(pageNo){
        this.pageNo = pageNo
        
    },
    handlePageSizeChange(pageSize){
        this.pageSize = pageSize
        
    }
  },
    components:{
        Page
    },
   

}
</script>

<style lang="less" scoped>

</style>

<style lang="less" scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                            电影管理系统
                        </MenuItem>
                        
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                Item 1
                            </template>
                            <MenuItem name="1-1" to="/home">
                                <Icon type="ios-navigate"></Icon>
                                <span>首页</span>
                            </MenuItem>
                            <MenuItem name="1-2" to="/position">
                                <Icon type="ios-search"></Icon>
                                <span>影片管理</span>
                            </MenuItem>
                            <MenuItem name="1-3">Option 3</MenuItem>
                        </Submenu>
                        
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb>
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        <router-view></router-view>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>



<script>
import { 
    Layout,
    Sider,
    Menu,
    MenuItem,
    Icon,
    Header,
    Content,
    Footer,
    Breadcrumb,
    BreadcrumbItem,
    Submenu
 } from "view-design";
export default {
  components:{
    Layout,
    Sider,
    Menu,
    MenuItem,
    Icon,
    Header,
    Content,
    Footer,
    Breadcrumb,
    BreadcrumbItem,
    Submenu
  },

 
}

</script>


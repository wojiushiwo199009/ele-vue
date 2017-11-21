<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    <el-aside style="background-color: rgb(238, 241, 246)">
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group>
      <el-autocomplete
        v-model="state4"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入内容"
        @select="handleInputSelect"
      ></el-autocomplete>
      <el-menu default-active="1-1-1"  class="el-menu-vertical-demo" @select="handleSelect" @open="handleOpen" @close="handleCloseInput" :collapse="isCollapse">
        <template v-for="(children,index) in routers">
          <el-submenu :index="children.path">
            <template slot="title">
              <i :class="children.icon"></i>
              <span slot="title">{{children.name}}</span>
            </template>
            <template v-for="(child,index) in children.children">
              <el-submenu :index="child.path" v-if="child.children.length>0">
                <template slot="title">
                  <i :class="child.icon"></i>
                  <span slot="title">{{child.name}}</span>
                </template>
                <template v-for="(childItem,index) in child.children">
                  <el-submenu :index="childItem.path" v-if="childItem.children.length>0">
                    <template slot="title">
                      <i :class="childItem.icon"></i>
                      <span slot="title">{{childItem.name}}</span>
                    </template>
                    <template v-for="(Item,index) in childItem.children">
                      <el-submenu :index="Item.path" v-if="Item.children.length>0">
                        <template slot="title">
                          <i :class="child.icon"></i>
                          <span slot="title">{{Item.name}}</span>
                        </template>
                        <template v-for="(Itemchild,index) in Item.children">
                          <el-submenu :index="Itemchild.path" v-if="Itemchild.children.length>0">
                            <template slot="title">
                              <i :class="child.icon"></i>
                              <span slot="title">{{Itemchild.name}}</span>
                            </template>
                          </el-submenu>
                          <el-menu-item :index="Itemchild.path" v-if="Itemchild.children.length===0">
                            <i :class="Itemchild.icon"></i> {{Itemchild.name}}
                          </el-menu-item>
                        </template>
                      </el-submenu>
                      <el-menu-item :index="Item.path" v-if="Item.children.length===0">
                        <i :class="Item.icon"></i> {{Item.name}}
                      </el-menu-item>
                      <template :index="Item.path" v-if="childItem.children.length===0">
                        <template v-for="(Menu,index) in Item.children">
                          <el-menu-item :index="Menu.path">
                            <i :class="Menu.icon"></i>
                           {{Menu.name}}
                          </el-menu-item>
                        </template>
                      </template>
                      <el-menu-item v-if="childItem.children.length===0" :index="Item.path">
                        <i :class="Item.icon"></i>{{Item.name}}
                      </el-menu-item>
                    </template>
                  </el-submenu>
                  <el-menu-item :index="childItem.path" v-if="childItem.children.length===0">
                    <i :class="childItem.icon"></i> {{childItem.name}}
                  </el-menu-item>
                </template>
              </el-submenu>
              <el-menu-item :index="child.path" v-if="child.children.length===0" >
                <i :class="child.icon"></i> {{child.name}}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
       <!-- <el-submenu index="0">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </template>
          <el-submenu index="1">
            <template slot="title">
              <i class="fa fa-folder-o fa-1x"></i>
              <span slot="title">P2P监管服务子平台</span>
            </template>
            <el-submenu index="1-1">
              <template slot="title">
                <i class="fa fa-folder-o fa-1x"></i>
                <span slot="title">违规平台监测</span>
              </template>
              <el-menu-item index="1-1-1"><i class="fa fa-file-o fa-1x"></i> 未按要求备案</el-menu-item>
              <el-menu-item index="1-1-2"><i class="fa fa-file-o fa-1x"></i> 资金未第三方托管</el-menu-item>
              <el-menu-item index="1-1-3"><i class="fa fa-file-o fa-1x"></i> 未第三方担保</el-menu-item>
              <el-menu-item index="1-1-4"><i class="fa fa-file-o fa-1x"></i> 单一融资项目募集期超期</el-menu-item>
              <el-menu-item index="1-1-5"><i class="fa fa-file-o fa-1x"></i> 融资期限拆分</el-menu-item>
              <el-menu-item index="1-1-6"><i class="fa fa-file-o fa-1x"></i> 虚假违法广告</el-menu-item>
            </el-submenu>
            <el-menu-item index="1-2-1"><i class="fa fa-file-o fa-1x"></i> 问题平台分析</el-menu-item>
            <el-menu-item index="1-3-1"><i class="fa fa-file-o fa-1x"></i> 风险分析</el-menu-item>
            <el-submenu index="1-4">
              <template slot="title">
                <i class="fa fa-folder-o fa-1x"></i>
                <span slot="title">查询中心</span>
              </template>
              <el-submenu index="1-4-1">
                <template slot="title">
                  <i class="fa fa-folder-o fa-1x"></i>
                  <span slot="title">借款人查询</span>
                </template>
                <el-menu-item index="1-4-1-1"><i class="fa fa-file-o fa-1x"></i> 查询页面</el-menu-item>
              </el-submenu>
              <el-menu-item index="1-4-2"><i class="fa fa-file-o fa-1x"></i> 出借人查询</el-menu-item>
              <el-menu-item index="1-4-3"><i class="fa fa-file-o fa-1x"></i> 一键查询</el-menu-item>
            </el-submenu>
            <el-menu-item index="1-5-1"><i class="fa fa-file-o fa-1x"></i> 统计报表</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="fa fa-folder-o fa-1x"></i>
              <span slot="title">ICO监管服务子平台</span>
            </template>
            <el-submenu index="2-1">
              <template slot="title">
                <i class="fa fa-folder-o fa-1x"></i>
                <span slot="title">ICO行业态势</span>
              </template>
              <el-menu-item index="2-1-1"><i class="fa fa-file-o fa-1x"></i> ICO融资情况</el-menu-item>
              <el-menu-item index="2-1-2"><i class="fa fa-file-o fa-1x"></i> 投资人情况</el-menu-item>
            </el-submenu>
            <el-menu-item index="2-2"><i class="fa fa-file-o fa-1x"></i> 违规平台监测</el-menu-item>
            <el-menu-item index="2-3"><i class="fa fa-file-o fa-1x"></i> 风险分析</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">
                <i class="fa fa-folder-o fa-1x"></i>
                <span slot="title">查询中心</span>
              </template>
              <el-menu-item index="2-4-1"><i class="fa fa-file-o fa-1x"></i> ICO项目查询</el-menu-item>
              <el-menu-item index="2-4-2"><i class="fa fa-file-o fa-1x"></i> 投资人查询</el-menu-item>
              <el-menu-item index="2-4-3"><i class="fa fa-file-o fa-1x"></i> 一键查询</el-menu-item>
            </el-submenu>
            <el-menu-item index="2-5-1"><i class="fa fa-file-o fa-1x"></i> 统计报表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="fa fa-folder-o fa-1x"></i>
              <span slot="title">现金贷监管服务子平台</span>
            </template>
            <el-submenu index="3-1">
              <template slot="title">
                <i class="fa fa-folder-o fa-1x"></i>
                <span slot="title">现金贷行业态势</span>
              </template>
              <el-menu-item index="3-1-1"><i class="fa fa-file-o fa-1x"></i> ICO融资情况</el-menu-item>
              <el-menu-item index="3-1-2"><i class="fa fa-file-o fa-1x"></i> 投资人情况</el-menu-item>
            </el-submenu>
            <el-menu-item index="3-2"><i class="fa fa-file-o fa-1x"></i> 违规平台监测</el-menu-item>
            <el-menu-item index="3-3"><i class="fa fa-file-o fa-1x"></i> 风险分析</el-menu-item>
            <el-submenu index="3-4">
              <template slot="title">
                <i class="fa fa-folder-o fa-1x"></i>
                <span slot="title">查询中心</span>
              </template>
              <el-menu-item index="3-4-1"><i class="fa fa-file-o fa-1x"></i> ICO项目查询</el-menu-item>
              <el-menu-item index="3-4-2"><i class="fa fa-file-o fa-1x"></i> 投资人查询</el-menu-item>
              <el-menu-item index="3-4-3"><i class="fa fa-file-o fa-1x"></i> 一键查询</el-menu-item>
            </el-submenu>
            <el-menu-item index="3-5"><i class="fa fa-file-o fa-1x"></i> 统计报表</el-menu-item>
          </el-submenu>
        </el-submenu>-->
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="(val,index) in breadcrumbs" :to="{ path: val.path}" :key="index">{{val.name}}</el-breadcrumb-item>
          <el-dropdown trigger="click" @command="closeTabs">
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="others">关闭其它</el-dropdown-item>
              <el-dropdown-item command="all">关闭所有</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </el-breadcrumb>
      </el-header>
        <el-main>
          <span @click="handleTagClick($event)">
            <el-tag>首页</el-tag>
          </span>
          <span @click="handleTagClick($event)">
            <el-tag
              v-for="tag in dynamicTags"
              :key="tag.name"
              closable
              :disable-transitions="false"
              :type="tag.type"
              ref="tagLists"
              @close.stop="handleCloseTab(tag)">
              {{tag.name}}
            </el-tag>
          </span>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>

          <!-- <el-table :data="tableData">
             <el-table-column prop="date" label="日期" width="140">
             </el-table-column>
             <el-table-column prop="name" label="姓名" width="120">
             </el-table-column>
             <el-table-column prop="address" label="地址">
             </el-table-column>
           </el-table>-->
          <div class="J_iframe" id="iframe0" name="iframe0" data-id="chartPie" >
            <HOME></HOME>
          </div>
        </el-main>
    </el-container>
  </el-container>
</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .el-aside {
    color: #333;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    /* width: 200px; */
    min-height: 400px;
  }
  .el-breadcrumb__separator{
    color: #37383a;
  }
  .el-breadcrumb{
    line-height: 60px;;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
<script>
  import HOME from '../my-components/home.vue'
  import chartPie from '../my-components/pie.vue'
  import chartBar from '../my-components/bar.vue'
  // import breadCrumb from '../my-components/breadCrumb.vue'
  export default {
    name: 'app',
    data () {
      /* const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      } */
      return {
        // tableData: Array(20).fill(item),
        isCollapse: false,
        restaurants: [],
        state4: '',
        timeout: null,
        routers: [
          {
            'path': '0',
            'icon': 'el-icon-menu',
            'name': '首页',
            'children': [
              {
                'path': '1',
                'icon': 'fa fa-folder-o fa-1x',
                'name': 'P2P监管服务子平台',
                'children': [
                  {
                    'path': '1-1',
                    'icon': 'fa fa-folder-o fa-1x',
                    'name': '违规平台监测',
                    'children': [
                      {
                        'path': '1-1-1',
                        'icon': 'fa fa-file-o fa-1x',
                        'name': '未按要求备案',
                        'children': []
                      },
                      {
                        'path': '1-1-2',
                        'icon': 'fa fa-file-o fa-1x',
                        'name': '资金未第三方托管',
                        'children': []
                      },
                      {
                        'path': '1-1-3',
                        'icon': 'fa fa-file-o fa-1x',
                        'name': '未第三方担保',
                        'children': []
                      },
                      {
                        'path': '1-1-4',
                        'icon': 'fa fa-file-o fa-1x',
                        'name': '单一融资项目募集期超期',
                        'children': []
                      },
                      {
                        'path': '1-1-5',
                        'icon': 'fa fa-file-o fa-1x',
                        'name': '融资期限拆分',
                        'children': []
                      },
                      {
                        'path': '1-1-6',
                        'icon': 'fa fa-file-o fa-1x',
                        'name': '虚假违法广告',
                        'children': []
                      }
                    ]
                  },
                  {
                    'path': '1-2',
                    'icon': 'fa fa-file-o fa-1x',
                    'name': '问题平台分析',
                    'children': []
                  },
                  {
                    'path': '1-3',
                    'icon': 'fa fa-file-o fa-1x',
                    'name': '风险分析',
                    'children': []
                  },
                  {
                    'path': '1-4',
                    'icon': 'fa fa-folder-o fa-1x',
                    'name': '查询中心',
                    'children': [
                      {
                        'path': '1-4-1',
                        'icon': 'fa fa-folder-o fa-1x',
                        'name': '借款人查询',
                        'children': [
                          {
                            'path': '1-4-1-1',
                            'icon': 'fa fa-file-o fa-1x',
                            'name': '借款人查询页面',
                            'children': []
                          }
                        ]
                      },
                      {
                        'path': '1-4-2',
                        'icon': 'fa fa-file-o fa-1x',
                        'name': '出借人查询',
                        'children': []
                      },
                      {
                        'path': '1-4-3',
                        'icon': 'fa fa-file-o fa-1x',
                        'name': '一键查询',
                        'children': []
                      }
                    ]
                  },
                  {
                    'path': '1-5',
                    'icon': 'fa fa-file-o fa-1x',
                    'name': '统计报表',
                    'children': []
                  }
                ]
              },
              {
                'path': '2',
                'icon': 'fa fa-folder-o fa-1x',
                'name': 'ICO监管服务子平台',
                'children': [
                  {
                    'path': '2-1',
                    'icon': 'fa fa-folder-o fa-1x',
                    'name': 'ICO行业态势',
                    'children': [
                      {
                        'path': '2-1-1',
                        'icon': 'fa fa-file-o fa-1x',
                        'name': 'ICO融资情况',
                        'children': []
                      },
                      {
                        'path': '2-1-2',
                        'icon': 'fa fa-file-o fa-1x',
                        'name': '投资人情况',
                        'children': []
                      }
                    ]
                  },
                  {
                    'path': '2-2',
                    'icon': 'fa fa-file-o fa-1x',
                    'name': '违规平台监测',
                    'children': []
                  },
                  {
                    'path': '2-3',
                    'icon': 'fa fa-file-o fa-1x',
                    'name': '风险分析',
                    'children': []
                  },
                  {
                    'path': '2-4',
                    'icon': 'fa fa-folder-o fa-1x',
                    'name': '查询中心',
                    'children': [
                      {
                        'path': '2-4-1',
                        'icon': 'fa fa-file-o fa-1x',
                        'name': 'ICO项目查询',
                        'children': []
                      },
                      {
                        'path': '2-4-2',
                        'icon': 'fa fa-file-o fa-1x',
                        'name': '投资人查询',
                        'children': []
                      }
                    ]
                  },
                  {
                    'path': '2-5',
                    'icon': 'fa fa-file-o fa-1x',
                    'name': '统计报表',
                    'children': []
                  }
                ]
              },
              {
                'path': '3',
                'icon': 'fa fa-folder-o fa-1x',
                'name': '现金贷监管服务子平台',
                'children': [
                  {
                    'path': '3-1',
                    'icon': 'fa fa-folder-o fa-1x',
                    'name': '现金贷行业态势',
                    'children': [
                      {
                        'path': '3-1-1',
                        'icon': 'fa fa-file-o fa-1x',
                        'name': 'ICO融资情况',
                        'children': []
                      },
                      {
                        'path': '3-1-2',
                        'icon': 'fa fa-file-o fa-1x',
                        'name': '投资人情况',
                        'children': []
                      }
                    ]
                  },
                  {
                    'path': '3-2',
                    'icon': 'fa fa-file-o fa-1x',
                    'name': '违规平台监测',
                    'children': []
                  },
                  {
                    'path': '3-3',
                    'icon': 'fa fa-file-o fa-1x',
                    'name': '风险分析',
                    'children': []
                  },
                  {
                    'path': '3-4',
                    'icon': 'fa fa-folder-o fa-1x',
                    'name': '查询中心',
                    'children': [
                      {
                        'path': '3-4-1',
                        'icon': 'fa fa-file-o fa-1x',
                        'name': 'ICO项目查询',
                        'children': []
                      },
                      {
                        'path': '3-4-2',
                        'icon': 'fa fa-file-o fa-1x',
                        'name': '投资人查询',
                        'children': []
                      },
                      {
                        'path': '3-4-3',
                        'icon': 'fa fa-file-o fa-1x',
                        'name': '一键查询',
                        'children': []
                      }
                    ]
                  },
                  {
                    'path': '3-5',
                    'icon': 'fa fa-file-o fa-1x',
                    'name': '统计报表',
                    'children': []
                  }
                ]
              }
            ]
          }
        ],
        breadcrumbs: [
          {
            'path': '0',
            'name': '首页'
          },
          {
            'path': '1',
            'name': 'P2P监管服务子平台'
          },
          {
            'path': '1-1',
            'name': '违规平台监测'
          },
          {
            'path': '1-1-1',
            'name': '未按要求备案'
          }
        ],
        breadcrumnsArr: [
          {
            'path': '0',
            'name': '首页'

          },
          {
            'name': 'P2P监管服务子平台',
            'path': '1'
          },
          {
            'name': '违规平台监测',
            'path': '1-1'
          },
          {
            'name': '未按要求备案',
            'path': '1-1-1'
          },
          {
            'name': '资金未第三方托管',
            'path': '1-1-2'
          },
          {
            'name': '未第三方担保',
            'path': '1-1-3'
          },
          {
            'name': '单一融资项目募集期超期',
            'path': '1-1-4'
          },
          {
            'name': '融资期限拆分',
            'path': '1-1-5'
          },
          {
            'name': '虚假违法广告',
            'path': '1-1-6'
          },
          {
            'name': '问题平台分析',
            'path': '1-2'
          },
          {
            'name': '风险分析',
            'path': '1-3'
          },
          {
            'name': '查询中心',
            'path': '1-4'
          },
          {
            'name': '借款人查询',
            'path': '1-4-1'
          },
          {
            'name': '查询页面',
            'path': '1-4-1-1'
          },
          {
            'name': '出借人查询',
            'path': '1-4-2'
          },
          {
            'name': '一键查询',
            'path': '1-4-3'
          },
          {
            'name': '统计报表',
            'path': '1-5'
          },
          {
            'name': 'ICO监管服务子平台',
            'path': '2'
          },
          {
            'name': 'ICO行业态势',
            'path': '2-1'
          },
          {
            'name': 'ICO融资情况',
            'path': '2-1-1'
          },
          {
            'name': '投资人情况',
            'path': '2-1-2'
          },
          {
            'name': '违规平台监测',
            'path': '2-2'
          },
          {
            'name': '风险分析',
            'path': '2-3'
          },
          {
            'name': '查询中心',
            'path': '2-4'
          },
          {
            'name': 'ICO项目查询',
            'path': '2-4-1'
          },
          {
            'name': '投资人查询',
            'path': '2-4-2'
          },
          {
            'name': '一键查询',
            'path': '2-4-3'
          },
          {
            'name': '统计报表',
            'path': '2-5'
          },
          {
            'name': '现金贷监管服务子平台',
            'path': '3'
          },
          {
            'name': '现金贷行业态势',
            'path': '3-1'
          },
          {
            'name': 'ICO融资情况',
            'path': '3-1-1'
          },
          {
            'name': '投资人情况',
            'path': '3-1-2'
          },
          {
            'name': '违规平台监测',
            'path': '3-2'
          },
          {
            'name': '风险分析',
            'path': '3-3'
          },
          {
            'name': '查询中心',
            'path': '3-4'
          },
          {
            'name': 'ICO项目查询',
            'path': '3-4-1'
          },
          {
            'name': '投资人查询',
            'path': '3-4-2'
          },
          {
            'name': '一键查询',
            'path': '3-4-3'
          },
          {
            'name': '统计报表',
            'path': '3-5'
          }
        ],
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        tagArr: []
      }
    },
    mounted () {
      this.restaurants = this.loadAll()
    },
    methods: {
      loadAll () {
        return [
          {
            'value': '首页',
            'path': '0'

          },
          {
            'value': 'P2P监管服务子平台',
            'path': '1'
          },
          {
            'value': '违规平台监测',
            'path': '1-1'
          },
          {
            'value': '未按要求备案',
            'path': '1-1-1'
          },
          {
            'value': '资金未第三方托管',
            'path': '1-1-2'
          },
          {
            'value': '未第三方担保',
            'path': '1-1-3'
          },
          {
            'value': '单一融资项目募集期超期',
            'path': '1-1-4'
          },
          {
            'value': '融资期限拆分',
            'path': '1-1-5'
          },
          {
            'value': '虚假违法广告',
            'path': '1-1-6'
          },
          {
            'value': '问题平台分析',
            'path': '1-2'
          },
          {
            'value': '风险分析',
            'path': '1-3'
          },
          {
            'value': '查询中心',
            'path': '1-4'
          },
          {
            'value': '借款人查询',
            'path': '1-4-1'
          },
          {
            'value': '查询页面',
            'path': '1-4-1-1'
          },
          {
            'value': '出借人查询',
            'path': '1-4-2'
          },
          {
            'value': '一键查询',
            'path': '1-4-3'
          },
          {
            'value': '统计报表',
            'path': '1-5'
          },
          {
            'value': 'ICO监管服务子平台',
            'path': '2'
          },
          {
            'value': 'ICO行业态势',
            'path': '2-1'
          },
          {
            'value': 'ICO融资情况',
            'path': '2-1-1'
          },
          {
            'value': '投资人情况',
            'path': '2-1-2'
          },
          {
            'value': '违规平台监测',
            'path': '2-2'
          },
          {
            'value': '风险分析',
            'path': '2-3'
          },
          {
            'value': '查询中心',
            'path': '2-4'
          },
          {
            'value': 'ICO项目查询',
            'path': '2-4-1'
          },
          {
            'value': '投资人查询',
            'path': '2-4-2'
          },
          {
            'value': '一键查询',
            'path': '2-4-3'
          },
          {
            'value': '统计报表',
            'path': '2-5'
          },
          {
            'value': '现金贷监管服务子平台',
            'path': '3'
          },
          {
            'value': '现金贷行业态势',
            'path': '3-1'
          },
          {
            'value': 'ICO融资情况',
            'path': '3-1-1'
          },
          {
            'value': '投资人情况',
            'path': '3-1-2'
          },
          {
            'value': '违规平台监测',
            'path': '3-2'
          },
          {
            'value': '风险分析',
            'path': '3-3'
          },
          {
            'value': '查询中心',
            'path': '3-4'
          },
          {
            'value': 'ICO项目查询',
            'path': '3-4-1'
          },
          {
            'value': '投资人查询',
            'path': '3-4-2'
          },
          {
            'value': '一键查询',
            'path': '3-4-3'
          },
          {
            'value': '统计报表',
            'path': '3-5'
          }
        ]
      },
      querySearchAsync (queryString, cb) {
        var restaurants = this.restaurants
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 3000 * Math.random())
      },
      createStateFilter (queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) > 0)
        }
      },
      handleInputSelect (item) {
        console.log(item)
      },
      handleSelect (item, keyArr) {
        console.log(item, keyArr, 'o')
        console.log(this.breadcrumbs, 'bre')
        this.breadcrumbs.splice(0, this.breadcrumbs.length)
        for (let i of this.breadcrumnsArr) {
          for (let value of keyArr) {
            if (value === i.path) {
              this.breadcrumbs.push(i)
            }
          }
        }
        this.showInput(this.breadcrumbs[this.breadcrumbs.length - 1].name)
      },
      handleOpen (key, keyPath) {
        console.log(key, keyPath, 'p')
      },
      handleCloseInput (key, keyPath) {
        console.log(key, keyPath, 'kkk')
      },
      handleCloseTab (tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      },
      handleTagClick (event) {
        event.preventDefault()
        console.log(event.target)
        for (let i in this.$refs.tagLists) {
          this.$refs.tagLists[i].$el.className = 'el-tag'
        }
        event.target.className = 'el-tag el-tag--success'
      },
      showInput (val) {
        this.inputVisible = true
        this.$nextTick(_ => {
//          this.$refs.saveTagInput.$refs.input.focus()
          this.$refs.saveTagInput.$refs.input.value = val
          for (let i in this.dynamicTags) {
            this.dynamicTags[i].type = ''
          }
          this.handleInputConfirm(val)
        })
      },
      handleInputConfirm (val) {
        let inputValue = val
        if (this.tagArr.indexOf(inputValue) < 0) {
          this.tagArr.push(inputValue)
          this.dynamicTags.push({
            'name': inputValue,
            'type': 'success'
          })
        } else {
          for (let i in this.dynamicTags) {
            if (this.dynamicTags[i].name === inputValue) {
              this.dynamicTags[i].type = 'success'
            }
          }
        }
        this.inputVisible = false
        this.inputValue = ''
      },
      closeTabs (command) {
        if (command === 'all') {
          this.dynamicTags.splice(0, this.dynamicTags.length)
          this.tagArr.splice(0, this.tagArr.length)
        } else if (command === 'others') {
          for (let i in this.$refs.tagLists) {
            if (this.$refs.tagLists[i].$el.className === 'el-tag') {
              for (let j in this.dynamicTags) {
                if (this.$refs.tagLists[i].$el.innerText.trim() === this.dynamicTags[j].name.trim()) {
                  this.dynamicTags.splice(j, 1)
                }
              }
            }
            for (let k in this.tagArr) {
              if (this.tagArr.indexOf(this.$refs.tagLists[i].$el.innerText.trim()) > 0) {
                this.tagArr.splice(k, 1)
              }
            }
          }
        }
      }
    },
    components: {
      HOME,
      chartPie,
      chartBar
    // breadCrumb
    }
  }
</script>


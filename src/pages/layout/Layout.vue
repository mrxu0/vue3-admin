<template>
  <Layout style="min-height: 100vh;">
    <LayoutSider
      v-if="screen !== 'iphone'"
      v-model:collapsed="dealCollapsed"
      :trigger="null"
      collapsible
    >
      <div class="logo"></div>
      <Menu
        theme="dark"
        :mode="screen === 'ipad' ? 'vertical' : 'inline'"
        @click="menuClick"
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
      >
        <MyMenuItem></MyMenuItem>
      </Menu>
    </LayoutSider>
    <Layout>
      <LayoutHeader
        style="background: #fff;
                padding: 0;
                display: flex;
                justify-content: space-between;
                padding: 0 24px;
                height: 48px;
                line-height: 48px;"
      >
        <template v-if="screen !== 'ipad'">
          <MenuUnfoldOutlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <MenuFoldOutlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        </template>
        <template v-else>
          <span></span>
        </template>
        <span>
          <Dropdown>
            <div style="display: inline;">
              <Avatar size="small">
                <template #icon>
                  <UserOutlined />
                </template>
              </Avatar>
              <span style="margin-left: 4px;">{{ users?.name }}</span>
            </div>
            <template #overlay>
              <Menu>
                <MenuItem key="person">
                  <span>
                    <UserOutlined style="margin-right: 4px;" />个人中心
                  </span>
                </MenuItem>
              </Menu>
            </template>
          </Dropdown>
          <Dropdown>
            <div style="display: inline;">
              <GlobalOutlined />
            </div>
            <template #overlay>
              <Menu @click="languageClick">
                <MenuItem key="zh">
                  <span>中文</span>
                </MenuItem>
                <MenuItem key="en">
                  <span>英文</span>
                </MenuItem>
              </Menu>
            </template>
          </Dropdown>
        </span>
      </LayoutHeader>
      <LayoutContent
        :style="{ margin: '16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <router-view></router-view>
      </LayoutContent>
      <LayoutFooter style="text-align: center;">Ant Design ©2018 Created by Ant UED</LayoutFooter>
    </Layout>
  </Layout>
  <Drawer
    v-model:visible="dealVisible"
    placement="left"
    :closable="false"
    width="200px"
    class="layout-drawer"
  >
    <LayoutSider :trigger="null" collapsible>
      <div class="logo"></div>
      <Menu
        theme="dark"
        mode="inline"
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
      >
        <MyMenuItem></MyMenuItem>
      </Menu>
    </LayoutSider>
  </Drawer>
</template>

<script setup lang="ts">
import {
  Menu, MenuItem, Layout, LayoutSider, LayoutHeader, LayoutContent, LayoutFooter, Dropdown, Avatar,
  Drawer,
} from 'ant-design-vue';
import {
  MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, GlobalOutlined,
} from '@ant-design/icons-vue';
import {
  computed, onMounted, ref, watch,
} from 'vue';
import store from '@/plugins/store';
import { useRoute, useRouter } from 'vue-router';
import { menusAdmin } from '@/utils/menu';
import type { Menu as MenuType } from '@/utils/menu';
import { useI18n } from 'vue-i18n';
import MyMenuItem from './components/MenuItem';

const router = useRouter();
const route = useRoute();
const i18n = useI18n();

/** 通过 path 寻找菜单要展开的 key */
const findOpenKeys = (menus: MenuType[], path: string): string[] => {
  for (let i = 0; i < menus.length; i++) {
    const item = menus[i];
    if (item.children) {
      const target = findOpenKeys(item.children, path);
      if (target && target.length) {
        target.push(`/admin/${item.path}`);
        return target;
      }
    } else if (`/admin/${item.path}` === route.path) {
      return [`/admin/${item.path}`];
    }
  }
  return [];
};
const selectedKeys = ref([route.path]);
const openKeys = ref(findOpenKeys(menusAdmin, route.path));
const collapsed = ref(false);
const size = ref(window.innerWidth);

const users = computed(() => store.state.users);

const screen = computed(() => {
  if (size.value > 1200) {
    return 'pc';
  } if (size.value < 600) {
    return 'iphone';
  }
  return 'ipad';
});

/** 处理缩小菜单模式，默认弹出的问题 */
if (screen.value === 'ipad') {
  openKeys.value = [];
}
/** 处理伸缩框只有在 PC 屏幕下才能够伸缩 */
const dealCollapsed = computed({
  get() {
    return !(!collapsed.value && screen.value === 'pc');
  },
  set(val: boolean) {
    collapsed.value = val;
  },
});

/** 手机屏幕下才会有浮层菜单 */
const dealVisible = computed({
  get() {
    return collapsed.value && screen.value === 'iphone';
  },
  set(val: boolean) {
    collapsed.value = val;
  },
});

/** 菜单单击 */
const menuClick = ({ item, key, keyPath }: Antdv.MenuClick) => {
  router.push(key);
};

/** 设置单击 */
const languageClick = (params: Antdv.MenuClick) => {
  localStorage.setItem('locale', params.key);
  window.location.reload();
};

onMounted(() => {
  window.addEventListener('resize', (e: any) => {
    size.value = e.currentTarget.innerWidth;
  });
});
</script>
<style>
.layout-drawer .ant-drawer-body {
  padding: 0 !important;
}
.layout-drawer .ant-drawer-wrapper-body {
  background: #001529;
}
</style>
<style scoped lang="less">
.trigger {
  font-size: 18px;
  line-height: 48px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>

<template>
    <Layout style="min-height: 100vh;">
        <LayoutSider v-model:collapsed="collapsed" :trigger="null" collapsible>
            <div class="logo"></div>
            <Menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
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
                <MenuUnfoldOutlined
                    v-if="collapsed"
                    class="trigger"
                    @click="() => (collapsed = !collapsed)"
                />
                <MenuFoldOutlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
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
                            <MenuItem key="0">
                                <span>
                                    <UserOutlined style="margin-right: 4px;" />个人中心
                                </span>
                            </MenuItem>
                        </Menu>
                    </template>
                </Dropdown>
            </LayoutHeader>
            <LayoutContent
                :style="{ margin: '16px', padding: '24px', background: '#fff', minHeight: '280px' }"
            >
                <router-view></router-view>
            </LayoutContent>
            <LayoutFooter style="text-align: center;">
                Ant Design ©2018 Created by Ant UED
            </LayoutFooter>
        </Layout>
    </Layout>
</template>

<script setup lang="ts">
import {
  Menu, MenuItem, Layout, LayoutSider, LayoutHeader, LayoutContent, LayoutFooter, Dropdown, Avatar,
} from 'ant-design-vue';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons-vue';
import { computed, onMounted, ref } from 'vue';
import store from '@/plugins/store';
import MyMenuItem from './components/MenuItem';

const selectedKeys = ref(['Workplace']);
const collapsed = ref(false);
const users = computed(() => store.state.users);
</script>

<style lang="less">
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

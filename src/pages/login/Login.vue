<template>
    <div class="container">
        <div class="main">
            <Tabs v-model:activeKey="activeKey">
                <TabPane :tab="$t('login.账号密码登陆')" :key="1">
                    <Form :model="formState" :rules="rules" @finish="onSubmit" ref="formRef">
                        <FormItem name="name">
                            <Input v-model:value="formState.name" :placeholder="$t('login.账户：admin')">
                                <template #prefix>
                                    <UserOutlined style="color: #1890ff" />
                                </template>
                            </Input>
                        </FormItem>
                        <FormItem name="password">
                            <Input
                                v-model:value="formState.password"
                                type="password"
                                :placeholder="$t('login.密码：admin or metaapp')"
                            >
                                <template #prefix>
                                    <LockOutlined style="color: #1890ff" />
                                </template>
                                <template #suffix>
                                    <EyeInvisibleOutlined />
                                    <!-- <EyeOutlined /> -->
                                </template>
                            </Input>
                        </FormItem>
                        <FormItem name="auto">
                            <div style="display: flex; justify-content: space-between;">
                                <Checkbox v-model:checked="formState.auto">{{ $t('login.自动登录') }}</Checkbox>
                                <Button type="link">{{ $t('login.忘记密码') }}</Button>
                            </div>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" html-type="submit" block>{{ $t('login.确定') }}</Button>
                        </FormItem>
                    </Form>
                </TabPane>
                <TabPane :tab="$t('login.手机号登陆')" :key="2"></TabPane>
            </Tabs>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
  Button, Tabs, TabPane, Form, FormItem, Input, Checkbox, message,
} from 'ant-design-vue';
import {
  UserOutlined, LockOutlined, EyeInvisibleOutlined,
} from '@ant-design/icons-vue';
import type { UnwrapRef } from 'vue';
import { reactive, ref, toRaw } from 'vue';
import routers from '@/plugins/routers';
import store from '@/plugins/store';
import { useI18n } from 'vue-i18n';

const i18n = useI18n();

interface FormState {
    name: string;
    password: string;
    auto: boolean;
}

const formRef = ref();
const activeKey = ref(1);
const formState: UnwrapRef<FormState> = reactive({
  name: '',
  password: '',
  auto: false,
});

const rules = {
  name: [
    { required: true, message: i18n.t('login.请输入用户名'), trigger: 'blur' },
  ],
  password: [
    { required: true, message: i18n.t('login.请输入密码'), trigger: 'blur' },
  ],
};

const onSubmit = (values: FormState) => {
  if (values.name === 'admin' && (['admin', 'metaapp'].includes(values.password))) {
    store.commit('changeUsers', values);
    routers.push('/admin/workplace');
  } else {
    message.error(i18n.t('login.账号或密码输入不正确'));
  }
};
</script>

<style lang="less" scoped>
:deep .ant-tabs-bar {
    border-bottom: none;
}
.container {
    padding: 110px 0 144px;
}
.main {
    width: 368px;
    min-width: 260px;
    margin: 0 auto;
}
</style>

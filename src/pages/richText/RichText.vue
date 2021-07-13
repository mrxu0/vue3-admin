<template>
    <div>
        <div ref="editor"></div>
        <Button @click="syncHTML">同步内容</Button>
        <div class="w-e-text-container">
            <div class="w-e-text" :innerHTML="content.html"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button } from 'ant-design-vue';
import {
  onBeforeUnmount, onMounted, reactive, ref,
} from 'vue';
import WangEditor from 'wangeditor';

const editor = ref();
const content = reactive({
  html: '',
  text: '',
});
let instance: WangEditor | null;
onMounted(() => {
  instance = new WangEditor(editor.value);
  instance.create();
});
onBeforeUnmount(() => {
  if (instance) { instance.destroy(); }
  instance = null;
});
const syncHTML = () => {
  content.html = instance?.txt.html() || '';
};
</script>

<style lang="less">
</style>

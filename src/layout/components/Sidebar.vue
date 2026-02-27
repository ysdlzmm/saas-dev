<script setup lang="ts">
import { ref } from 'vue';
import { NLayoutSider } from 'naive-ui';
import Menu from './Menu.vue';

const collapsed = ref(false);


const toggleCollapsed = () => {
    collapsed.value = !collapsed.value;
};
</script>

<template>
    <NLayoutSider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="200"
        :collapsed="collapsed"
        show-trigger
        @collapse="toggleCollapsed"
        @expand="toggleCollapsed"
    >
    <Menu :collapsed="collapsed" />
    </NLayoutSider>
</template>

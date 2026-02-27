<script setup lang="ts">
import { computed, h } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { NMenu } from 'naive-ui';
import type { MenuOption } from 'naive-ui';

const router = useRouter();
const route = useRoute();

const { collapsed } = defineProps<{
  collapsed?: boolean
}>()

const renderIcon = (icon: string) => {
    return () => h('span', { class: 'text-xl' }, icon);
};

const menuOptions: MenuOption[] = [
    {
        label: '首页',
        key: '/',
        icon: renderIcon('🏠'),
    },
    {
        label: '任务看板',
        key: '/tasks',
        icon: renderIcon('📋'),
    },
    {
        label: '系统设置',
        key: '/settings',
        icon: renderIcon('⚙️'),
    },
];

const activeKey = computed(() => route.path);

const handleMenuClick = (key: string) => {
    router.push(key);
};

</script>

<template>
    <NMenu
        :collapsed="collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
        :value="activeKey"
        @update:value="handleMenuClick"
        class="mt-4"
    />
</template>

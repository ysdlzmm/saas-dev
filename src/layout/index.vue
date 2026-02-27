<script setup lang="ts">
import { RouterView } from 'vue-router';
import { NLayout, NLayoutContent } from 'naive-ui';
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';

</script>

<template>
    <NLayout class="min-h-screen" position="absolute">
        <Header />
        <NLayout class="h-[calc(100%-5rem)]"  has-sider>
            <Sidebar />

            <NLayout  position="absolute">
                <NLayoutContent class="p-6">
                    <RouterView />
                </NLayoutContent>
            </NLayout>
        </NLayout>
    </NLayout>
</template>

<script setup lang="ts">
import { MainHeader } from '@/widgets/MainHeader';


</script>

<template>
    <div class="size-full bg-fill_extralight">
        <MainHeader />
        <div class="overflow-hidden p-5">
            <div class="flex size-full rounded border border-border_lighter bg-bg_base ">
                <div class="flex-grow overflow-hidden">
                    <RouterView />
                </div>
            </div>
        </div>
    </div>
</template>
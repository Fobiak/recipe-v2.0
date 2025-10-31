<script setup lang="ts">
import RecipeMainIcon from "@/shared/icons/RecipeMainIcon.vue";

</script>

<template>
    <div class="flex flex-row h-[70px] w-full justify-start items-center border-b gap-10 border-gray-300 bg-white px-10">
        <div class="flex flex-row items-center gap-4 cursor-pointer" @click="$router.push(`/`)">
            <ElIcon size="40">
                <RecipeMainIcon />
            </ElIcon>
            <div>
                <p class="text-3xl font-bold">Все рецепты</p>
                <p class="text-xs text-slate-400">Еда — это искусство, а ты художник</p>
            </div>
        </div>
        <div>
            <ElInput size="large" class="!w-[500px]" placeholder="Поиск по рецептам" clearable>
            </ElInput>
        </div>
    </div>
</template>
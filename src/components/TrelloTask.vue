<template>
   <div
      class="task"
      v-on="$listeners"
   >
      <span class="w-full flex-no-shrink font-bold">{{ task.name }}</span>
      <p v-if="task.description" class="w-full flex-no-shrink mt-1 text-sm">{{ task.description }}</p>
   </div>
</template>

<script>
export default {
   props: {
      task: {
         required: true,
         type: Object
      },
      taskIndex: {
         required: true,
         type: Number
      }
   }
};
</script>

<style>
</style>
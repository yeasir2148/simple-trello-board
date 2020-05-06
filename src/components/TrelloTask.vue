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
.task {
   @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}
</style>
<template>
   <div class="task-view" @click="$event.stopPropagation()">
      <div class="flex flex-col flex-grow justify-between px-4">
         <div class="font-black">Task Name: <span class="font-medium">{{task.name}}</span></div>

         <textarea
            class="relative bg-transparent px-2 border mt-2 h-64 border-none leading-normal"
            :value="task.description"
            @keyup.enter="updateTask(task, 'description', $event)" @blur="updateTask(task, 'description', $event)"
            placeholder="Task description">
         </textarea>
      </div>
   </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
   computed: {
      ...mapGetters(['getTaskById']),
      task() {
         return this.getTaskById(this.$route.params.id);
      }
   },
   methods: {
      updateTask(task, taskProp, event) {
         console.log(event.target.value);
         this.$store.commit('UPDATE_TASK', {
            task,
            prop: taskProp,
            value: event.target.value
         })
      }
   },
};
</script>

<style>
.task-view {
   @apply relative flex flex-row bg-white pin mx-4 m-32 mx-auto py-4 text-left rounded shadow;
   max-width: 700px;
}
</style>

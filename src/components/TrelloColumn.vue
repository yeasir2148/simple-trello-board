<template>
   <div class="column">
      <div class="flex items-center mb-2 font-bold">{{ column.name }}</div>
      <div class="list-reset">
         <AppDraggable
            v-for="(task, $taskIndex) of column.tasks"
            :key="$taskIndex"
            :taskIndex="$taskIndex"
            :columnIndex="columnIndex"
            :dragInfo="{task, taskIndex: $taskIndex, type: 'task'}">
            <AppDropable
               :taskIndex="$taskIndex"
               :columnIndex="columnIndex">
               <TrelloTask
                  :task="task"
                  :taskIndex="$taskIndex"
                  @click="openTask(task)"
               ></TrelloTask>
            </AppDropable>
         </AppDraggable>
      </div>
      <input
         type="text"
         name="new-task-name"
         class="block p-2 w-full bg-transparent"
         v-model="newTask['name']"
         placeholder="+new task name"
         @keyup.enter="createTask({ index: columnIndex, task: newTask})"
      />
   </div>
</template>

<script>
import { uuid } from "@/utils";
import { mapActions } from "vuex";
import TrelloTask from "@/components/TrelloTask.vue";
import AppDraggable from "@/components/AppDraggable.vue";
import AppDropable from "@/components/AppDropable.vue";

function createFreshTask() {
   return {
      name: null,
      id: uuid(),
      description: null,
      userAssigned: null
   };
}

export default {
   components: {
      TrelloTask,
      AppDraggable,
      AppDropable
   },
   data() {
      return {
         newTask: createFreshTask()
      };
   },
   props: {
      column: {
         required: true,
         type: Object
      },
      columnIndex: {
         required: true,
         type: Number
      }
   },
   methods: {
      ...mapActions(["addNewTask"]),
      createTask(taskAttr) {
         const { index } = taskAttr;
         this.addNewTask(taskAttr);
         this.$router.push({ name: "task", params: { id: this.newTask.id } });
         this.newTask = createFreshTask();
      },
      openTask: function(task) {
         this.$router.push({ name: "task", params: { id: task.id } });
      },
   }
};
</script>

<style>
.column {
   @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
   min-width: 350px;
}
</style>
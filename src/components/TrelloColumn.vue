<template>
   <div class="column" v-on="$listeners">
      <div class="flex items-center mb-2 font-bold">{{ column.name }}</div>
      <div class="list-reset">
         <TrelloTask
            v-for="(task, $taskIndex) of column.tasks"
            :task="task"
            :taskIndex="$taskIndex"
            :key="$taskIndex"
            @click="openTask(task)"
            draggable
            @dragover="onDragOver"
            @drop.stop="dropTaskorColumn(columnIndex, $taskIndex, $event)"
            @dragstart.stop="pickupTask($taskIndex, columnIndex, $event)"
         ></TrelloTask>
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
import methodsMixin from "@/mixins/methodsMixin.js";

function createFreshTask() {
   return {
      name: null,
      id: uuid(),
      description: null,
      userAssigned: null
   };
}

export default {
   mixins: [methodsMixin],
   components: {
      TrelloTask
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
      pickupTask(taskIndex, columnIndex, ev) {
         ev.dataTransfer.setData("task_index", taskIndex);
         ev.dataTransfer.setData("from_column_index", columnIndex);
         ev.dataTransfer.setData("objectType", "task");
         ev.dataTransfer.dropEffect = "move";
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
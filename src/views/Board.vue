<template>
   <div class="board">
      <div class="flex flex-row items-start">
         <TrelloColumn 
            v-for="(column, $columnIndex) of board.columns"
            :column="column"
            :columnIndex="$columnIndex"
            :key="$columnIndex"
            draggable
            @dragover="onDragOver"
            @drop="dropTaskorColumn($columnIndex, column.tasks.length, $event)"
            @dragstart="pickupColumn($columnIndex, $event)"
         ></TrelloColumn>
         <div class="column flex">
            <input type="text" name="newColumnName"
               class="p2 mr-2 flex-grow"
               v-model="newColumnName"
               placeholder="+new column name"
               @keyup.enter="createColumn">
         </div>
      </div>

      <div class="task-bg" v-if="$route.name == 'task'" @click="$router.push('/')">
         <router-view></router-view>
      </div>
   </div>
</template>

<script>
import { mapState } from "vuex";
import { uuid } from "@/utils";
import Task from "@/views/Task.vue";
import TrelloColumn from "@/components/TrelloColumn.vue";

function createFreshTask() {
   return {
      name: null,
      id: uuid(),
      description: null,
      userAssigned: null
   };
}

export default {
   data() {
      return {
         count: 0,
         newColumnName: ''
      };
   },
   components: {
      Task,
      TrelloColumn
   },
   computed: mapState(["board"]),
   methods: {
      onDragOver(ev) {
         ev.preventDefault();
         ev.dataTransfer.dropEffect = 'move';
      },
      dropTaskorColumn(columnToIndex, taskToIndex, ev) {
         const taskIndex = ev.dataTransfer.getData('task_index');
         const fromColumnIndex = ev.dataTransfer.getData('from_column_index');

            if(ev.dataTransfer.getData('objectType') == 'task') {
               // console.log('to move:' + taskIndex);
               // console.log('from col:' + fromColumnIndex);
               // console.log('to task:' + taskToIndex);
               // console.log('to col:' + columnToIndex);
               this.$store.commit('MOVE_TASK', {
                  taskIndex,
                  columnFromIndex: fromColumnIndex,
                  taskToIndex,
                  columnToIndex
               })
            } else {
               const moveColumnIndex = ev.dataTransfer.getData('column_to_move');
               this.$store.commit('MOVE_COLUMN', {
                  columnToIndex,
                  moveColumnIndex
               });
            }
      },
      pickupColumn(columnIndexToMove, ev) {
         console.log(columnIndexToMove);
         ev.dataTransfer.setData('objectType', 'column');
         ev.dataTransfer.setData('column_to_move', columnIndexToMove);

         ev.dataTransfer.dropEffect = 'move';
         ev.dataTransfer.effectAllowed = 'move';
      },
      createColumn() {
         // this.newTask.push(createFreshTask());
         this.$store.commit('ADD_COLUMN', {
            name: this.newColumnName
         });
         this.newColumnName = '';
      },
   }
};
</script>

<style lang="css">
.board {
   @apply p-4 bg-teal-dark h-full overflow-auto;
}

.task-bg {
   @apply pin absolute;
   background: rgba(0, 0, 0, 0.5);
}
</style>

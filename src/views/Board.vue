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
import methodsMixin from "@/mixins/methodsMixin.js";

export default {
   mixins: [methodsMixin],
   data() {
      return {
         newColumnName: ''
      };
   },
   components: {
      Task,
      TrelloColumn
   },
   computed: mapState(["board"]),
   methods: {
      pickupColumn(columnIndexToMove, ev) {
         console.log(columnIndexToMove);
         ev.dataTransfer.setData('objectType', 'column');
         ev.dataTransfer.setData('column_to_move', columnIndexToMove);

         ev.dataTransfer.dropEffect = 'move';
         ev.dataTransfer.effectAllowed = 'move';
      },
      createColumn() {
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

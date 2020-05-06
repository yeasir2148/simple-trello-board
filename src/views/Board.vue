<template>
   <div class="board">
      <div class="flex flex-row items-start">
         <AppDraggable
            v-for="(column, $columnIndex) of board.columns"
            :key="$columnIndex"
            :columnIndex="$columnIndex"
            :dragInfo="{column, columnIndex: $columnIndex, type: 'column'}"
         >
            <AppDropable
               :columnIndex="$columnIndex"
            >
               <TrelloColumn 
                  :column="column" 
                  :columnIndex="$columnIndex">
               </TrelloColumn>
            </AppDropable>
         </AppDraggable>

         <div class="column flex">
            <input
               type="text"
               name="newColumnName"
               class="p2 mr-2 flex-grow"
               v-model="newColumnName"
               placeholder="+new column name"
               @keyup.enter="createColumn"
            />
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
import AppDraggable from "@/components/AppDraggable.vue";
import AppDropable from "@/components/AppDropable.vue";

export default {
   data() {
      return {
         newColumnName: ""
      };
   },
   components: {
      Task,
      TrelloColumn,
      AppDraggable,
      AppDropable
   },
   computed: mapState(["board"]),
   methods: {
      createColumn() {
         this.$store.commit("ADD_COLUMN", {
            name: this.newColumnName
         });
         this.newColumnName = "";
      }
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

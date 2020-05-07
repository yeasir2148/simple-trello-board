<template>
   <div 
      @dragover.prevent 
      @drop.stop="onDrop($event)">
      <slot></slot>
   </div>
</template>

<script>
export default {
   props: {
      columnIndex: Number,
      taskIndex: Number
   },
   methods: {
      onDrop(ev) {
         const taskIndex = ev.dataTransfer.getData("task_index") || null;
         const fromColumnIndex = ev.dataTransfer.getData("from_column_index") || null;

         if (ev.dataTransfer.getData("objectType") == "task") {
            fromColumnIndex > this.columnIndex ?
               this.$emit('change-transition-class-name', 'slide-fade-right')
               :this.$emit('change-transition-class-name', 'slide-fade');
         
            this.$store.commit("MOVE_TASK", {
               taskIndex,
               columnFromIndex: fromColumnIndex,
               taskToIndex: this.taskIndex,
               columnToIndex: this.columnIndex
            });
         } else {
            const moveColumnIndex = ev.dataTransfer.getData("column_to_move");
            this.$store.commit("MOVE_COLUMN", {
               columnToIndex: this.columnIndex,
               moveColumnIndex
            });
         }
      }
   },
};
</script>

<style>
</style>
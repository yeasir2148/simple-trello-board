<template>
   <div draggable 
      @dragover.prevent 
      @dragstart.stop="onDragStart($event)"
   >
      <slot></slot>
   </div>
</template>

<script>
export default {
   props: {
      dragInfo : {
         type: Object,
         required: true
      },
      columnIndex: Number,
      taskIndex: Number
   },
   methods: {
      onDragStart(ev) {
         console.log(this.dragInfo);
         ev.dataTransfer.setData("objectType", this.dragInfo.type);
         ev.dataTransfer.dropEffect = "move";
         ev.dataTransfer.effectAllowed = "move";
         switch (this.dragInfo.type ) {
            case 'column':
               ev.dataTransfer.setData("column_to_move", this.dragInfo.columnIndex);
               break;
            case 'task':
               ev.dataTransfer.setData("task_index", this.taskIndex);
               ev.dataTransfer.setData("from_column_index", this.columnIndex);
            break;
         }
      }
   }
};
</script>

<style>
</style>
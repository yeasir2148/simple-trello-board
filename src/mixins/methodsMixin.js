export default {
   methods: {
      onDragOver(ev) {
         ev.preventDefault();
         ev.dataTransfer.dropEffect = "move";
      },
      dropTaskorColumn(columnToIndex, taskToIndex, ev) {
         const taskIndex = ev.dataTransfer.getData("task_index");
         const fromColumnIndex = ev.dataTransfer.getData("from_column_index");

         if (ev.dataTransfer.getData("objectType") == "task") {
            this.$store.commit("MOVE_TASK", {
               taskIndex,
               columnFromIndex: fromColumnIndex,
               taskToIndex,
               columnToIndex
            });
         } else {
            const moveColumnIndex = ev.dataTransfer.getData("column_to_move");
            this.$store.commit("MOVE_COLUMN", {
               columnToIndex,
               moveColumnIndex
            });
         }
      }
   },
}
import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from './default-board'
import { saveStatePlugin } from './utils'

Vue.use(Vuex)

localStorage.removeItem('board');
const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export default new Vuex.Store({
   plugins: [saveStatePlugin],
   state: {
      board
   },
   mutations: {},
   getters: {
      getTaskById(state) {
         return function(id) {
            const {columns} = state.board;
            for (const column of columns) {
               const {tasks} = column;
               for (const task of tasks) {
                  if(task.id == id) {
                     return task;
                  }
               }
            }
         }
      }
   },
   mutations: {
      ADD_TASK(state, {index, task}) {
         state.board.columns[index].tasks.push(task)
      },
      UPDATE_TASK(state, payload) {
         payload.task[payload.prop] = payload.value;
      },
      MOVE_TASK({board: {columns}}, payload) {
         console.log(payload);
         const taskToMove = columns[payload.columnFromIndex].tasks.splice(payload.taskIndex, 1)[0];
         if(payload.columnFromIndex == payload.columnToIndex) {
            columns[payload.columnToIndex].tasks.splice(payload.taskToIndex, 0, taskToMove);
         } else {
            columns[payload.columnToIndex].tasks.push(taskToMove);
         }
      },
      MOVE_COLUMN({board: {columns}}, {columnToIndex, moveColumnIndex}) {
         console.log(moveColumnIndex);
         const tasksMoved = columns[moveColumnIndex].tasks.splice(0, columns[moveColumnIndex].tasks.length);
         console.log(tasksMoved);
         columns[columnToIndex].tasks = columns[columnToIndex].tasks.concat(tasksMoved);
      },
      ADD_COLUMN({board}, {name}) {
         board.columns.push({
            name,
            tasks: []
         })
      }
   },
   actions: {
      addNewTask(context, payload) {
         console.log(payload);
         context.commit({
            type: 'ADD_TASK',
            index: payload.index,
            task: payload.task
         })
      }
   }
})

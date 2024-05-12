import { mapMutations } from 'vuex'
import TaskModal from '../../TaskModal/TaskModal.vue'
import ConfirmDialog from '../../ConfirmDialog/ConfirmDialog.vue'
import Task from '../../Task/Task.vue'
import TaskApi from '../../../utils/taskAPI.js'

const taskApi = new TaskApi()

export default {
    components: {
        TaskModal,
        Task,
        ConfirmDialog
    },
    data() {
        return {
            isTaskModalOpen: false,
            tasks: [],
            editingTask: null,
            selectedTasks: new Set(),
            isDeleteDialogOpen: false
        }
    },
    created() {
        this.getTasks()
    },
    watch: {
        editingTask(newValue) {
            if (newValue) {
                this.isTaskModalOpen = true
            }
        },
        isTaskModalOpen(isOpen) {
            if (!isOpen && this.editingTask) {
                this.editingTask = null
            }
        },
    },
    computed: {
        isDeleteSelectedBtnDisabled() {
            return !this.selectedTasks.size
        },

        confirmDialogText() {
            return `You are going to delete ${this.selectedTasks.size} task(s), are you sure?`
        },
    },

    methods: {
        ...mapMutations(['toggleLoading']),
        toggleTaskModal() {
            this.isTaskModalOpen = !this.isTaskModalOpen
        },
        getTasks() {
            this.toggleLoading()
            taskApi.getTasks()
                .then((tasks) => {
                    this.tasks = tasks;
                })
                .catch(this.handleError)
                .finally(() => {
                    this.toggleLoading()
                })
        },
        onTaskAdd(task) {
            this.toggleLoading()
            taskApi.addNewTask(task)
                .then((newTask) => {
                    this.tasks.push(newTask)
                    this.toggleTaskModal()
                    this.$toast.success('The task has been created successfully!')
                })
                .catch(this.handleError)
                .finally(() => {
                    this.toggleLoading()
                })
        },
        onTaskStatusChange(editedTask) {
            this.toggleLoading()
            taskApi.updateTask(editedTask)
                .then((updatedTask) => {
                    this.findAndReplaceTask(updatedTask)
                    let message;
                    if (updatedTask === 'done') {
                        message = 'Success! The task is done!'
                    }
                    else {
                        message = 'You have successfully restored the task'
                    }
                    this.$toast.success(message)
                })
                .catch(this.handleError)
                .finally(() => {
                    this.toggleLoading()
                })
        },
        onTaskSave(editedTask) {
            this.toggleLoading()
            taskApi.updateTask(editedTask)
                .then((updatedTask) => {
                    this.findAndReplaceTask(updatedTask)
                    this.isTaskModalOpen = false
                    this.$toast.success('The task has been updated successfully!')
                })
                .catch(this.handleError)
                .finally(() => {
                    this.toggleLoading()
                })
        },
        onTaskChecked(editedTask) {
            this.toggleLoading()
            taskApi.updateTask(editedTask)
                .then((updatedTask) => {
                    this.findAndReplaceTask(updatedTask)
                    let message = updatedTask.status === 'done' ? 'Done!' : 'Active task!'
                    this.$toast.success(message)
                })
                .catch(this.handleError)
                .finally(() => {
                    this.toggleLoading()
                })
        },

        findAndReplaceTask(updatedTask) {
            const index = this.tasks.findIndex((t) => t._id === updatedTask._id)
            this.tasks[index] = updatedTask
        },
        handleError(error) {
            this.$toast.error(error.message)
        },
        onTaskEdit(editingTask) {
            this.editingTask = editingTask
        },
        onTaskDelete(taskId) {
            this.toggleLoading()
            taskApi.deleteTask(taskId)
                .then(() => {
                    this.tasks = this.tasks.filter((t) => t._id !== taskId)
                    this.$toast.success('The task has been deleted successfully!')
                })
                .catch(this.handleError)
                .finally(() => {
                    this.toggleLoading()
                })
        },
        toggleDeleteDialog() {
            this.isDeleteDialogOpen = !this.isDeleteDialogOpen
            if (!this.isDeleteDialogOpen) {
                this.selectedTasks.clear()
            }
        },
        onSelectedTasksDelete() {
            this.toggleLoading()
            taskApi
                .deleteTasks([...this.selectedTasks])
                .then(() => {

                    this.tasks = this.tasks.filter((t) => !this.selectedTasks.has(t._id))
                    this.selectedTasks.clear()
                    this.$toast.success('Your selected tasks have been deleted successfully!')

                })
                .catch(this.handleError)
                .finally(() => {
                    this.toggleLoading()
                    this.toggleDeleteDialog()
                })
        },
        toggleTaskId(taskId) {
            if (this.selectedTasks.has(taskId)) {
                this.selectedTasks.delete(taskId)
            }
            else {
                this.selectedTasks.add(taskId)
            }
        }
    },
}
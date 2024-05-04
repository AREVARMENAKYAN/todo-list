import TaskModal from '../TaskModal/TaskModal.vue'
import Task from '../Task/Task.vue'
import TaskApi from '../../utils/taskAPI.js'

const taskApi = new TaskApi()

export default {
    components: {
        TaskModal,
        Task
    },
    data() {
        return {
            isTaskModalOpen: false,
            tasks: [],
            editingTask: null,
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

    methods: {
        toggleTaskModal() {
            this.isTaskModalOpen = !this.isTaskModalOpen
        },
        getTasks() {
            taskApi.getTasks()
                .then((tasks) => {
                    this.tasks = tasks;
                })
                .catch(this.handleError)
        },
        onTaskAdd(task) {
            taskApi.addNewTask(task)
                .then((newTask) => {
                    this.tasks.push(newTask)
                    this.toggleTaskModal()
                    this.$toast.success('The task has been created successfully!')
                })
                .catch(this.handleError)
        },
        onTaskSave(editedTask) {
            taskApi.updateTask(editedTask)
                .then((updatedTask) => {
                    const index = this.tasks.findIndex((t) => t._id === updatedTask._id)
                    this.tasks[index] = updatedTask
                    this.isTaskModalOpen = false
                    this.$toast.success('The task has been updated successfully!')
                })
                .catch(this.handleError)
        },
        handleError(error) {
            this.$toast.error(error.message)
        },
        onTaskEdit(editingTask) {
            this.editingTask = editingTask

        }
    },
}
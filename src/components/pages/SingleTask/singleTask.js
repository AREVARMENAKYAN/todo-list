import { mapMutations } from 'vuex'
import task from '@/components/Task/task.js'
import TaskApi from '../../../utils/taskAPI.js'
import TaskModal from '../../TaskModal/TaskModal.vue'

const taskApi = new TaskApi()

export default {
    components: {
        TaskModal,
    },
    data() {
        return {
            task: null,
            isEditModalOpen: false
        }
    },
    created() {
        this.getTask()
    },
    computed: {
        createdAt() {
            return this.task.created_at.slice(0, 10)
        },
        dueDate() {
            return this.task.date ? this.task.date.slice(0, 10) : ''
        },
        active() {
            return this.task.status === 'active'
        },
    },
    methods: {
        ...mapMutations(['toggleLoading']),
        toggleTaskModal() {
            this.isEditModalOpen = !this.isEditModalOpen

        },
        getTask() {
            const taskId = this.$route.params.taskId
            taskApi
                .getSingleTask(taskId)
                .then((task) => {
                    this.task = task
                })
                .catch(this.handleError)
        },
        onChangeStatus() {
            this.toggleLoading()
            const updatedTask = {
                ...this.task,
                status: this.task.status === 'active' ? 'done' : 'active'
            }
            taskApi
                .updateTask(updatedTask)
                .then(() => {
                    this.task = updatedTask
                    let message
                    if (this.task.status === 'done') {
                        message = 'Done!'
                    }
                    else {
                        message = 'Restored!'
                    }
                    this.$toast.success(message)
                })
                .catch(this.handleError)
                .finally(() => {
                    this.toggleLoading()
                })
        },
        onSave(editedTask) {
            this.toggleLoading()
            taskApi
                .updateTask(editedTask)
                .then(() => {
                    this.task = editedTask,
                        this.toggleTaskModal()
                    this.$toast.success('The task has been updated successfully')
                })
                .catch(this.handleError)
                .finally(() => {
                    this.toggleLoading()
                })
        },
        onDelete() {
            this.toggleLoading()
            const taskId = this.task._id
            taskApi
                .deleteTask(taskId)
                .then(() => {
                    this.$router.push('/')
                    this.$toast.success('The task has been deleted successfully')
                })
                .catch(this.handleError)
                .finally(() => {
                    this.toggleLoading()
                })
        },
        handleError(error) {
            this.$toast.error(error.message)
        },
    }
}
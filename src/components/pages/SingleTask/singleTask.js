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
            this.task.status === 'active' ? this.task.status = 'done' : this.task.status = 'active';
            taskApi
                .updateTask(this.task)
                .then(() => {
                    let message = this.task.status === 'done' ? 'Done!' : 'The task has been restored!'
                    this.$toast.success(message)
                })
                .catch(this.handleError)
        },
        onSave(editedTask) {
            taskApi
                .updateTask(editedTask)
                .then(() => {
                    this.task = editedTask,
                        this.toggleTaskModal()
                    this.$toast.success('The task has been updated successfully')
                })
                .catch(this.handleError)

        },
        onDelete() {
            const taskId = this.task._id
            taskApi
                .deleteTask(taskId)
                .then(() => {
                    this.$router.push('/')
                    this.$toast.success('The task has been deleted successfully')
                })
                .catch(this.handleError)
        },
        handleError(error) {
            this.$toast.error(error.message)
        },

    }
}
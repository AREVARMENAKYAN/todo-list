

export default {
    props: {
        data: {
            type: Object,
            required: true,
        }
    },
    computed: {
        createdAt() {
            return this.data.created_at.slice(0, 10)
        },
        dueDate() {
            return this.data.date ? this.data.date.slice(0, 10) : ''
        },
        active() {
            return this.data.status === 'active';
        }
    },
    methods: {
        onChangeStatus() {
            const task = {}
            task.date = this.data.date ? new Date(this.data.date).toISOString().slice(0, 10) : ''
            task.status = this.data.status === 'active' ? 'done' : 'active'
            this.$emit('changeTaskStatus', {
                ...this.data,
                ...task
            });
        },
        onEdit() {
            this.$emit('taskEdit')
        },
        onDelete() {
            this.$emit('taskDelete')
        },

    }
}
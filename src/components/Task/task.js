

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
        date() {
            return this.data.date ? this.data.date.slice(0, 10) : ''
        }
    },
    methods: {
        onEdit() {
            this.$emit('taskEdit')
        }
    }
}
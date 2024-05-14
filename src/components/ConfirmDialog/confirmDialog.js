
export default {
    props: {
        isOpen: {
            type: Boolean,
            required: true
        },
        title: {
            type: String,
            default: 'Do you want to delete selected tasks?'
        },
        text: {
            type: String
        },
    },

    methods: {
        onClose() {
            this.$emit('close')
        },
        onConfirm() {
            this.$emit('confirm')
        },
    },
}
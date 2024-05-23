import FormApi from '../../../utils/formAPI.js'
import { mapMutations } from 'vuex'

const formApi = new FormApi()
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default {
    data: () => ({
        name: '',
        email: '',
        message: '',
        nameRules: [(v) => !!v || 'Name is required'],
        emailRules: [(v) => !!v || 'Email is required', (v) => emailRegex.test(v) || 'Invalid email'],
        isFormSent: false,
        messageSent: {}
    }),

    methods: {
        ...mapMutations(['toggleLoading']),
        async sendForm() {
            const isValid = await this.validate()
            if (!isValid) {
                return
            }
            const form = {
                name: this.name,
                email: this.email,
                message: this.message
            }
            this.toggleLoading()
            formApi.sendForm(form)
                .then(() => {
                    this.messageSent = { ...form }
                    this.isFormSent = true
                    this.reset()
                    this.$toast.success('Sent!')
                })
                .catch(this.handleError)
                .finally(() => {
                    this.toggleLoading()
                })

        },
        async validate() {
            const { valid } = await this.$refs.form.validate()
            return valid
        },
        reset() {
            this.$refs.form.reset()
        },
        handleError(err) {
            this.$toast.error(err.message)
        },
        toggleMessage() {
            this.isFormSent = !this.isFormSent
        }
    }
}
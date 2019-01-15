import { Vue, Component } from 'vue-property-decorator'
import { session_get_response, session_post_request } from "~/shared/api-schema/session"
import Axios, { AxiosError } from 'axios';
import router from './router';
import { UNPROCESSABLE_ENTITY, UNAUTHORIZED } from 'http-status-codes';
import { spinnerize } from './axios';

@Component
class Session extends Vue {
    info: session_get_response | null = null

    get loggedIn() {
        return !!this.info
    }

    async login(user_name: string): Promise<{ error?: string }> {
        const reqbody: session_post_request = { user_name }
        try {
            const axios = spinnerize(Axios.create())
            this.info = (await axios.post<session_get_response>('./api/session', reqbody)).data
            return {}
        }
        catch (e) {
            const error: AxiosError = e
            if (error.response && error.response.status == UNPROCESSABLE_ENTITY)
                return { error: error.response.data.message }
            throw e
        }
    }

    async logout() {
        await Axios.delete('./api/session')
        this.info = null
        router.push({ name: 'login' })
    }

    async refresh(): Promise<{ error?: true }> {
        try {
            const axios = spinnerize(Axios.create())
            this.info = (await axios.get<session_get_response>('./api/session')).data
            return {}
        }
        catch (e) {
            const error: AxiosError = e
            if (error.response && error.response.status == UNAUTHORIZED) {
                return { error: true }
            }
            throw e
        }
    }
}

const session = new Session()

export { session }
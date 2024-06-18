export class ApiResponse {
    constructor(
        public message: string,
        public statusCode: number,
        public data?: any | null,
        public success?: boolean
    ) {
        this.message = message
        this.statusCode = statusCode
        this.data = data || null
        this.success = this.statusCode >= 200 && this.statusCode < 300
    }
}

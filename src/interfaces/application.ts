export interface IApplication {
    description: string
	rating: number
}

export interface IApplicationUpdate {
    state?: 'recieved' | 'in_progress' | 'approved' | 'declined'
}

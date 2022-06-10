import { AxiosInstance } from 'axios'
import { api } from '../api'

class Users {
  constructor(private readonly api: AxiosInstance) { }
  private readonly route = '/admin/users'

  getAll() {
    return this.api.get(this.route)
  }
}

export const usersService = new Users(api)
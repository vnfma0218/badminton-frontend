import { AxiosPromise } from 'axios'
import { publicAxios } from '../axios'

type RequestLogin = {
  email: string
  password: string
}

type Resoponse = {
  message: string
  status: number
}

interface LoginResp extends Resoponse {
  userId: string
  accessToken: string
}

export const login = async (data: RequestLogin): Promise<LoginResp> => {
  const res = await publicAxios({
    url: '/login',
    method: 'post',
    data,
  })

  return {
    status: res.status,
    message: res.data.message,
    userId: res.data.userId,
    accessToken: res.data.accessToken,
  }
}

export const logout = async (): Promise<Resoponse> => {
  const res = await publicAxios({
    url: '/logout',
    method: 'get',
  })

  return {
    status: res.status,
    message: res.data.message,
  }
}

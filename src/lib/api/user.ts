import { privateAxios, publicAxios } from '../axios'

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

export const logout = async (accessToken: string): Promise<Resoponse> => {
  const res = await privateAxios({
    url: '/logout',
    method: 'get',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return {
    status: res.status,
    message: res.data.message,
  }
}

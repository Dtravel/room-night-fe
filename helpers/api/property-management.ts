import api from './api'

export const getPropertyManagementInfo = (userId: string) => {
  return api({
    method: 'get',
    url: `/account-service/v1/user/property-management/${userId}`,
  })
}

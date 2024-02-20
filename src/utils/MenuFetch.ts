import https from '@/utils/request.ts'

export const getRouters =async () => {

  return new Promise(async (resolve) => {
    https.get('http://localhost:10216/routers').then(res => {
      const routers = res.data.routers || []
      resolve(routers)
    })
  })
}

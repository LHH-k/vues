//const BASE_URL = 'http://localhost:8085/api';//api是代理识别标识
const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8085/api' : 'http://admin.jiakuaibao.com';//api是代理识别标识

export const TEST = `${BASE_URL}/test`;	

















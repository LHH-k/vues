//const BASE_URL = process.env.NODE_ENV === 'development' ? '/api' : 'http://api.funlifeday.com';//api是代理识别标识
const BASE_URL = 'http://api.funlifeday.com';//api是代理识别标识

export const GETTOKEN      = `${BASE_URL}/oauth/token`;		//获取token
export const GETUSERINFO   = `${BASE_URL}/PiccTour/testUser`; //通过token获取用户信息
export const GETPROVINCECITY	 = `${BASE_URL}/PiccTour/get/provinceCity`;	// 获取可选的省市
//承运人险页面
  //司机
export const GETDRIVERINFO = `${BASE_URL}/PiccTour/get/driverInfoPagination/`; 	//获取驾驶员信息
export const ADDDRIVER 	   = `${BASE_URL}/PiccTour/post/newDriverInfo`;			//添加驾驶员
export const UPDATEDRIVER  = `${BASE_URL}/PiccTour/put/driverInfo/`				//修改驾驶员信息
  //导游
export const GETGUIDEINFO  = `${BASE_URL}/PiccTour/get/guideInfoPagination/`; 	//获取导游信息
export const ADDGUIDE  	   = `${BASE_URL}/PiccTour/post/newGuideInfo`; 			//添加导游
export const UPDATEGUIDE   = `${BASE_URL}/PiccTour/put/guideInfo/`; 				//修改导游信息
  //在库车辆
export const GETCARINFO    = `${BASE_URL}/PiccTour/get/carInfoPagination/`; 		//获取在库车辆信息
export const ADDCAR 	   	 = `${BASE_URL}/PiccTour/post/newCarInfo`; 			//添加车辆
export const UPDATECAR     = `${BASE_URL}/PiccTour/put/carInfo/`; 				//修改车辆信息
	//总
export const GETORDERINFO	 = `${BASE_URL}/PiccTour/get/orderInfoPagination/`; 	//获取投保信息分页
export const ADDORDER	 		 = `${BASE_URL}/PiccTour/post/newOrderInfo`; 				//添加投保信息
export const UPDATEORDER	 = `${BASE_URL}/PiccTour/put/orderInfo/`; 				//添加投保信息
export const GETORDER	     = `${BASE_URL}/PiccTour/get/orderInfo/`; 				//获取指定id的投保信息
	



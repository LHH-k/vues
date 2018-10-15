(function(){if(window.LvUJsBridge){return}var messagingIframe;var sendMessageQueue=[];var receiveMessageQueue=[];var messageHandlers={};var CUSTOM_PROTOCOL_SCHEME="vpclub";var QUEUE_HAS_MESSAGE="__QUEUE_MESSAGE__/";var responseCallbacks={};var uniqueId=1;function _createQueueReadyIframe(doc){messagingIframe=doc.createElement("iframe");messagingIframe.style.display="none";messagingIframe.src="http://__bridge_loaded__";doc.documentElement.appendChild(messagingIframe)}function isAndroid(){var ua=navigator.userAgent.toLowerCase();var isA=ua.indexOf("android")>-1;if(isA){return true}return false}function isIphone(){var ua=navigator.userAgent.toLowerCase();var isIph=ua.indexOf("iphone")>-1;if(isIph){return true}return false}function init(messageHandler){if(LvUJsBridge._messageHandler){throw new Error("LvUJsBridge.init called twice")}LvUJsBridge._messageHandler=messageHandler;var receivedMessages=receiveMessageQueue;receiveMessageQueue=null;for(var i=0;i<receivedMessages.length;i++){_dispatchMessageFromNative(receivedMessages[i])}}function send(data,responseCallback){_doSend({data:data},responseCallback)}function registerHandler(handlerName,handler){messageHandlers[handlerName]=handler}function callHandler(handlerName,data,responseCallback){_doSend({handlerName:handlerName,data:data},responseCallback)}function _doSend(message,responseCallback){if(responseCallback){var callbackId="cb_"+uniqueId+++"_"+(new Date).getTime();responseCallbacks[callbackId]=responseCallback;message.callbackId=callbackId}sendMessageQueue.push(message);messagingIframe.src=CUSTOM_PROTOCOL_SCHEME+"://"+QUEUE_HAS_MESSAGE;if(isIphone()){messagingIframe.src=CUSTOM_PROTOCOL_SCHEME+"://"+QUEUE_HAS_MESSAGE.slice(0,-1)}}function _fetchQueue(){var messageQueueString=JSON.stringify(sendMessageQueue);sendMessageQueue=[];if(isIphone()){return messageQueueString}else if(isAndroid()){messagingIframe.src=CUSTOM_PROTOCOL_SCHEME+"://return/_fetchQueue/"+messageQueueString}}function _dispatchMessageFromNative(messageJSON){setTimeout(function(){var message=JSON.parse(messageJSON);var responseCallback;if(message.responseId){responseCallback=responseCallbacks[message.responseId];if(!responseCallback){return}if(isIphone()){responseCallback(message.responseData)}else{if(message.responseData){responseCallback(eval("("+message.responseData+")"))}else{responseCallback(message.responseData)}}delete responseCallbacks[message.responseId]}else{if(message.callbackId){var callbackResponseId=message.callbackId;responseCallback=function(responseData){_doSend({responseId:callbackResponseId,responseData:responseData})}}var handler=LvUJsBridge._messageHandler;if(message.handlerName){handler=messageHandlers[message.handlerName]}try{handler(message.data,responseCallback)}catch(exception){if(typeof console!="undefined"){console.log("LvUJsBridge: WARNING: javascript handler threw.",message,exception)}}}})}function _handleMessageFromNative(messageJSON){if(receiveMessageQueue){receiveMessageQueue.push(messageJSON)}else{_dispatchMessageFromNative(messageJSON)}}var LvUJsBridge=window.LvUJsBridge={init:init,send:send,on:registerHandler,invoke:callHandler,_fetchQueue:_fetchQueue,_handleMessageFromNative:_handleMessageFromNative};var doc=document;_createQueueReadyIframe(doc);var readyEvent=doc.createEvent("Events");readyEvent.initEvent("LvUJsBridgeReady");readyEvent.bridge=LvUJsBridge;doc.dispatchEvent(readyEvent)})();(function(callback){if(window.LvUJsBridge){callback(LvUJsBridge)}else{if(document.addEventListener){document.addEventListener("LvUJsBridgeReady",function(){callback(LvUJsBridge)},false)}}})(function(bridge){bridge.init(function(message,responseCallback){var data={jsResponse:"Wee!"};responseCallback(data)});clientShare=bridge});function triggerNative(triggerTips,params,callback){if(window.LvUJsBridge){try{window.LvUJsBridge.invoke(triggerTips,params,callback)}catch(ex){alert("1当前APP不支持此功能，请升级您的版本")}}else{alert("2当前APP不支持此功能，请升级您的版本")}}function triggerJS(triggerTips,callback){if(window.LvUJsBridge){try{window.LvUJsBridge.on(triggerTips,callback)}catch(ex){alert("3当前APP不支持此功能，请升级您的版本")}}else{alert("4当前APP不支持此功能，请升级您的版本")}}var hsh={CheckUrl:function(){var checkUrl=window.location.href;var allUrl=checkUrl.split("?");if(allUrl.length>1){var urlContent=allUrl[1].split("&");var keyValueDX={};urlContent.forEach(function(item){var objArr=item.split("=");keyValueDX[objArr[0]]=objArr[1]})}return keyValueDX||{}},getToken:function(callback){if(typeof callback=="function"){callback(this.CheckUrl().token)}},isApp:function(){if(this.CheckUrl().token){return true}else{return false}},registerShare:function(shareData){window.LvUJsBridge.invoke("registerShare",shareData)},goBack:function(){window.LvUJsBridge.invoke("goBack",{},function(response){})},share:function(shareData){window.LvUJsBridge.invoke("share",shareData)},checkMessage:function(callback){window.LvUJsBridge.on("returnMessage",callback)},getTokenNew:function(callback){window.LvUJsBridge.invoke("getToken",{},callback)},isAppNew:function(){var ua=window.navigator.userAgent;return ua.indexOf("app_hsh")!=-1?1:0},sendMessage:function(messageData){window.LvUJsBridge.invoke("sendMessage",messageData)}};
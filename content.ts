import { useMessage } from "@plasmohq/messaging/hook"


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request, sender, sendResponse);
    sendResponse(location.href)
  });

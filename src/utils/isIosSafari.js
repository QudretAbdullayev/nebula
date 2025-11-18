export const isIosSafari = () => {
    if (typeof window === "undefined") return false;

    const ua = window.navigator.userAgent;
    const isIOS = /iP(hone|od|ad)/.test(ua);
    const isWebkit = /WebKit/.test(ua);
    const isChrome = /CriOS/.test(ua);

    return isIOS && isWebkit && !isChrome;
  };
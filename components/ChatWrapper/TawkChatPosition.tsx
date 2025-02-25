'use client';

import { useState, useCallback, useEffect } from 'react';

export default function TawkChatPosition({ propId, widgetId, overridePosition, topLeft, topRight, bottomRight, bottomLeft, buttonMobilePosition, displayChat, mobile }: {
  propId: string;
  widgetId: string;
  overridePosition: boolean;
  topLeft?: { top: number; left: number; };
  topRight?: { top: number; right: number; };
  bottomRight?: { bottom: number; right: number; };
  bottomLeft?: { bottom: number; left: number; };
  displayChat: boolean;
  mobile?: boolean;
  buttonMobilePosition?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  }
}) {
  const [chatOpened, setChatOpened] = useState(false);
  window.Tawk_API = window.Tawk_API || {};

  const chatElement = document.getElementsByClassName(
    'widget-visible',
  )[0] as HTMLElement;

  const setStyleProps = () => {
    const chatElement = document.getElementsByClassName(
      'widget-visible',
    )[0] as HTMLElement;

    if (chatElement) {
      changeChatStyleProps(chatElement);
      const bodyDocument = document.getElementsByTagName('body')[0];
      bodyDocument.removeChild(chatElement);
    }
    return null;
  };

  if (window.Tawk_API) {
    window.Tawk_API.onLoad = function () {
      if (
        displayChat &&
        overridePosition && (
        (topLeft && topLeft.left && topLeft.top) ||
        (topRight && topRight.right && topRight.top) ||
        (bottomRight && bottomRight.bottom && bottomRight.right) ||
        (bottomLeft && bottomLeft.bottom && bottomLeft.left))) {
        setStyleProps()
      }
    };

    // Track when the chat is opened
    window.Tawk_API.onChatMaximized = function () {
      setChatOpened(true);
    };

    // Track when the chat is closed
    window.Tawk_API.onChatMinimized = function () {
      setChatOpened(false);
    };
  }

  const setChatPosition = useCallback(({
    chatButton,
    chatWindow,
    chatButtonHeight,
    chatWindowWidth,
    chatWindowHeight,
    chatWrapper,
  }: {
    chatButton: HTMLElement;
    chatWindow: HTMLElement;
    chatButtonHeight: number;
    chatWindowWidth: number;
    chatWindowHeight: number;
    chatWrapper: HTMLElement;
  }) => {
    if (!mobile) {
      chatWindow.style.position = 'absolute';
      chatWrapper.style.position = 'absolute';
      chatWrapper.style.height = chatWindowHeight + (chatButtonHeight*2) + 'px';
      chatWrapper.style.width = chatWindowWidth + 'px';

      if (topLeft) {
        chatButton.style.left = 10 + 'px';
        chatWrapper.style.top = topLeft.top + 'px';
        chatWrapper.style.left = topLeft.left + 'px';
        if (chatWrapper.clientHeight > topLeft.top) {
          const chatWindowTop = chatButton.clientHeight + 10;
          chatWindow.style.top = chatWindowTop + 'px';
          chatButton.style.top = 0 + 'px';
        }
      }

      if (topRight) {
        chatButton.style.right = 10 + 'px';
        chatWrapper.style.top = topRight.top + 'px';
        chatWrapper.style.right = topRight.right + 'px';
        if (chatWrapper.clientHeight > topRight.top) {
          const chatWindowTop = chatButton.clientHeight + 10;
          chatWindow.style.top = chatWindowTop + 'px';
          chatButton.style.top = 0 + 'px';
        }
      }

      if (bottomRight) {
        chatButton.style.right = 10 + 'px';
        chatWrapper.style.bottom = bottomRight.bottom + 'px';
        chatWrapper.style.right = bottomRight.right + 'px';
      }

      if (bottomLeft) {
        chatButton.style.left = 10 + 'px';
        chatWrapper.style.bottom = bottomLeft.bottom + 'px';
        chatWrapper.style.left = bottomLeft.left + 'px';
      }
    }
    if (mobile && buttonMobilePosition) {
      if (buttonMobilePosition.top) {
        chatButton.style.top = buttonMobilePosition.top + 'px';
      }

      if (buttonMobilePosition.right) {
        chatButton.style.right = buttonMobilePosition.right + 'px';
      }

      if (buttonMobilePosition.bottom) {
        chatButton.style.bottom = buttonMobilePosition.bottom + 'px';
      }

      if (buttonMobilePosition.left) {
        chatButton.style.left = buttonMobilePosition.left + 'px';
      }
    }
  }, [bottomLeft, bottomRight, buttonMobilePosition, mobile, topLeft, topRight]);

  const changeChatStyleProps = (chatTawkElement: HTMLElement) => {
    const chatWrapper = document.getElementById('chatWrapper')!;
    const chatButton = chatTawkElement?.children[0] as HTMLElement;
    const chatWindow = chatTawkElement?.children[1] as HTMLElement;

    chatButton.setAttribute('class', 'chatButton');
    chatButton.style.position = 'absolute';
    const chatButtonHeight = chatButton.clientHeight;

    const chatWindowWidth = chatWindow.clientWidth + 10; // padding included
    const chatWindowHeight = chatWindow.clientHeight;

    setChatPosition({
      chatButton,
      chatWindow,
      chatButtonHeight,
      chatWindowWidth,
      chatWindowHeight,
      chatWrapper,
    });
    chatWrapper.appendChild(chatButton);
    chatWrapper.appendChild(chatWindow);
    return null;
  };

  useEffect(() => {
    if (displayChat) {
      const chatWindow = (document.getElementsByClassName('open')[0] ||
        document.getElementsByClassName('closed')[0]) as HTMLElement;
      const chatWrapper = document.getElementById('chatWrapper')!;
      const chatButton = chatWrapper?.children[0] as HTMLElement;

      if (chatButton && chatWindow) {
        const chatWindowWidth = chatWindow.clientWidth;
        const chatWindowHeight = chatWindow.clientHeight;

        const chatButtonHeight = chatButton.clientHeight;

        setChatPosition({
          chatButton,
          chatWindow,
          chatButtonHeight,
          chatWindowWidth,
          chatWindowHeight,
          chatWrapper,
        });
      }
    }
  }, [chatOpened, displayChat, setChatPosition]);

  useEffect(() => {
    if (!chatElement) {
      const s1 = document.createElement('script'),
        s0 = document.getElementsByTagName('body')[0];
      s1.async = true;
      s1.src = `https://embed.tawk.to/${propId}/${widgetId}`;
      s1.setAttribute('crossorigin', '*');
      s0.appendChild(s1);
    }
  }, [chatElement, propId, widgetId]);

  return <div id='chatWrapper' className='chatWrapper'></div>;
}

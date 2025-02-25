'use client';

import { useState, useCallback, useEffect } from 'react';

declare global {
  interface Window {
    Tawk_API: {
      onLoad: () => void;
      onChatMaximized: () => void;
      onChatMinimized: () => void;
    }
  }
}

export interface TawkChatPositionProps {
  propId: string;
  /**
   *
   * `propId` - look for `Property ID` in your Tawk dashboard: `Administration/Overview`
   */
  widgetId: string;
  /**
   *
   * `widgetId` - look for `Widget ID` in your Tawk dashboard: `Administration/Chat Widget`
   */
  overridePosition: boolean;
  /**
   *
   * `overridePosition` - value set to `true` enables to read values of custom positioning thus overrides the position of the chat widget
   *  defined in Tawk Javascripts files: topLeft`,`topRight`, `bottomLeft`, `bottomRight`. Use only one custom positioning
   */
  topLeft?: { top: number; left: number };
  /**
   *
   * `topLeft` - One of defined custom positioning. It defines the positioning of the chat widget from top toward
   *  the bottom, and from left toward the right side of the viewport
   *  Use only one custom positioning! The units are in `pixels`!
   */
  topRight?: { top: number; right: number };
  /**
   *
   * `topRight` - One of defined custom positioning. It defines the positioning of the chat widget from top toward
   *  the bottom, and from right toward the left side of the viewport
   *  Use only one custom positioning! The units are in `pixels`!
   */
  bottomRight?: { bottom: number; right: number };
  /**
   *
   * `bottomRight` - One of defined custom positioning. It defines the positioning of the chat widget from bottom toward
   *  the top, and from right toward the left side of the viewport
   *  Use only one custom positioning! The units are in `pixels`!
   */
  bottomLeft?: { bottom: number; left: number };
  /**
   *
   * `bottomLeft` - One of defined custom positioning. It defines the positioning of the chat widget from bottom toward
   *  the top, and from left toward the right side of the viewport
   *  Use only one custom positioning! The units are in `pixels`!
   */
  displayChat: boolean;
  /**
   *
   * `displayChat` - boolean value. Set to `true` chat widget will be visible. Set to `false` to prevent the display of the chat widget
   */
  mobile?: boolean;
  /**
   *
   * `mobile` - for mobile displays. Only the positioning of the chat button will be overridden, since the chat window is in full
   *  screen only on mobile devices
   */
  buttonMobilePosition?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  /**
   *
   * `buttonMobilePosition` - sets the position in pixles of the chat button from the edges of the viewport
   */
}

export default function TawkChatPosition(props: TawkChatPositionProps) {
  const {
    propId,
    widgetId,
    overridePosition,
    topLeft,
    topRight,
    bottomRight,
    bottomLeft,
    buttonMobilePosition,
    displayChat,
    mobile,
  } = props;

  const [chatOpened, setChatOpened] = useState(false);
  window.Tawk_API = window.Tawk_API || {};

  const chatElement = document.getElementsByClassName('widget-visible')[0] as HTMLElement;

  const setStyleProps = () => {
    const chatElement = document.getElementsByClassName('widget-visible')[0] as HTMLElement;

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
        overridePosition &&
        ((topLeft && topLeft.left && topLeft.top) ||
          (topRight && topRight.right && topRight.top) ||
          (bottomRight && bottomRight.bottom && bottomRight.right) ||
          (bottomLeft && bottomLeft.bottom && bottomLeft.left))
      ) {
        console.log('test');
        setStyleProps();
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

  const setChatPosition = useCallback(
    ({
      chatButton,
      chatWindow,
      chatButtonHeight,
      chatWindowHeight,
      chatWrapper,
    }: {
      chatButton: HTMLElement;
      chatWindow: HTMLElement;
      chatButtonHeight: number;
      chatWindowHeight: number;
      chatWrapper: HTMLElement;
    }) => {
      if (!mobile) {
        chatWindow.style.position = 'absolute';
        chatWrapper.style.position = 'absolute';
        chatWrapper.style.height =
          chatWindowHeight + chatButtonHeight * 2 + 'px';

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
    },
    [bottomLeft, bottomRight, buttonMobilePosition, mobile, topLeft, topRight],
  );

  const changeChatStyleProps = (chatTawkElement: HTMLElement) => {
    const chatWrapper = document.getElementById('chatWrapper')!;
    const chatButton = chatTawkElement?.children[0] as HTMLElement;
    const chatWindow = chatTawkElement?.children[1] as HTMLElement;

    chatButton.setAttribute('class', 'chatButton');
    chatButton.style.position = 'absolute';
    const chatButtonHeight = chatButton.clientHeight;
    const chatWindowHeight = chatWindow.clientHeight;

    setChatPosition({
      chatButton,
      chatWindow,
      chatButtonHeight,
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
        const chatWindowHeight = chatWindow.clientHeight;

        const chatButtonHeight = chatButton.clientHeight;

        setChatPosition({
          chatButton,
          chatWindow,
          chatButtonHeight,
          chatWindowHeight,
          chatWrapper,
        });
      }
    }
  }, [chatOpened, displayChat, setChatPosition]);

  useEffect(() => {
    if (!chatElement && displayChat) {
      const s1 = document.createElement('script'),
        s0 = document.getElementsByTagName('body')[0];
      s1.async = true;
      s1.src = `https://embed.tawk.to/${propId}/${widgetId}`;
      s1.setAttribute('crossorigin', '*');
      s0.appendChild(s1);
    }
  }, [chatElement, displayChat, propId, widgetId]);

  return <div id='chatWrapper' className='chatWrapper' style={{ display: !displayChat ? 'none' : 'inherit' }}/>;
}

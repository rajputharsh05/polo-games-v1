import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

declare global {
  interface Window {
    initChatWidget?: (config: HelloConfig, delay?: number) => void;
  }
}

interface HelloConfig {
  widgetToken: string;
  hide_launcher?: boolean;
  show_widget_form?: boolean;
  show_close_button?: boolean;
  launch_widget?: boolean;
  show_send_button?: boolean;
  unique_id?: string;
  name?: string;
  number?: string;
  mail?: string;
  country?: string;
  city?: string;
  region?: string;
}

const ChatWidget = () => {
  const chatState = useSelector((state: any) => state?.chat?.isOpen);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      setWindowWidth(currentWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const scriptId = "chat-widget-script";
    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.type = "text/javascript";
    script.src = "https://blacksea.msg91.com/chat-widget.js";
    script.async = true;

    script.onload = () => {
      const helloConfig: HelloConfig = {
        widgetToken: "973e8",
        hide_launcher: true,
        show_widget_form: chatState,
        show_close_button: windowWidth > 768 ? true : false,
        launch_widget: chatState,
        show_send_button: true,
      };

      if (typeof window.initChatWidget === "function") {
        window.initChatWidget(helloConfig, 100);
      }
    };

    document.body.appendChild(script);

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, [chatState]);

  return null;
};

export default ChatWidget;

import { useEffect } from "react";

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
  useEffect(() => {
    const scriptId = "chat-widget-script";
    if (document.getElementById(scriptId)) return; // Prevent multiple script injections

    const script = document.createElement("script");
    script.id = scriptId;
    script.type = "text/javascript";
    script.src = "https://blacksea.msg91.com/chat-widget.js";
    script.async = true;

    script.onload = () => {
      const helloConfig: HelloConfig = {
        widgetToken: "973e8",
        hide_launcher: false,
        show_widget_form: true,
        show_close_button: true,
        launch_widget: true,
        show_send_button: true,
        unique_id: "user_123",
        name: "Mitun ",
        number: "+1234567890",
        mail: "john.doe@example.com",
        country: "USA",
        city: "New York",
        region: "NY",
      };

      // Ensure function exists before calling
      if (typeof window.initChatWidget === "function") {
        window.initChatWidget(helloConfig, 5000);
      }
    };

    document.body.appendChild(script);

    return () => {
    
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return null;
};

export default ChatWidget;

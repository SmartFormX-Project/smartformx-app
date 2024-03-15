"use client";

import React from "react";

class ChatwootWidget extends React.Component<{
  name: string;
  plan: string;
  uid: string;
}> {
  componentDidMount() {
    let isMobile = window.matchMedia("(max-width: 600px)").matches;
    (window as any).chatwootSettings = {
      hideMessageBubble: false,
      position: "right", // This can be left or right
      locale: "BR", // Language to be set
      type: "standard",
      darkMode: "auto",
      launcherTitle: "Precisa de ajuda?",
    };

    (function (d, t) {
      var BASE_URL = "https://app.chatwoot.com";
      var g: any = d.createElement(t),
        s: any = d.getElementsByTagName(t)[0];
      g.src = BASE_URL + "/packs/js/sdk.js";
      s.parentNode.insertBefore(g, s);
      g.async = !0;
      g.onload = function () {
        (window as any).chatwootSDK.run({
          websiteToken: "yQok6aSi6E4yyeSLFyHqAFGk",
          baseUrl: BASE_URL,
        });
      };
    })(document, "script");
  }

  render() {
    if (typeof window !== "undefined") {
      // browser code
      if ((window as any).$chatwoot) {
        (window as any).$chatwoot.setUser(this.props.uid, {
          name: this.props.name, // Name of the user
        });
        (window as any).$chatwoot.setCustomAttributes({
          plan: this.props.name,
        });
      }
    }
    return null;
  }
}

export default ChatwootWidget;

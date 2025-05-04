export const config = {
  clients: {
    Clash: "clash",
    ClashR: "clashr",
    Quantumult: "quan",
    QuantumultX: "quanx",
    Loon: "loon",
    Mellow: "mellow",
    Shadowsocks: "ss",
    ShadowsocksSub: "sssub",
    ShadowsocksD: "ssd",
    ShadowsocksR: "ssr",
    Surfboard: "surfboard",
    Surge2: "surge&ver=2",
    Surge3: "surge&ver=3",
    Surge4: "surge&ver=4",
    Trojan: "trojan",
    V2Ray: "v2ray",
    Singbox: "singbox",
    "Mixed Subscription": "mixed",
  },
  switchCells: [
    { title: "TCP Fast Open", key: "tfo" },
    { title: "Enable UDP", key: "udp" },
    { title: "Skip Cert Verification", key: "scv" },
    { title: "Show Node Type", key: "append_type" },
    { title: "Show Emoji Flag", key: "emoji" },
    { title: "Output Nodes Only", key: "list" },
  ],
  remoteConfig: [
    {
      category: "ACL4SSR Rules",
      items: [
        {
          label: "Basic Rules",
          value:
            "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online.ini",
        },
        {
          label: "No Speed Test Basic Rules",
          value:
            "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_NoAuto.ini",
        },
        {
          label: "Ad-blocking Basic Rules",
          value:
            "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_AdblockPlus.ini",
        },
        {
          label: "Minimal Rules",
          value:
            "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Mini.ini",
        },
        {
          label: "Complete Rules",
          value:
            "https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online_Full.ini",
        },
      ],
    },
  ],
};

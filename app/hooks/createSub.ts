import { config as cfg } from "@/config";

const backends = process.env.NEXT_PUBLIC_BACKENDS?.split("|") ?? [
  "http://127.0.0.1:25500/sub?",
];

export type ClientType = keyof typeof cfg.clients;

export interface CreateSubParams {
  url: string;
  target: ClientType;
  backend?: string;
  mode?: "easy" | "hard";
  config?: string;
  include: string;
  exclude: string;
  tfo?: boolean;
  udp?: boolean;
  scv?: boolean;
  append_type?: boolean;
  emoji?: boolean;
  list?: boolean;
}

export const createSub = (params: CreateSubParams) => {
  const {
    url,
    target,
    backend,
    mode,
    config,
    include,
    exclude,
    tfo,
    udp,
    scv,
    append_type,
    emoji,
    list,
  } = params;

  if (!url) throw Error("Please enter a subscription link first");
  if (!target) throw Error("Please select a client first");

  const flow = [
    backend || backends[0],
    `target=${cfg.clients[target]}`,
    `&url=${encodeURIComponent(url.replace(/\n/g, "|"))}`,
    "&insert=false",
  ];

  // Add all options regardless of mode, but check if they are enabled
  // Config is only added if it has a value and we're in hard mode
  if (mode === "hard" && config) {
    const configItem = cfg.remoteConfig
      .flatMap((category) => category.items)
      .find((item) => item.label === config);
    const configValue = configItem ? configItem.value : config;
    flow.push(`&config=${encodeURIComponent(configValue as string)}`);
  }

  // Include and exclude are added if they have values
  if (include) flow.push(`&include=${encodeURIComponent(include)}`);
  if (exclude) flow.push(`&exclude=${encodeURIComponent(exclude)}`);

  // Boolean options are added if they are true
  if (tfo) flow.push("&tfo=true");
  if (udp) flow.push("&udp=true");
  if (scv) flow.push("&scv=true");
  if (append_type) flow.push("&append_type=true");
  if (emoji) flow.push("&emoji=true");
  if (list) flow.push("&list=true");

  return flow.join("");
};

"use client";

import { useCallback, useState } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteSection,
  Button,
  Card,
  CardBody,
  CardFooter,
  Link,
  Tab,
  Tabs,
  Textarea,
} from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toast } from "sonner";
import copy from "copy-to-clipboard";

import { config as cfg } from "@/config";

import { TextCell } from "@/components/TextCell";
import { InputCell } from "@/components/InputCell";
import { SwitchCell } from "@/components/SwitchCell";
import { SwitchTheme } from "@/components/SwitchTheme";

import {
  createSub,
  type CreateSubParams,
  type ClientType,
} from "@/app/hooks/createSub";

const backends = process.env.NEXT_PUBLIC_BACKENDS?.split("|") ?? [
  "http://127.0.0.1:25500/sub?",
];

// Function to get display names for backends
const getBackendDisplayName = (backendUrl: string) => {
  if (backendUrl === "https://sub.mli.li/sub?") {
    return "OwO Network Backend";
  }
  return backendUrl;
};

type Mode = "easy" | "hard";

interface PageParams extends CreateSubParams {
  mode: Mode;
  subLink: string;
}

const initialParams: PageParams = {
  mode: "easy",
  subLink: "",
  backend: backends[0],
  url: "",
  target: "Clash",
  config: "",
  include: "",
  exclude: "",
  tfo: false,
  udp: false,
  scv: false,
  append_type: false,
  emoji: true,
  list: false,
};

export default function Home() {
  const tabs = [
    {
      key: "easy",
      label: "Easy Mode",
      icon: "solar:heart-pulse-broken",
    },
    {
      key: "hard",
      label: "Advanced Mode",
      icon: "solar:winrar-linear",
    },
  ];

  const [params, setParams] = useState<PageParams>(initialParams);

  const createSubscription = useCallback(() => {
    try {
      const { mode, subLink: _, ...subParams } = params;
      const newSubLink = createSub({
        ...subParams,
        mode, // Pass mode to createSub function
      });
      copy(newSubLink);
      toast.success("Custom subscription copied to clipboard");

      setParams((prevParams) => ({ ...prevParams, subLink: newSubLink }));
    } catch (e) {
      toast.error((e as Error).message);
    }
  }, [params]);

  const importClash = useCallback(() => {
    const { subLink } = params;

    if (!subLink)
      return toast.error("Please generate a subscription link first");

    window.location.href = `clash://install-config?url=${encodeURIComponent(
      subLink
    )}`;
  }, [params.subLink]);

  const handleSwitchChange = (key: string, value: boolean) => {
    setParams((prevParams) => ({ ...prevParams, [key]: value }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow w-full p-4 flex flex-col justify-center items-center gap-3">
        {/* Added top margin to create more space */}
        <div className="mt-8 mb-6 text-center">
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Subscription Converter
          </h1>
          <p className="text-sm text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
            Convert and customize your proxy subscription links between
            different clients
          </p>
        </div>

        <Card className="w-full lg:w-1/2 md:w-2/3 mb-8">
          <CardBody>
            <Tabs
              size="lg"
              fullWidth
              aria-label="Mode"
              items={tabs}
              selectedKey={params.mode}
              onSelectionChange={(key) =>
                setParams({ ...params, mode: key.toString() as Mode })
              }
            >
              {(item) => (
                <Tab
                  key={item.key}
                  title={
                    <div className="flex items-center space-x-2 font-bold">
                      <Icon icon={item.icon}></Icon>
                      <span>{item.label}</span>
                    </div>
                  }
                >
                  <div className="flex flex-col gap-3">
                    <Textarea
                      variant="bordered"
                      label="Subscription Link"
                      placeholder="Support subscription or ss/ssr/vmess links, one link per line or separated by |"
                      className="w-full"
                      minRows={1}
                      value={params.url}
                      onValueChange={(value) =>
                        setParams({ ...params, url: value })
                      }
                    />
                    <Autocomplete
                      variant="bordered"
                      label="Client Type"
                      placeholder="Please select your client type"
                      className="w-full"
                      selectedKey={params.target}
                      onSelectionChange={(key) =>
                        setParams({
                          ...params,
                          target: (key ?? "Auto Detect") as ClientType,
                        })
                      }
                      defaultItems={Object.entries(cfg.clients)}
                    >
                      {(item) => (
                        <AutocompleteItem key={item[0]}>
                          {item[0]}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                    <Autocomplete
                      variant="bordered"
                      label="Backend Address"
                      placeholder="Please select or enter the backend address, leave empty to use default"
                      className="w-full"
                      allowsCustomValue
                      inputValue={params.backend}
                      onInputChange={(value) =>
                        setParams({ ...params, backend: value })
                      }
                      defaultItems={backends.map((value) => ({
                        value: value,
                        label: getBackendDisplayName(value),
                      }))}
                    >
                      {(item) => (
                        <AutocompleteItem key={item.value}>
                          {item.label}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                    {/* Advanced Mode */}
                    {params.mode === "hard" ? (
                      <div className="flex flex-col gap-3">
                        <Autocomplete
                          variant="bordered"
                          label="Remote Config"
                          placeholder="Please select or enter the remote config needed, leave empty if not needed"
                          className="w-full"
                          allowsCustomValue
                          inputValue={params.config}
                          onInputChange={(value) =>
                            setParams({ ...params, config: value })
                          }
                          defaultItems={cfg.remoteConfig}
                        >
                          {(item) => (
                            <AutocompleteSection
                              key={item.category}
                              title={item.category}
                              classNames={{
                                heading:
                                  "flex w-full sticky top-1 z-20 py-1.5 px-2 bg-default-100 shadow-small rounded-small",
                              }}
                            >
                              {item.items.map((url) => (
                                <AutocompleteItem key={url.label}>
                                  {url.label}
                                </AutocompleteItem>
                              ))}
                            </AutocompleteSection>
                          )}
                        </Autocomplete>
                        <div className="flex flex-row gap-3">
                          <InputCell
                            label="Include Nodes"
                            value={params.include}
                            onValueChange={(value: string) =>
                              setParams({ ...params, include: value })
                            }
                            placeholder="Keywords to include in node names, supports regex"
                          />
                          <InputCell
                            label="Exclude Nodes"
                            value={params.exclude}
                            onValueChange={(value: string) =>
                              setParams({ ...params, exclude: value })
                            }
                            placeholder="Keywords to exclude in node names, supports regex"
                          />
                        </div>
                        <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {cfg.switchCells.map((cell) => (
                            <SwitchCell
                              key={cell.key}
                              title={cell.title}
                              isSelected={
                                params[cell.key as keyof PageParams] as boolean
                              }
                              onValueChange={(value) =>
                                handleSwitchChange(cell.key, value)
                              }
                            />
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </Tab>
              )}
            </Tabs>
          </CardBody>
          <CardFooter className="flex flex-col gap-5 pt-4">
            <TextCell
              label="Custom Subscription"
              value={params.subLink}
              placeholder="Please enter subscription link and select client first, then click generate"
            />
            {process.env.NODE_ENV === "development" ? (
              <Textarea
                isReadOnly
                variant="bordered"
                label="Test Environment"
                className="w-full"
                value={JSON.stringify(params)}
              />
            ) : null}
            <div className="w-2/3 flex flex-col gap-3">
              <Button
                color="primary"
                startContent={<Icon icon="solar:link-round-angle-linear" />}
                onPress={createSubscription}
              >
                Generate Subscription
              </Button>
              <Button
                color="default"
                startContent={<Icon icon="solar:cloud-download-linear" />}
                onPress={importClash}
              >
                Import to Clash
              </Button>
            </div>
          </CardFooter>
        </Card>
      </main>

      {/* Fixed footer at the bottom */}
      <footer className="py-4 border-t border-gray-200 dark:border-gray-800 w-full flex flex-col items-center">
        <p className="text-sm text-center flex items-center gap-2">
          Powered by{" "}
          <Link isExternal href="https://owo.network" className="font-medium">
            OwO Network, LLC
          </Link>
          <span className="mx-1 text-gray-400">|</span>
          <SwitchTheme />
        </p>
      </footer>
    </div>
  );
}

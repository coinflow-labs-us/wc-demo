import { useCallback, useEffect, useState } from "react";

export function useHeight() {
  const [height, setHeight] = useState<string>("500");

  const handleIframeMessages = useCallback(
    ({ data, origin }: { data: string; origin: string }) => {
      if (!origin.includes("coinflow.cash")) return;

      try {
        const message = JSON.parse(data);
        if (message.method !== "heightChange") return;
        setHeight(message.data);
      } catch (e) {}
    },
    [],
  );

  useEffect(() => {
    if (!window) throw new Error("Window not defined");
    window.addEventListener("message", handleIframeMessages);
    return () => {
      window.removeEventListener("message", handleIframeMessages);
    };
  }, [handleIframeMessages]);

  return { height };
}

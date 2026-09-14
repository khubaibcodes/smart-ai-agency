/**
 * Optional live-call bridge for the voice demo.
 *
 * With `NEXT_PUBLIC_VAPI_PUBLIC_KEY` and `NEXT_PUBLIC_VAPI_ASSISTANT_ID` set,
 * the demo can place a real browser call to a Vapi assistant. Without them the
 * scripted demo is the whole experience and none of this code runs.
 *
 * The SDK is loaded from Vapi's own CDN bundle at click time rather than
 * installed as a dependency, for three reasons: nobody pays for the bytes
 * unless they press the button, the build has no dependency on an integration
 * that may never be switched on, and a CDN failure degrades to the scripted
 * call instead of breaking it.
 */

const PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;
const ASSISTANT_ID = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;

/** Inlined at build time, so the button simply isn't rendered when unset. */
export const LIVE_CALL_ENABLED = Boolean(PUBLIC_KEY && ASSISTANT_ID);

const SDK_URL = "https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js";
const SDK_TIMEOUT_MS = 8000;

export interface LiveCall {
  stop: () => void;
  on: (event: string, handler: (...args: unknown[]) => void) => void;
}

interface VapiSDK {
  run: (config: {
    apiKey: string;
    assistant: string;
    config?: Record<string, unknown>;
  }) => LiveCall;
}

declare global {
  interface Window {
    vapiSDK?: VapiSDK;
  }
}

let loader: Promise<VapiSDK> | null = null;

function loadSdk(): Promise<VapiSDK> {
  if (window.vapiSDK) return Promise.resolve(window.vapiSDK);
  if (loader) return loader;

  loader = new Promise<VapiSDK>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SDK_URL;
    script.async = true;

    // A script that loads but never defines the global would otherwise leave
    // the button spinning forever, so the wait is bounded either way.
    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error("timeout"));
    }, SDK_TIMEOUT_MS);

    const cleanup = () => {
      clearTimeout(timeout);
      script.removeEventListener("load", onLoad);
      script.removeEventListener("error", onError);
      // Allow a later attempt to start from scratch.
      loader = null;
    };

    const onLoad = () => {
      const sdk = window.vapiSDK;
      cleanup();
      if (sdk) resolve(sdk);
      else reject(new Error("unavailable"));
    };

    const onError = () => {
      cleanup();
      script.remove();
      reject(new Error("blocked"));
    };

    script.addEventListener("load", onLoad);
    script.addEventListener("error", onError);
    document.head.appendChild(script);
  });

  return loader;
}

/**
 * Starts a live call. Throws with a message written for the visitor — the demo
 * surfaces it inline and stays usable in scripted form either way.
 */
export async function startLiveCall(): Promise<LiveCall> {
  if (!LIVE_CALL_ENABLED) {
    throw new Error("Live calling isn't switched on for this site.");
  }

  // Ask for the microphone first: a denied prompt is by far the most common
  // failure, and it deserves its own explanation rather than a generic one.
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((track) => track.stop());
  } catch {
    throw new Error(
      "We need microphone access to place the call. Allow it in your browser, or watch the scripted demo instead.",
    );
  }

  try {
    const sdk = await loadSdk();
    return sdk.run({ apiKey: PUBLIC_KEY as string, assistant: ASSISTANT_ID as string });
  } catch {
    throw new Error(
      "Couldn't reach the calling service just now. The scripted demo below shows the same call.",
    );
  }
}

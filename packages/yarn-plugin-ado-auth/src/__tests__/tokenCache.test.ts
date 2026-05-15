import { beforeEach, expect, test, vi } from "vitest";
import { TokenCache } from "../tokenCache.js";

vi.mock("@microsoft/ado-npm-auth-lib", async () => {
  return {
    getOrganizationFromFeedUrl: vi.fn(() => "org"),
    generateNpmrcPat: vi.fn(),
  };
});

vi.mock("@yarnpkg/core", async () => {
  return {
    StreamReport: {
      start: vi.fn(async (_options, cb) => {
        await cb({
          reportInfo: vi.fn(),
          reportError: vi.fn(),
        });
      }),
    },
    formatUtils: {
      pretty: vi.fn((_configuration, value) => value),
      Type: {
        URL: "URL",
      },
    },
  };
});

beforeEach(() => {
  vi.clearAllMocks();
});

test("propagates auth errors and retries after failure", async () => {
  const { generateNpmrcPat } = await import("@microsoft/ado-npm-auth-lib");
  vi.mocked(generateNpmrcPat).mockRejectedValue(new Error("auth boom"));

  const tokenCache = new TokenCache(new Map<string, unknown>() as any, () => ({
    adoNpmAuthFeedPrefix: "",
    adoNpmAuthToolPath: "/nonexistent/azureauth",
  }));
  const registry =
    "https://pkgs.dev.azure.com/org/_packaging/feed/npm/registry";

  await expect(tokenCache.getToken(registry)).rejects.toMatchObject({
    message: "auth boom",
  });
  await expect(tokenCache.getToken(registry)).rejects.toThrow("auth boom");
  expect(generateNpmrcPat).toHaveBeenCalledTimes(2);
});

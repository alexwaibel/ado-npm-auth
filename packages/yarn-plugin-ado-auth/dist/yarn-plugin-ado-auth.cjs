/* eslint-disable */
//prettier-ignore
module.exports = {
name: "yarn-plugin-ado-auth",
factory: function (require) {
"use strict";
var plugin = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/plugin.ts
  var plugin_exports = {};
  __export(plugin_exports, {
    default: () => plugin_default
  });

  // src/tokenCache.ts
  var import_core2 = __require("@yarnpkg/core");

  // ../ado-npm-auth-lib/lib/utils/get-organization-from-feed-url.js
  var extractAdoDetails = (url) => {
    try {
      if (!url.startsWith("https://")) {
        url = "https://" + url;
      }
      const parsedUrl = new URL(url);
      const hostname2 = parsedUrl.hostname;
      const pathname = parsedUrl.pathname;
      if (hostname2.endsWith("dev.azure.com")) {
        const pathSegments = pathname.split("/").filter(Boolean);
        if (pathSegments.length >= 2) {
          return {
            organization: pathSegments[0],
            project: pathSegments[1]
          };
        } else {
          throw new Error("Not enough segments in path for a valid organization and project extraction.");
        }
      }
      if (hostname2.endsWith("visualstudio.com")) {
        const subdomain = hostname2.split(".")[0];
        const pathSegments = pathname.split("/").filter(Boolean);
        if (subdomain && pathSegments.length >= 1) {
          return {
            organization: subdomain,
            project: pathSegments[0]
          };
        } else {
          throw new Error("Not enough segments in path or missing subdomain for a valid organization and project extraction.");
        }
      }
      throw new Error("URL format not recognized or does not contain enough information.");
    } catch {
      throw new Error("Invalid URL or unsupported format");
    }
  };
  var getOrganizationFromFeedUrl = (feedUrl, defaultOrg = "") => {
    try {
      const { organization } = extractAdoDetails(feedUrl);
      return organization;
    } catch {
      return defaultOrg;
    }
  };

  // ../ado-npm-auth-lib/lib/utils/encoding.js
  function toBase64(input) {
    return Buffer.from(input || "").toString("base64");
  }

  // ../ado-npm-auth-lib/lib/utils/request.js
  var import_node_https = __toESM(__require("https"), 1);
  var import_node_fs = __toESM(__require("fs"), 1);
  var import_node_path = __toESM(__require("path"), 1);
  async function downloadFile(url, downloadPath) {
    return new Promise((resolve, reject) => {
      import_node_https.default.get(url, (response) => {
        if (response.statusCode === 301 || response.statusCode === 302) {
          const redirectUrl = response.headers.location;
          if (redirectUrl) {
            downloadFile(redirectUrl, downloadPath).then(resolve).catch(reject);
            return;
          } else {
            reject(new Error("Redirect without location header"));
            return;
          }
        }
        if (response.statusCode !== 200) {
          reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
          return;
        }
        let downloadStream;
        try {
          const downloadDir = import_node_path.default.dirname(downloadPath);
          if (!import_node_fs.default.existsSync(downloadDir)) {
            import_node_fs.default.mkdirSync(downloadDir, { recursive: true });
          }
          downloadStream = import_node_fs.default.createWriteStream(downloadPath);
        } catch (error) {
          reject(error);
          return;
        }
        downloadStream.on("error", (error) => {
          reject(error);
        });
        response.pipe(downloadStream);
        downloadStream.on("finish", () => {
          resolve();
        });
      }).on("error", (error) => {
        reject(error);
      });
    });
  }

  // ../ado-npm-auth-lib/lib/npmrc/generate-npmrc-pat.js
  var import_node_os5 = __require("os");

  // ../ado-npm-auth-lib/lib/azureauth/ado.js
  var import_node_os3 = __require("os");
  var import_node_child_process2 = __require("child_process");

  // ../ado-npm-auth-lib/lib/utils/exec.js
  var import_node_child_process = __require("child_process");
  var import_node_util = __require("util");
  var exec = (0, import_node_util.promisify)(import_node_child_process.exec);
  function execProcess(tool, args, options) {
    return new Promise((resolve, reject) => {
      var _a, _b, _c, _d;
      const cwd = (options === null || options === void 0 ? void 0 : options.cwd) || process.cwd();
      console.log(`🚀 Launching  [${tool} ${args.join(" ")}] in ${cwd}`);
      const result = (0, import_node_child_process.spawn)(tool, args, {
        cwd,
        env: (options === null || options === void 0 ? void 0 : options.env) || process.env,
        stdio: (options === null || options === void 0 ? void 0 : options.stdio) || "inherit",
        shell: (options === null || options === void 0 ? void 0 : options.shell) || false
      });
      if ((options === null || options === void 0 ? void 0 : options.stdio) === "pipe") {
        (_a = result.stdout) === null || _a === void 0 ? void 0 : _a.setEncoding("utf8");
        (_b = result.stdout) === null || _b === void 0 ? void 0 : _b.on("data", function(data) {
          var _a2;
          const strData = data.toString("utf8");
          (_a2 = options === null || options === void 0 ? void 0 : options.processStdOut) === null || _a2 === void 0 ? void 0 : _a2.call(options, strData);
        });
        (_c = result.stderr) === null || _c === void 0 ? void 0 : _c.setEncoding("utf8");
        (_d = result.stderr) === null || _d === void 0 ? void 0 : _d.on("data", function(data) {
          var _a2;
          const strData = data.toString("utf8");
          (_a2 = options === null || options === void 0 ? void 0 : options.processStdErr) === null || _a2 === void 0 ? void 0 : _a2.call(options, strData);
        });
      }
      result.on("exit", (code) => {
        if (code == 0) {
          resolve();
        } else {
          reject(new Error(`Process ${tool} exited with code ${code}`));
        }
      });
    });
  }

  // ../ado-npm-auth-lib/lib/azureauth/is-supported-platform-and-architecture.js
  var import_node_os2 = __require("os");

  // ../ado-npm-auth-lib/lib/utils/is-wsl.js
  var import_node_os = __require("os");
  var isWsl = () => {
    return (0, import_node_os.platform)() === "linux" && (0, import_node_os.release)().toLowerCase().includes("wsl");
  };

  // ../ado-npm-auth-lib/lib/azureauth/is-supported-platform-and-architecture.js
  var isSupportedPlatformAndArchitecture = () => {
    const supportedPlatformsAndArchitectures = {
      win32: ["x64"],
      darwin: ["x64", "arm64"]
    };
    return isWsl() || supportedPlatformsAndArchitectures[(0, import_node_os2.platform)()] && supportedPlatformsAndArchitectures[(0, import_node_os2.platform)()].includes((0, import_node_os2.arch)());
  };

  // ../ado-npm-auth-lib/lib/azureauth/azureauth-command.js
  var memo = void 0;
  var npxAzureAuthCommand = [
    "npm",
    "exec",
    "--silent",
    "--yes",
    "azureauth",
    "--"
  ];
  var npxEnv = {
    ...process.env,
    // Use the version from the public registry to avoid a cycle
    npm_config_registry: "https://registry.npmjs.org"
  };
  var azureAuthCommand = () => {
    if (!memo) {
      memo = isWsl() ? ["azureauth.exe"] : npxAzureAuthCommand;
    }
    return { command: memo, env: npxEnv };
  };

  // ../ado-npm-auth-lib/lib/azureauth/is-azureauth-installed.js
  var memo2 = void 0;
  var isAzureAuthInstalled = async () => {
    if (memo2 === void 0) {
      const { command: authCommand, env } = azureAuthCommand();
      const command = `${authCommand.join(" ")} --version`;
      try {
        const result = await exec(command, { env });
        const [, minor] = result.stdout.split(".");
        memo2 = parseInt(minor) >= 8;
      } catch {
        memo2 = false;
      }
    }
    return memo2;
  };

  // ../ado-npm-auth-lib/lib/azureauth/ado.js
  var adoPat = async (options, azureAuthLocation) => {
    if (!isSupportedPlatformAndArchitecture()) {
      throw new Error(`AzureAuth is not supported for platform ${(0, import_node_os3.platform)()} and architecture ${(0, import_node_os3.arch)()}`);
    }
    const { command: authCommand, env } = azureAuthLocation ? {
      command: [azureAuthLocation],
      env: process.env
    } : azureAuthCommand();
    const command = [
      ...authCommand,
      `ado`,
      `pat`,
      `--prompt-hint ${isWsl() ? options.promptHint : `"${options.promptHint}"`}`,
      // We only use spawn for WSL. spawn does not does not require prompt hint to be wrapped in quotes. exec does.
      `--organization ${options.organization}`,
      `--display-name ${options.displayName}`,
      ...options.scope.map((scope) => `--scope ${scope}`)
    ];
    if (options.output) {
      command.push(`--output ${options.output}`);
    }
    if (options.mode) {
      command.push(`--mode ${options.mode}`);
    }
    if (options.domain) {
      command.push(`--domain ${options.domain}`);
    }
    if (options.timeout) {
      command.push(`--timeout ${options.timeout}`);
    }
    try {
      let result;
      if (isWsl()) {
        try {
          result = (0, import_node_child_process2.spawnSync)(command[0], command.slice(1), { encoding: "utf-8" });
          if (result.status !== 0 || result.stderr && !result.stdout) {
            throw new Error(`Azure Auth failed with exit code ${result.status}: ${result.stderr}`);
          }
        } catch (error) {
          throw new Error(`Failed to get Ado Pat from system AzureAuth: ${error.message}`);
        }
      } else {
        try {
          result = await exec(command.join(" "), { env });
          if (result.stderr && !result.stdout) {
            throw new Error(result.stderr);
          }
        } catch (error) {
          throw new Error(`Failed to get Ado Pat from npx AzureAuth: ${error.message}`);
        }
      }
      if (options.output === "json") {
        try {
          return JSON.parse(result.stdout);
        } catch {
          throw new Error(`Failed to parse JSON output: ${result.stdout}`);
        }
      }
      return result.stdout;
    } catch (error) {
      if (!await isAzureAuthInstalled()) {
        throw new Error(`AzureAuth is not installed: ${error}`);
      }
      throw new Error(error.message);
    }
  };

  // ../ado-npm-auth-lib/lib/npmrc/nugetCredentialProvider.js
  var import_node_os4 = __toESM(__require("os"), 1);
  var import_node_fs2 = __toESM(__require("fs"), 1);
  var import_node_path2 = __toESM(__require("path"), 1);
  var CredentialProviderVersion = "1.4.1";
  var OutputDir = import_node_path2.default.resolve("..", ".bin", "CredentialProvider.Microsoft", "v" + CredentialProviderVersion);
  async function credentialProviderPat(registry) {
    const nugetFeedUrl = toNugetUrl(registry);
    const toolPath = await getCredentialProvider();
    return await invokeCredentialProvider(toolPath, nugetFeedUrl);
  }
  function toNugetUrl(registry) {
    if (!registry.endsWith("/npm/registry/")) {
      throw new Error(`Registry URL ${registry} is not a valid Azure Artifacts npm registry URL. Expected it to end with '/npm/registry/'`);
    }
    return "https://" + registry.replace("/npm/registry/", "/nuget/v3/index.json");
  }
  async function invokeCredentialProvider(toolPath, nugetFeedUrl) {
    let response = "";
    await execProcess(toolPath, ["-U", nugetFeedUrl, "-I", "-F", "Json"], {
      stdio: "pipe",
      processStdOut: (data) => {
        response += data;
      },
      processStdErr: (data) => {
        console.error(data);
      }
    });
    try {
      const value = JSON.parse(response);
      return value;
    } catch {
      throw new Error(`Failed to parse CredentialProvider output: ${response}`);
    }
  }
  function tryFileExists(executable) {
    if (import_node_fs2.default.existsSync(executable)) {
      return executable;
    } else if (import_node_fs2.default.existsSync(executable + ".exe")) {
      return executable + ".exe";
    }
    return void 0;
  }
  async function getCredentialProvider() {
    let toolPath = tryFileExists(import_node_path2.default.join(import_node_os4.default.homedir(), ".nuget", "plugins", "netcore", "CredentialProvider.Microsoft", "CredentialProvider.Microsoft"));
    if (toolPath) {
      return toolPath;
    }
    const downloadedFilePath = import_node_path2.default.join(OutputDir, "plugins", "netcore", "CredentialProvider.Microsoft", "CredentialProvider.Microsoft");
    toolPath = tryFileExists(downloadedFilePath);
    if (toolPath) {
      return toolPath;
    }
    await downloadCredentialProvider();
    toolPath = tryFileExists(downloadedFilePath);
    if (toolPath) {
      import_node_fs2.default.chmodSync(toolPath, 493);
    } else {
      throw new Error(`CredentialProvider was not found at expected path after download: ${toolPath}`);
    }
    return toolPath;
  }
  async function downloadCredentialProvider() {
    const downloadUrl = `https://github.com/microsoft/artifacts-credprovider/releases/download/v${CredentialProviderVersion}/Microsoft.Net8.${import_node_os4.default.platform()}-${import_node_os4.default.arch()}.NuGet.CredentialProvider.tar.gz`;
    const downloadPath = import_node_path2.default.join(OutputDir, "CredentialProvider.Microsoft.tar.gz");
    console.log(`🌐 Downloading ${downloadUrl}`);
    await downloadFile(downloadUrl, downloadPath);
    await execProcess("tar", ["-xzf", downloadPath, "-C", OutputDir], {
      stdio: "inherit"
    });
  }

  // ../ado-npm-auth-lib/lib/npmrc/generate-npmrc-pat.js
  var generateNpmrcPat = async (organization, feed, encode = false, azureAuthLocation) => {
    const name = `${(0, import_node_os5.hostname)()}-${organization}`;
    const rawToken = await getRawToken(name, organization, feed, azureAuthLocation);
    if (encode) {
      return toBase64(rawToken);
    }
    return rawToken;
  };
  async function getRawToken(name, organization, feed, azureAuthLocation) {
    const patScope = "vso.packaging_write";
    switch ((0, import_node_os5.platform)()) {
      case "win32":
      case "darwin": {
        const pat = await adoPat({
          promptHint: `Authenticate to ${organization} to generate a temporary token for npm`,
          organization,
          displayName: name,
          scope: [patScope],
          timeout: "30",
          output: "json"
        }, azureAuthLocation);
        return pat.token;
      }
      case "linux": {
        const cpPat = await credentialProviderPat(feed);
        return cpPat.Password;
      }
      default:
        throw new Error(`Platform ${(0, import_node_os5.platform)()} is not supported for ADO authentication`);
    }
  }

  // src/configuration.ts
  var import_core = __require("@yarnpkg/core");

  // src/utils.ts
  function getConfigString(config, key, required = false) {
    const value = config?.get(key);
    if (typeof value === "string") {
      return value;
    } else if (required) {
      throw new Error(`Expected configuration key "${key}" to be a string`);
    }
    return void 0;
  }
  function getConfigMap(config, key) {
    const value = config?.get(key);
    if (value && value.get !== void 0) {
      return value;
    }
    return void 0;
  }

  // src/configuration.ts
  function getConfiguration() {
    return {
      adoNpmAuthToolPath: {
        description: `The path to the ADO authentication tool`,
        type: import_core.SettingsType.STRING,
        default: null
      },
      adoNpmAuthFeedPrefix: {
        description: `The prefix to use for ADO NPM feed URLs`,
        type: import_core.SettingsType.STRING,
        default: `https://pkgs.dev.azure.com/`
      }
    };
  }
  function loadConfiguration(configuration) {
    return {
      adoNpmAuthToolPath: getConfigString(configuration, "adoNpmAuthToolPath"),
      adoNpmAuthFeedPrefix: getConfigString(
        configuration,
        "adoNpmAuthFeedPrefix",
        true
      )
    };
  }

  // src/tokenCache.ts
  var import_node_child_process3 = __require("child_process");
  var import_node_os6 = __toESM(__require("os"), 1);
  var TokenCache = class {
    constructor(configuration, loadConfig = loadConfiguration) {
      this.cache = {};
      this.configuration = configuration;
      const settings = loadConfig(configuration);
      this.prefix = settings.adoNpmAuthFeedPrefix ?? "";
      this.azureAuthPath = settings.adoNpmAuthToolPath || findAzureAuthPath();
    }
    /**
     * Will return the token for the given registry, either from cache or by fetching a new one. If it is in
     * the cache already, it will return it directly. Otherwise it will return a promise that resolves to the token
     * @param registry the registry/feed that we need to authenticate against
     */
    getToken(registry, ident) {
      if (!this.prefix || registry.startsWith(this.prefix)) {
        return this.cache[registry] ??= this.fetchToken(registry, ident);
      }
      return void 0;
    }
    /**
     * Do the work to fetch a token for the given registry. This will attempt to get it from yarnrc/env first,
     * and if not found, will use the ADO CLI to get a new token.
     *
     * @param registry registry to authenticate to
     * @param ident optional ident, used for configuration lookups (yarn pass through)
     * @returns a promise that resolves to a string
     */
    async fetchToken(registry, ident) {
      const configuration = this.configuration;
      let resolvedToken;
      let innerError;
      try {
        await import_core2.StreamReport.start(
          { configuration, stdout: process.stdout },
          async (report) => {
            const prettyRegistry = import_core2.formatUtils.pretty(
              configuration,
              registry,
              import_core2.formatUtils.Type.URL
            );
            try {
              const authConfig = this.getAuthConfiguration(registry, ident);
              const tokenFromYarnrc = getConfigString(authConfig, "npmAuthToken");
              if (tokenFromYarnrc) {
                resolvedToken = tokenFromYarnrc;
                report.reportInfo(
                  null,
                  `Authenticated to: ${prettyRegistry} (via configuration)`
                );
                return;
              }
              const organization = getOrganizationFromFeedUrl(registry);
              if (!organization) {
                throw new Error(
                  `Could not determine organization from registry URL: ${registry}`
                );
              }
              const pat = await generateNpmrcPat(
                organization,
                registry,
                false,
                this.azureAuthPath
              );
              resolvedToken = pat;
              report.reportInfo(
                null,
                `Authenticated to: ${prettyRegistry} (via ADO CLI)`
              );
            } catch (err) {
              innerError = err;
              report.reportError(
                import_core2.MessageName.UNNAMED,
                `Failed to authenticate to ${prettyRegistry}: ${err instanceof Error ? err.message : String(err)}`
              );
            }
          }
        );
      } catch (err) {
        delete this.cache[registry];
        throw err;
      }
      if (resolvedToken == null) {
        delete this.cache[registry];
        if (innerError) {
          throw innerError instanceof Error ? innerError : new Error(String(innerError));
        }
        throw new Error(`Failed to authenticate to: ${registry}`);
      }
      this.cache[registry] = resolvedToken;
      return resolvedToken;
    }
    /**
     * Get the authentication configuration for the given registry and ident. This code was
     * taken from Yarn's npm plugin to match their logic. Importing that package directly results in
     * a massive bundle, so extracted just this logic.
     */
    getAuthConfiguration(registry, ident) {
      const scopeConfiguration = ident && this.getScopeConfiguration(ident.scope);
      if (scopeConfiguration?.get(`npmAuthToken`)) {
        return scopeConfiguration;
      }
      const registryConfiguration = this.getRegistryConfiguration(registry);
      return registryConfiguration ?? this.configuration;
    }
    /**
     * Return the auth configuration for the given scope if one has been set
     * @param scope package scope to use for lookups
     */
    getScopeConfiguration(scope) {
      if (scope != null) {
        const scopeConfigurations = getConfigMap(this.configuration, `npmScopes`);
        const scopeConfiguration = getConfigMap(scopeConfigurations, scope);
        if (scopeConfiguration) {
          return scopeConfiguration;
        }
      }
      return null;
    }
    /**
     * Return the auth configuration for the given registry if one has been set
     * @param registry registry to get configuration for
     */
    getRegistryConfiguration(registry) {
      const registryConfigurations = getConfigMap(
        this.configuration,
        `npmRegistries`
      );
      const normalizedRegistry = registry.replace(/\/$/, ``);
      const exactEntry = getConfigMap(registryConfigurations, normalizedRegistry);
      if (typeof exactEntry !== `undefined`) {
        return exactEntry;
      }
      const noProtocolEntry = getConfigMap(
        registryConfigurations,
        normalizedRegistry.replace(/^[a-z]+:/, ``)
      );
      return noProtocolEntry ?? null;
    }
  };
  function findAzureAuthPath() {
    const isWin = import_node_os6.default.platform() === "win32";
    const execName = isWin ? "azureauth.exe" : "azureauth";
    const cmd = isWin ? "where" : "which";
    try {
      const result = (0, import_node_child_process3.spawnSync)(cmd, [execName], { encoding: "utf-8" });
      if (result.status === 0 && result.stdout) {
        const line = result.stdout.split(/\r?\n/).find(Boolean);
        return line ? line.trim() : void 0;
      }
    } catch {
    }
    return void 0;
  }

  // src/getToken.ts
  var getToken = /* @__PURE__ */ (() => {
    let tokenCache = void 0;
    return (options, registry) => {
      tokenCache ??= new TokenCache(options.configuration);
      return tokenCache.getToken(registry, options.ident);
    };
  })();

  // src/plugin.ts
  async function getNpmAuthenticationHeader(currentHeader, registry, options) {
    const customToken = getToken(options, registry);
    if (customToken !== void 0) {
      const token = typeof customToken === "string" ? customToken : await customToken;
      return `Bearer ${token}`;
    }
    return currentHeader;
  }
  var plugin = {
    /**
     * Add the plugin configuration options
     */
    configuration: getConfiguration(),
    /**
     * Add a hook to authenticate on demand with npm feeds
     */
    hooks: {
      getNpmAuthenticationHeader
    }
  };
  var plugin_default = plugin;
  return __toCommonJS(plugin_exports);
})();
return plugin;
}
};
//# sourceMappingURL=yarn-plugin-ado-auth.cjs.map

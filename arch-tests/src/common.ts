import G from "glob";

export const globOptions: G.IOptions = {
  ignore: [
    "**/node_modules/**",
    "**/.git/**",
    "**/dist/**",
    "**/projects/**",
    "**/auxiliary/**",
    "**/bin/**",
    "**/obj/**",
    "**/optimus/**",
    "**/support/**", // does not use dotnet 6, remove after it starts
    "**/angular/**", // impossible to partial update, let it be
	"**/assistant/Kloud.Assistant.Remote.Bot/**",
  ],
};

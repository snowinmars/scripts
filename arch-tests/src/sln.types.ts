// LocalAllInOneDebug|Any CPU
export type Configuration = {
  readonly build: string;
  readonly cpu: string;
}

// {BEF90E85-C883-46AC-A388-06A78F22389A}.LocalAllInOneDebug|Any CPU.ActiveCfg
export type Declaration = Configuration & {
  readonly id: string;
}

export type Project = {
  readonly declaration: Declaration;
  readonly configuration: Configuration;
  readonly source: string;
}

export enum ProjectWarningType {
  declarationConfigurationMismatch = 'declarationConfigurationMismatch',
}

export type ProjectWarning = {
  readonly project: Project;
  readonly type: ProjectWarningType;
}

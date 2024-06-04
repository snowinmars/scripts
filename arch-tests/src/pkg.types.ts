export enum DependencyWarningType {
  nonExactPackageVersion = 'nonExactPackageVersion',
  versionMismatch = 'versionMismatch',
  configurationMismatch = 'configurationMismatch',
}

export enum TargetFramework {
  dotnet6 = 'net6.0',
  netstandard21 = 'netstandard2.1',
  net472 = 'net472',
  node = 'node',
}

export type DependencyWarning = {
  readonly type: DependencyWarningType;
  readonly minVersion?: Dependency | null;
  readonly maxVersion?: Dependency | null;
  readonly dependency: Dependency;
}

export type PackageJson = {
  readonly dependencies: Record<string, string>;
  readonly devDependencies: Record<string, string>;
}

export type Dependency = {
  readonly source: string;
  readonly name: string;
  readonly condition?: string | null;
  readonly version: string;
  readonly targets?: TargetFramework[] | null;
}

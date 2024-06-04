import {resolve} from 'path';
import {readFileSync} from "fs";
import {globOptions} from "./common";
import pkg from "glob";
import {
  TargetFramework,
  Dependency,
  DependencyWarningType,
  DependencyWarning,
  PackageJson,
} from './pkg.types';
const {glob} = pkg;

const parseTargets = (filepath: string, content: string): TargetFramework[] => {
  // <TargetFramework>netstandard2.1</TargetFramework>
  // <TargetFrameworks>netstandard2.1;net472</TargetFrameworks>
  const targetRegex = /TargetFramework[s]?>(.*?)<\/TargetFramework[s]?/g;

  const targetMatches = [...content.matchAll(targetRegex)];

  if (targetMatches.length) {
    return targetMatches
      .map(match => {
        return match[1]
          .split(';')
          .map(target => {
            const isNewDotnet = target.startsWith('netstandard') || target.startsWith('net6');
            const isOldDotnet = target.startsWith('net472');
            if (isNewDotnet) return TargetFramework.dotnet6;
            if (isOldDotnet) return TargetFramework.net472;
            throw new Error(`Found unknown target framework ${target} in ${filepath}`);
          });
      })
      .flat();
  } else {
    // old csproj syntax exists only in net472 projects
    return [
      TargetFramework.net472,
    ];
  }
};

const fillBackendDeps = (filepath: string): [Dependency[], Dependency[]] => {
  const content = readFileSync(filepath, 'utf8');

  // <PackageReference Include="Microsoft.Extensions.Http.Polly">
  //   <Version>6.0.3</Version>
  // </PackageReference>
  const newSyntaxRegex = /.*?<PackageReference[^\/]*?>[.\s\S]*?<\/PackageReference>/gm;

  // <PackageReference Include="Grpc.Net.ClientFactory" Version="2.44.0" />
  const oldSyntaxRegex = /.*?<PackageReference.*?\/>/gm;

  const packageReferenceMatches = [
    ...content.matchAll(newSyntaxRegex),
    ...content.matchAll(oldSyntaxRegex),
  ];
  if (!packageReferenceMatches) return [[], []];

  const targets = parseTargets(filepath, content);

  return packageReferenceMatches.reduce((acc, packageReferenceMatch) => {
    const includeMatch = packageReferenceMatch[0].match(/.*?Include="(.*?)".*/);
    const versionMatch = packageReferenceMatch[0].match(/.*?Version="(.*?)".*/) || packageReferenceMatch[0].match(/.*?<Version>(.*?)<\/Version>.*/);
    const conditionMatch = packageReferenceMatch[0].match(/.*?Condition="(.*?)".*/);

    const name = includeMatch && includeMatch[1].trim();
    const version = versionMatch && versionMatch[1].trim();
    const condition = conditionMatch && conditionMatch[1].trim();

    if (!name || !version) throw new Error('Broken package reference');

    const dependency: Dependency = {
      name,
      version,
      condition,
      source: filepath,
      targets,
    };

    const [dotnet6Dependencies, dotnet472Dependencies] = acc;

    const canUseDotnet6 = targets.includes(TargetFramework.dotnet6) || targets.includes(TargetFramework.netstandard21);
    const useDotnet6 = !condition || condition?.match(/!=.*472/);
    const canUseNet472 = targets.includes(TargetFramework.net472);
    const useNet472 = !condition || condition?.match(/==.*472/);
    const isDotnet6Dependency = canUseDotnet6 && useDotnet6;
    const isNet472Dependency = canUseNet472 && useNet472;

    if (!isDotnet6Dependency && !isNet472Dependency) throw new Error(`Dependency ${JSON.stringify(dependency)} is neither net6.0/netstandard2.1 nor net472`);
    if (isDotnet6Dependency) dotnet6Dependencies.push(dependency);
    if (isNet472Dependency) dotnet472Dependencies.push(dependency);

    return acc;
  }, [[], []] as [Dependency[], Dependency[]]);
};

const fillFrontendDeps = (filepath: string): Dependency[] => {
  let packageJson = {} as PackageJson;

  try {
    packageJson = JSON.parse(readFileSync(filepath, 'utf8')) as PackageJson;
  } catch (e:unknown) {
    console.log(`\nERROR: ${filepath} json is invalid\n`)
    throw e;
  }

  return Object.entries(packageJson.dependencies || [])
    .concat(Object.entries(packageJson.devDependencies || []))
    .map(([name, version]) => ({name, version, source: filepath, targets: [TargetFramework.node]}));
};

const searchForWarnings = (dependencies: Dependency[]): DependencyWarning[] => {
  const groups = groupBy(dependencies, 'name');

  return Object.keys(groups)
    .map(packageName => {
      const allPackages = groups[packageName];

      const portalDependencies = allPackages.filter(dependency=>{
        return !dependency.source.includes('Kloud.Portal.Local.Web/react/') &&
               !dependency.source.includes('Kloud.Portal.Local.Web\\react\\') &&
               !dependency.source.includes('Kloud.Portal.Local.Web/react-hardware/') &&
               !dependency.source.includes('Kloud.Portal.Local.Web\\react-hardware\\') &&
               !dependency.source.includes('Kloud.Portal.Local.Web/eslint-config/') &&
               !dependency.source.includes('Kloud.Portal.Local.Web\\eslint-config\\') &&
               !dependency.source.includes('Kloud.KarSar.Hardware.Stats\\src\\Scripts') &&
               !dependency.source.includes('Kloud.KarSar.Hardware.Stats/src/Scripts') &&
               !dependency.source.includes('Kloud.KarSar.Remote.Api\\src\\Scripts') &&
               !dependency.source.includes('Kloud.KarSar.Remote.Api/src/Scripts') &&
               !dependency.source.includes('karsar\\Scripts') &&
               !dependency.source.includes('karsar/Scripts') &&
               !dependency.source.includes('Kloud.KarSar.Local.WebTools') &&
               !dependency.source.includes('drive\\Scripts') &&
               !dependency.source.includes('drive/Scripts') &&
               !dependency.source.includes('python')
               ;
      });

      return allPackages.map((dependency): (DependencyWarning | null) => {
          if (dependency.version.startsWith('^') ||
              dependency.version.startsWith('~') ||
              dependency.version.startsWith('>') ||
              dependency.version.startsWith('<') ||
              dependency.version === '*')
            return {type: DependencyWarningType.nonExactPackageVersion, dependency: dependency};

            return null;
        })
          // TODO: we ignore react (and similar) because it is an independent module which does not require any version consistency
          //       unlike Angular frontend modules which can be compiled together into a bigger monolith.
          //       Please make it more explicit, perhaps introduce a marker that identifies which module it belongs to
          //       and validate consistency within it.
        .concat(portalDependencies.map((dependency): (DependencyWarning | null) => {
          const packagesForCurrentTarget = portalDependencies
            .filter(x => x.targets
                          ?.filter(value => dependency.targets?.includes(value))
                          ?.length)
            .sort((l, r) => l.version > r.version ? 1 : l.version < r.version ? -1 : 0);

          if (packagesForCurrentTarget.length === 0) throw new Error('Impossible');
          if (packagesForCurrentTarget.length === 1) return null; // package is unique
          if (dependency.version === packagesForCurrentTarget[0].version) return null;

          const min = packagesForCurrentTarget[0];
          const max = packagesForCurrentTarget[packagesForCurrentTarget.length - 1];

          return {
            dependency,
            minVersion: min,
            maxVersion: max,
            type: DependencyWarningType.versionMismatch,
          };
        }))
        .filter(x => x) as DependencyWarning[];
    })
    .flat();
};

// @ts-ignore
const groupBy = function<T>(xs: T[], key): Record<string, T[]> { return xs.reduce(function(rv, x) { (rv[x[key]] = rv[x[key]] || []).push(x); return rv; }, {}); };

export const checkFrontendDependencies = (path: string): void => {
  console.log(`Checking frontend dependencies for ${path}`);

  glob(resolve(path), globOptions, (err, matches) => {
    const dependencies = matches
      .reduce((dependencies, match) => {
        dependencies.push(...fillFrontendDeps(match));
        return dependencies;
      }, [] as Dependency[])
      .sort((lhs, rhs) => lhs.name > rhs.name ? 1 : lhs.name < rhs.name ? -1 : 0);

    console.log(`  Found ${dependencies.length} frontend dependencies`);
    const warnings = searchForWarnings(dependencies);

    if (!warnings.length) {
      console.log('    frontend seems ok');
      return;
    }

    const messages = warnings.map(warning => {
      const {type, dependency: pkg, minVersion, maxVersion } = warning;
      switch (type) {
        case DependencyWarningType.nonExactPackageVersion:
          return `WARN: in ${pkg.source} package ${pkg.name} has non-exact version ${pkg.version}`;
        case DependencyWarningType.versionMismatch:
          return `WARN: in ${pkg.source} package ${pkg.name} @ ${pkg.version} version is inconsistent: across all ${pkg.name} packages minVersion is ${minVersion?.source || 'unknown'} @ ${minVersion?.version || 'unknown'} and maxVersion is ${maxVersion?.source || 'unknown'} @ ${maxVersion?.version || 'unknown'}`;
        default:
          throw new Error(`Unknown warning type ${warning.type}`);
      }
    });

    if(messages.length) {
      throw new Error(messages.join('\n'));
    }
  });
};

export const checkBackendDependencies = (path: string): void => {
  console.log(`Checking backend dependencies for ${path}`);

  glob(resolve(path), globOptions, (err, matches) => {
    const [dotnet6Dependencies, dotnet472Dependencies] = matches
      .reduce((dependencies, match) => {
        const [dotnet6Dependencies, dotnet472Dependencies] = fillBackendDeps(match);
        dependencies[0].push(...dotnet6Dependencies);
        dependencies[1].push(...dotnet472Dependencies);
        return dependencies;
      }, [[], []] as [Dependency[], Dependency[]]);

    console.log(`  Found ${dotnet6Dependencies.length} backend dependencies for dotnet6 and ${dotnet472Dependencies.length} backend dependencies for net472`);
    const warnings = [
      ...searchForWarnings(dotnet6Dependencies),
      ...searchForWarnings(dotnet472Dependencies)
    ];

    if (!warnings.length) {
      console.log('    backend seems ok');
      return;
    }

    const messages = warnings.map(warning => {
      const {type, dependency, minVersion, maxVersion} = warning;
      switch (type) {
        case DependencyWarningType.versionMismatch:
          return `WARN: in ${dependency.source} package ${dependency.name} @ ${dependency.version} version is inconsistent: across all ${dependency.name} packages minVersion is ${minVersion?.source || 'unknown'} @ ${minVersion?.version || 'unknown'} and maxVersion is ${maxVersion?.source || 'unknown'} @ ${maxVersion?.version || 'unknown'}`;
        case DependencyWarningType.configurationMismatch:
          return `WARN: in ${dependency.source} package ${dependency.name} @ ${dependency.version} is misconfigurated`;
        default:
          throw new Error(`Unknown warning type ${warning.type}`);
      }
    });

    if(messages.length) {
      throw new Error(messages.join('\n'));
    }
  });
};

[
  '../../**/package.json',
].map(checkFrontendDependencies);

[
  '../../**/*.csproj',
].map(checkBackendDependencies);

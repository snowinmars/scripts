import {basename, resolve} from "path";
import {readFileSync} from "fs";
import pkg from "glob";
const {glob} = pkg;
import {exceptions} from "./sln.exceptions";
import {globOptions} from "./common";
import {
  Project,
  ProjectWarning,
  ProjectWarningType,
} from "./sln.types";

const fill = (filepath: string): Project[] => {
  const content = readFileSync(filepath, 'utf8');

  const matches = [...content.matchAll(/{([A-F0-9]{8}(?:-[A-F0-9]{4}){3}-[A-F0-9]{12})}\.(.*?)\|(.*?) = (.*?)\|(.*)/g)];
  if (!matches) return [];

  return matches.map((match): Project => ({
    declaration: {
      id: match[1],
      build: match[2],
      cpu: match[3],
    },
    configuration: {
      build: match[4],
      cpu: match[5],
    },
    source: filepath,
  }));
};

const searchForWarnings = (projects: Project[]): ProjectWarning[] => {
  return projects
    .map(project => {
      if (project.declaration.build === project.configuration.build) {
        return null;
      }

      const error = {
        project,
        type: ProjectWarningType.declarationConfigurationMismatch,
      };

      const allowedSolution = exceptions.filter(x => x.solution === basename(project.source))[0];
      if (!allowedSolution) return error;

      const isAllowedProject = allowedSolution.allowedMatches.map(x => x.atProjects).flat().includes(project.declaration.id);
      if (!isAllowedProject) return error;

      const isAllowedDeclaration = allowedSolution.allowedMatches.map(x => x.from).flat().includes(project.declaration.build);
      if (!isAllowedDeclaration) return error;

      const isAllowedConfiguration = allowedSolution.allowedMatches.map(x => x.to).flat().includes(project.configuration.build);
      if (!isAllowedConfiguration) return error;

      return null;
    })
    .filter(x => x) as ProjectWarning[];
};

export const checkSolution = (path: string): void => {
  console.log(`Checking ${path}`);

  glob(resolve(path), globOptions, (err, matches) => {
    const dependencies = matches
      .reduce((dependencies, match) => {
        dependencies.push(...fill(match));
        return dependencies;
      }, [] as Project[]);

    const warnings = searchForWarnings(dependencies);

    if (!warnings.length) {
      console.log('    solution seems ok');
      return;
    }

    const messages = warnings.map(warning => {
      const {type, project} = warning;
      switch (type) {
        case ProjectWarningType.declarationConfigurationMismatch:
          return `WARN: ${project.declaration.build} -> ${project.configuration.build} @ ${project.source} ${project.declaration.id}`;
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
  '../../**/*.sln',
].map(checkSolution);

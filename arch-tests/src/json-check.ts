import {resolve} from "path";
import {globOptions} from "./common";
import pkg from "glob";
const {glob} = pkg;
import {readFileSync} from "fs";

const isValidJsonFile = (filepath: string): boolean => {
  const content = readFileSync(filepath, 'utf8').replace(/^\uFEFF/, '');
  if (!content) return true;

  try {
    JSON.parse(content);
    return true;
  } catch {
    return false;
  }
}

export const checkJsonFormat = (path: string): void => {
  console.log(`Checking json format for ${path}`);

  glob(resolve(path), globOptions, (err, matches) => {
    matches.map(x => ({file: x, valid: isValidJsonFile(x)}))
      .filter(({valid}) => !valid)
      .map(({file}) => {
        console.log(`File is not valid json: ${file}`);
        return Error(file);
      })
      .forEach(e => {
        throw e;
      });

    console.log('  json format seems ok');
  });
}

[
  '../../**/*.json'
].map(checkJsonFormat);

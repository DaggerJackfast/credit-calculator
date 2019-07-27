import fs from 'fs';
import path from 'path';

const fixtures = path.join(__dirname, 'fixtures');

export function readFile(filePath) {
    return fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8');
}

export function readFixture(filePath) {
    const relPath = path.join(fixtures, filePath);
    return readFile(relPath)
}

export function readJsonFixture(filePath) {
    const relPath = path.join(fixtures, filePath);
    const json_data = readFile(relPath);
    return JSON.parse(json_data);
}

export function importPrivateFunction(module, func) {
    return module.default.__get__(func);
}

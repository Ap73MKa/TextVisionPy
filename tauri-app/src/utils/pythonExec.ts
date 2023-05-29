import {join} from 'path';
import {exec} from "child_process";

export default function runPythonScript(imagePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const pythonScriptPath = join(__dirname, 'text_recognizer.py')
        const command = `${pythonScriptPath} ${imagePath}`;
        exec(command, (error, stdout) => {
            if (error) {
                reject(error);
            } else {
                resolve(stdout.trim())
            }
        });
    });
}
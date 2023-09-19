import fs from "node:fs";
import path from "node:path";

export function emptyDir(dirPath: string) {
	const dirContents = fs.readdirSync(dirPath); // List dir content

	for (const fileOrDirPath of dirContents) {
		try {
			// Get Full path
			const fullPath = path.join(dirPath, fileOrDirPath);
			const stat = fs.statSync(fullPath);
			if (stat.isDirectory()) {
				// It's a sub directory
				if (fs.readdirSync(fullPath).length) emptyDir(fullPath);
				// If the dir is not empty then remove it's contents too(recursively)
				fs.rmdirSync(fullPath);
			} else fs.unlinkSync(fullPath); // It's a file
		} catch (ex) {
			console.error((ex as Error).message);
		}
	}
}

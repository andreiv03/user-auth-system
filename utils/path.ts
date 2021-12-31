import fs from "fs";

class PathClass {
  deleteFilePath(path: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.unlink(path, error => {
        if (error) reject(error);
        resolve();
      });
    });
  }
}

const Path = new PathClass();
export default Path;
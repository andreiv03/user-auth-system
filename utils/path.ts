import fs from "fs";

const deleteFilePath = (path: string) => {
  return new Promise((resolve, reject) => {
    fs.unlink(path, error => {
      if (error) reject(error);
      resolve(null);
    });
  });
}

export { deleteFilePath };
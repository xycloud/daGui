import fs from 'fs';
import md5 from 'js-md5';
import config from "../../config/electron";
import SaveMode from "../shared/enums/SaveMode";
import path from 'path';
import {dialog} from 'electron'

export function save(path, code, graph, commentChar, saveMode) {
  return new Promise((resolve, reject) => {
    code += '\n';
    const codeHash = md5(code);
    let daguiMetadata = '';
    daguiMetadata += commentChar + config.daguiTags.start + '\n';
    daguiMetadata += commentChar + 'hash:' + codeHash + ';' + graph + '\n';
    daguiMetadata += commentChar + config.daguiTags.end;

    if(saveMode == SaveMode.FULL_SAVE){
      fs.writeFile(path, code + daguiMetadata, (err) => {
        if (err) return reject(err);
        resolve();
      });

    }else if(saveMode == SaveMode.ONLY_GRAPH_DATA){
      fs.readFile(path, 'utf8', function (err,data) {
        if (err){
          if (err.code === 'ENOENT'){ // File does not exists ==> write immediately
            fs.writeFile(path, daguiMetadata, function (err) {
              if (err) return reject(err);
              resolve();
            });
          }else{
            return reject(err);
          }
        }

        const replaceRegex = new RegExp(commentChar + config.daguiTags.start + "[\\s\\S]*?" + commentChar + config.daguiTags.end, "gm");

        let result;
        if(!replaceRegex.test(data)){
          result = data + '\n' + daguiMetadata;
        }else{
          result = data.replace(replaceRegex, daguiMetadata);
        }

        fs.writeFile(path, result, function (err) {
          if (err) return reject(err);
          resolve();
        });
      });
    }else if(saveMode == SaveMode.ONLY_CODE){
      reject(new Error("SaveMode.ONLY_CODE is yet not implemented!"))
    }else{
      reject(new Error("Unknown save mode '" + saveMode + "'!"))
    }
  });
}

export function showSaveDialog(options){
    const savePath = dialog.showSaveDialog(options);
    return [savePath, path.dirname(savePath), path.basename(savePath)]
}
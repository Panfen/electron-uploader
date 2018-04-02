import Datastore from 'lowdb';
import LodashId from 'lodash-id';
import FileSync from 'lowdb/adapters/FileSync';
import path from 'path';
import fs from 'fs-extra';
import {remote, app} from 'electron';

const APP = process.type === 'renderer' ? remote.app : app;
const STORE_PATH = APP.getPath('userData');

// console.log(STORE_PATH)  // C:\Users\Panjf\AppData\Roaming\Electron

if(process.type !== 'renderer'){
	if(!fs.pathExistsSync(STORE_PATH)){
		fs.mkdirSync(STORE_PATH);
	}
}

const adapter = new FileSync(path.join(STORE_PATH, '/data.json'));

const db = Datastore(adapter);
db._.mixin(LodashId);

if(!db.has('uploaded').value()){
	db.set('uploaded', []).write();
}

if(!db.has('picBed').value()){
	db.set('picBed', {
		current: 'qiniu'
	}).write();
}

if(!db.has('shortKey').value()){
	db.set('shortKey', {
		upload: ''
	}).write();
}

export default db;
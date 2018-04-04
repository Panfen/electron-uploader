import qiniuUpload from './qiniuUpload'
import db from '../../datastore/index'

const checkUploader = (type) => {
	const currentUploader = db.read().get(`picBed.${type}`).value();
	return currentUploader ? true : false;
}

const uploader = (img, type, webContents) => {
	const uploadType = db.read().get('picBed.current').value();
	if (checkUploader(uploadType)) {
		switch (uploadType) {
			case 'qiniu':
				return qiniuUpload(img, type, webContents);
			default:
			  return false;
		}
	} else {
		return false;
	}
}

export default uploader
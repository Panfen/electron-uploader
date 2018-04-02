import db from '../../datastore'

export default {
	//
	data() {
		return {
			defaultPicBed: db.read().get('picBed.current').value()
		}
	},
	methods: {
		setDefaultPicBed(type) {
			db.read().set('picBed.current', type).write();
			this.defaultPicBed =  type;
			this.$electron.ipcRenderer.send('uploadDefaultPicBed');
			const successNotification = new window.Notification('设置默认图床', {
				body: '设置成功'
			});
			successNotification.onclick = () => {
				return true;
			}
		}
	}
}
let cmd = require('node-cmd');
const {
	watch
} = require('gulp');
const colors = require('colors');


const defaultTask = cb => {
	const func = () => {
		// cmd.get("npm run fix", (err, data, stderr) => {
		// 	console.log(data)
		// 	console.log('----------------------------------------------------------'.blue);
		cmd.get("npm run wp", (err, data, stderr) => {
			console.log(data)
			console.log('waiting for updates'.green);
		})
	})
}

func()

watch(['./src/**/*'], cb => {
	console.log('===================================================================================================='.red);
	func()
	cb();
});
cb();
}


exports.default = defaultTask
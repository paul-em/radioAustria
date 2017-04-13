const {createWindowsInstaller} = require('electron-winstaller');
const path = require('path');

getInstallerConfig()
    .then(createWindowsInstaller)
    .catch((error) => {
		console.error(error.message || error)
		process.exit(1)
	});

function getInstallerConfig () {
    console.log('Creating Windows installer...');
    const rootPath = path.join('./');
    const outPath = path.join(rootPath, 'build');

    return Promise.resolve({
       appDirectory: path.join(outPath, 'RadioAustria-win32-ia32/'),
       authors: 'Paul Em',
       noMsi: true,
       outputDirectory: path.join(outPath, 'installers'),
       exe: 'RadioAustria.exe',
       setupExe: 'RadioAustria-Installer.exe',
       setupIcon: path.join(rootPath, 'app', 'images', 'logos', 'fm4.ico'),
       loadingGif: path.join(rootPath, 'build_tools', 'install.gif')
   })
}
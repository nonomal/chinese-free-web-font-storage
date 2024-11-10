import { spawn } from "child_process";


export const useRustWoff2Server = () => {

    const rustServer = spawn('cargo', ['run'], { shell: true })
    return new Promise((resolve, reject) => {
        rustServer.stdout.on('data', (data) => {
            if (data.includes('Rocket has launched ')) {
                resolve(rustServer)
                console.log(`${data}`)
                console.log("Rust 服务已经开启")
            }
        });
        rustServer.stderr.on('data', (data) => {
            console.error(`Rust server stderr: ${data}`);
        });

        rustServer.on('close', (code) => {
            reject(`Rust server process exited with code ${code}`);
        });
    })

}
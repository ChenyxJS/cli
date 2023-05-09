// import spawn from "child_process"

// export const commandSpawn = (...args: any[]) => {
//    return new Promise<void>((resolve, reject) => {
//       const childProcess = spawn(...args)
//       childProcess.stdout.pipe(process.stdout)
//       childProcess.stderr.pipe(process.stderr)
//       childProcess.on("close", () => {
//          resolve()
//       })
//    })
// }
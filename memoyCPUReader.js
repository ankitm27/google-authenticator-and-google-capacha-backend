const cron = require('cron');
const os = require('os-utils');
const { exec } = require('child_process');
const dotenv = require('dotenv');
dotenv.load();

let memoryUsage = os.freememPercentage() * 100;
let cpuUsage;


let triggerPythonScript = (type, cpuUsage, memoryUsage) => {
    exec('python notification.py ' +  type  + " "  + cpuUsage + " " + memoryUsage, (err, stdout, stderr) => {
        //console.log("err",err);
        //console.log("stdout",stdout);
        //console.log("stderr",stderr);
    });
    console.log("check")
}

var job = new cron.CronJob('* * * * *', function () {
    os.cpuUsage(function (cpuUsage) {
        cpuUsage = cpuUsage * 100;
        if (memoryUsage > process.env.MEMORY_USAGE && cpuUsage > process.env.cpu_USAGE) {
            triggerPythonScript("both", memoryUsage, cpuUsage);
        }
        else if (memoryUsage > process.env.MEMORY_USAGE) {
            triggerPythonScript("memory", memoryUsage);
        }
        else if (cpuUsage > process.env.CPU_USAGE) {
            triggerPythonScript("cpu", cpuUsage);
        }
        //else {
        //    console.log("every thing fine");
        //}
    });
},null,true);
module.exports = {
    apps: [{
        name: "ms-webhook_ssg-js",
        script: "./app.js",
        instances: 1,
        exec_mode: "fork",
        watch: true,
        log_file: "~/.pm2/logs/ms-webhook_ssg-js-outerr.log",
        out_file: "NULL", // ~/.pm2/logs/ms-webhook_ssg-js-out.log
        error_file: "~/.pm2/logs/ms-webhook_ssg-js-error.log",
        combine_logs: true,
        merge_logs: true,
        env_production: {
            NODE_ENV: "production",
            NODE_PATH: "./"
        },
        env_development: {
            NODE_ENV: "development",
            NODE_PATH: "./"
        }
    }]
};
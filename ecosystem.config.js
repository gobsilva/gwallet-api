const env = process.env.NODE_ENV;

module.exports = {
    apps: [{
        name: "gwallet-api",
        script: "./app.js",
        max_memory_restart: "200M",
        env: {
            NODE_ENV: env,
        }
    }]
}
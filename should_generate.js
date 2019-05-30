const util = require('util')
const fs = require('fs')
const fetch = require("node-fetch");

const streamPipeline = util.promisify(require('stream').pipeline)
const AsyncReadFile = util.promisify(fs.readFile);
const AsyncWriteFile = util.promisify(fs.writeFile);

async function getLastReleases() {
    const url = 'https://api.github.com/repos/pact-foundation/pact-ruby-standalone/releases/latest?';
    const params = new URLSearchParams({ client_id: process.env.GH_CLIENT_ID, client_secret: process.env.GH_CLIENT_SECRET })
    try {
        const response = await fetch(url + params);
        const json = await response.json();
        return json;
    } catch (error) {
        console.log("Error fetching releases");
    }
}

async function run() {
    const lastReleases = await getLastReleases();
    const packagePath = './dist/package.json';
    var file_content = await AsyncReadFile(packagePath);
    var content = JSON.parse(file_content);
    // const releaseVersion = lastReleases.tag_name.replace('v', '');
    const releaseVersion = '1.67.1-beta'
    if (content.version === releaseVersion) {
        console.log('New binaries not found, skipping publish.');
        process.exit(1);
    }
}

run();

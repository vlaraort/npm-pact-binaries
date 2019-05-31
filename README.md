# NPM Pact binaries

npm-pact-binaries is a library containing the Pact binaries, hosted [here](https://github.com/pact-foundation/pact-ruby-standalone/releases), so they can be used as an alternative for whom can't have access to github to download them during the [pact-node](https://github.com/pact-foundation/pact-node) post-install script. (Usually companies with a strict proxy or firewall).

The code hosted in Gihub is an aggregator of node scripts, which check daily if there are new releases of the binaries, and creates a package, hosted in NPM, with those binaries.

The package published in NPM is just the package.json of the dist folder, plus all the binaries of a version.

When a new version of the Pact binaries are released, a new version of this package will be released too, with the same version of the binaries.

## Installation

Add this config to your package.json, so pact-node get the binaries from the package instead of Github. [(Official information)](https://github.com/pact-foundation/pact-node#pact-download-location)

```bash
"config": {
  "pact_binary_location": "node_modules/npm-pact-binaries"
},
```
Add the npm-pact-binaries to your devDependencies.
```bash
npm install -save-dev npm-pact-binaries
```
Now you can install pact-node without access to Github.

## Automated work

This project runs a travis cron daily, in this [url](https://travis-ci.org/vlaraort/npm-pact-binaries/builds).

When a new update is available, the pipeline generates a new version and automagically publish it to the NPM registry.

If it doesn't found a new version, the pipeline fails to avoid the publish script, so don't worry if you see failing jobs :)

## Thanks!

To all the PACT team, for creating this awesome tool! All credits belong to them.


## License
[MIT](https://choosealicense.com/licenses/mit/)
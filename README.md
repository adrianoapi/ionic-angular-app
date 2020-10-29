An example of consume a REST API using Ionic

## How to run this example

### With the Ionic CLI:

Run the command below to install the dependencies

```bash
$ npm install
```

Run the json server

```
$ json-server --watch API/data.json
```

Then, to run it in a Browser

```bash
$ ionic serve
```

Or to run it in a Device

Android

```bash
$ ionic cordova platform add android
$ ionic cordova run android
```

iOS

```bash
$ ionic cordova platform add ios
$ ionic cordova run ios
```
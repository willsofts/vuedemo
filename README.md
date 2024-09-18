# Vue Application Demonstration

This project introduce to use Vue 3 framework create single page application.

## How To Install

This project is under [@willsofts](https://github.com/willsofts) libraries protection as private access, then you have to gain access key from administrator and setting in your own environment before start installation. \
ex. \
Window

    set NPM_TOKEN=your access token key here

Linux

    export NPM_TOKEN=your access token key here

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Application Setting
In order to create new vue application using this prototype can do following step:

1. vue.config.js change 
    - indexPath 
    - outputDir
    - pages.index.entry -> xxxx999.js ex. demo002.js
    - pages.index.title
2. src folder change
    - App.vue -> AppXxxx999.vue ex. AppDemo002.vue
    - main.js -> xxxx999.js ex. demo002.js (depend on #1 pages.index.entry) \
        and change import App.vue -> AppXxxx999.vue too
    - AppXxxx999.vue try to change pid in PageHeader ex. pid="demo002"
3. edit .gitignore add output dir ex.
    /demo002
4. change package.json name = demo002


### How To Examine
1. start [vueserve](https://github.com/willsofts/vueserve) project 
    goto https://github.com/willsofts/vueserve
2. api try out, this is supported api that you have created ex. \
    curl -X POST http://localhost:8080/api/demo002/retrieve -d account=1-0-12345-6

In development mode you can setting environment before start up project

    set VALIDATE_TOKEN=false

or

    export VALIDATE_TOKEN=false

### Testing
1. Normally copy output folder after build success ex. demo002 into [vueserve](https://github.com/willsofts/vueserve) project under public path and then you can launch it directly ex. 

    http://localhost:8080/demo002/demo002.html

2. This can run serve or using file protocol testing but it must build with environment variables,
try to set below before startup build command.

```
    set VUE_APP_API_URL=http://127.0.0.1:8080
    set VUE_APP_BASE_URL=http://127.0.0.1:8080
```


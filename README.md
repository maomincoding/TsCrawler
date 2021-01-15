# TsCrawler
> TS crawler tool (TS 爬虫工具)

## 普通模式
```
npm run dev-t
```
## 组合模式
```
npm run dev-c
```
## 单例模式
```
npm run dev-s
```
## 生产模式
```
npm run build
```
## 生产模式（监听）
```
npm run dev:build-w
```
## 监听编译后js文件的变化

```
npm run dev:start
```

## 两条命令（监听TS与JS变化）并行执行

```
npm run dev
```
***
注：

1. 监听JS文件改变
```
npm install nodemon -D
```
nodemon配置
```json
  "nodemonConfig": {
    "ignore": [
      "data/*"
    ]
  },
```
2. 两个命令结合起来自动化编译。
```json
  "dev:build-w": "tsc -w",
  "dev:start": "nodemon node ./build/crawler.js"
```
3. 如果并行运行两条命令
```
npm install concurrently -D
```
`npm:dev:*` 表示运行`dev:`后任何字符的命令，如`"dev:start"`
```json
"dev":"concurrently npm:dev:*"
```

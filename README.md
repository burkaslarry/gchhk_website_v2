<p align="center">
  <a href="https://gchhk-website-v2.vercel.app">
    <img alt="GCCHK Website" src="https://i.imgur.com/qxZUMcW.png" width="689">
  </a>
</p>

# 草根文化館網站

> 草根文化館本會網站，定期推廣環保回收活動。網站主要由 Next.js and Notion 建立而成，方便打理。

## 簡介

此 Repo 項目提供完整網站架構和做法

內容管理由 Notion 提供修正系統由 Notion 提供，網存空間由 Vercel 提供，主要開發框架為 Next.js , [notion](https://http://notion.so), [Next.js](https://nextjs.org/),  [Vercel](https://vercel.com).  [Hotjar](http://hotjar.com).

## Setup 安裝設定

This project requires a recent version of Node.js (we recommend >= 16) and React (Version >=18.0).

1. Fork / clone this repo
2. Open CMD / Mac Temrinal. Redirect to your repositiry by command 

```bash
cd
```

3. Execute 

```bash
npm install
```

4. Execute 
```bash
npm run dev
``` 

to test locally
5. Execute 
```bash
npm run build
```  
to deploy to vercel 💪


6. Merge `develop` branch into `main` for conducting staged production and robust performance


指令表一覽 :

| 指令 | Description |
| --- | --- |
| `cd {path}` | 瀏覽文件集匯於指定路徑 e.g. `cd ~/Downloads/` |
| `git diff` | Show file differences that **haven't been** staged |
| `git status` | List all *new or modified* files |
| `git diff` | Show file differences that **haven't been** staged |
| `git status` | List all *new or modified* files |
| `git diff` | Show file differences that **haven't been** staged |


新增日誌 

1. 於Notion > Blog 頁面新增內容 https://www.notion.so/Blog-e1b300f237a7492e9bf8c10c57edd3ee

2. 抄下圈中 ID , 貼上 Notion > Database > Event record 上 

<img alt="GCCHK Website" src="https://i.ibb.co/H7VN4bJ/Screenshot-2024-01-15-at-10-46-54-PM.png" width="400">
    
出 blog 要 : 
1. title 有 字 , 
2. Blog Id 有  字 ,
3. publish  Date 有日期 ,  AND 
4. Gallery  要有 link


    <img alt="GCCHK Test" src="https://i.ibb.co/Tq0hHJX/Screenshot-2024-01-15-at-10-48-11-PM.png" width="400">

3.  於 Browser 上 行一次 Javascript Console , 抄下 Event ID

   <img alt="GCCHK Website" src="https://i.ibb.co/xJP2ntS/Screenshot-2024-01-15-at-11-37-48-PM.png" width="400">
4.  抄下 Event ID 於 貼上 Notion > Database > Event record 的 BlogId  一欄
5. 等待 15 minutes 
 


Safari 上清 Cache，可以閱覽最新內容 
<img alt="GCCHK Website" src="https://i.ibb.co/t3YDXyP/Screenshot-2024-09-14-at-10-52-12-PM.png" width="400">



#### Pricing Suggestion on Following Service:
Service level of all applied hosting and tracking tools are free of charge. 
Below shows the details of pricing plans for each service provider. 

###### Github 
https://github.com/pricing
Requires pricing for large-scale web applications and complete software lifecycle management.

###### Vercel
https://vercel.com/pricing
Requires pricing for large webhosting of 1TB size and top-tier email support for 100% website availability 

###### Hotjar
https://www.hotjar.com/pricing/?utm_source=kb
Requires pricing for in-depth tracking with user interactions e.g. click and scroll

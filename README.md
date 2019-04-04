# twtsnt

[![Build Status](https://dev.azure.com/Ayushh/twtsnt/_apis/build/status/heyAyushh.twtsnt?branchName=master)](https://dev.azure.com/Ayushh/twtsnt/_build/latest?definitionId=3&branchName=master)

> Tweets sentiment analysis on Twitter streams based on keywords,  
>Built on Azure Cognitive Services, npm Twit  socket.io & VueJS.
***
## Build it yourself

// Medium link to be attached
***
## Requirements
> Azure Subscription  
> Twittter Dev Account
> Azure DevOps
****
## Setup 
> Fill  .env file in ./server
```
consumer_key='',
consumer_secret='',
access_token='',
access_token_secret=''
textkey=''

```
> Change Socket Url acoordingly in line 11 ./web/src/

> Build web

```
// in ./web
npm run build
```
***
## RUN :rocket:
```
// in ./server
node index
```

* * * 
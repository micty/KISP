[TOC]

## 1、获取产品名片

**接口地址：**

*http://172.20.131.120/ServerCloud/vCRM/GetCardList*
	
**支持方法：Get/Post**

**参数：**	
> eid   企业号
skey    为搜索条件（模糊搜索title，author，itemName）
pageNo  当前页码
pageSize    每页记录数

**返回:**
``` json
{
	"code":200,
	"data":{
        "list":[
		    {
			    "cardId":4,
			    "title":"12312312",
			    "imgUrl":"",
			    "authorId":"123",
			    "author":"author",
			    "date":"2015-04-03",
			    "modifyDate":null,
			    "itemId":272,
			    "itemName":"itemname",
			    "content":"content"
		    },
		    {
			    "cardId":5,
			    "title":"12312312",
			    "imgUrl":"",
			    "authorId":"123",
			    "author":"author",
			    "date":"2015-04-03",
			    "modifyDate":null,
			    "itemId":272,
			    "itemName":"itemname",
			    "content":"content"
		    }
	    ],
        "total":"20"
    }
	"msg":""
}
```

**备注：**
>1、content为名片的明细，具体内容自定义。
2、code	成功为200，其他为出错；data	返回的内容；msg提示
3、data中list为记录数据，total为总记录数
（下同）

##2、新建产品名片

**接口地址：**
*http://172.20.131.120/ServerCloud/vCRM/CreateCard*

**支持方法：Get/Post**

**参数：**
>eid   企业号
data

data示例：
``` json
{
	"cardId":"1",
	"title":"12312312",
	"imgurl":"",
	"authorId":"123",
	"author":"author",
	"itemId":"272",
	"itemName":"itemname",
	"content":"content"
}
```

**返回：**
``` json
{
	"code":200,
	"data":null,
	"msg":""
}
```

##3、删除产品名片

**接口地址：**
*http://172.20.131.120/ServerCloud/vCRM/DeleteCard*

**支持方法：Get/Post**

**参数：**
>eid   企业号
cardid	  要删除的名片id
		
**返回：**
``` json
{
	"code":200,
	"data":null,
	"msg":""
}
```

##4、修改产品名片

**接口地址：**
*http://172.20.131.120/ServerCloud/vCRM/UpdateCard*

**支持方法：Get/Post**

**参数：**
>eid   企业号
data

data示例：
``` json
{
	"cardId":"1",
	"title":"12312312",
	"imgurl":"",
	"authorId":"123",
	"author":"author",
	"itemId":"272",
	"itemName":"itemname",
	"content":"content"
}
```
				
**返回：**
``` json
{
	"code":200,
	"data":null,
	"msg":""
}
```
**备注：**
>修改时，CardId不允许为0


##5、图片base64数据上传云端

**接口地址：**
*http://172.20.131.120/ServerCloud/vCRM/UploadPhoto*

**支持方法：Get/Post**

**参数：**
>eid   企业号
data

data示例：
``` json
[
    {
        "thumb":0,
        "base64":"base64数据"
    },
    {
        "thumb":0,
        "base64":"base64数据"
    }
    {
        "thumb":1,
        "base64":"base64数据"
    }
]
```
				
**返回：**
``` json
{
    "msg":"",
    "code":200,
    "data":[
        {
	        "url":"http://xxx.jpg",
	        "msg":""
        },
        {
	        "url":"http://xxx.jpg",
	        "msg":""
        },
        {
	        "url":"http://xxx.jpg",
	        "msg":""
        }
    ]
}
```
**备注：**
>修改时，CardId不允许为0

##6、获取上架商品列表

**接口地址：**
*kis.APP003177.uecrm.CRMController.GetUploadItemlist*

**支持方法：Post**

**参数：**
>"name": "",
"eid": "",
"secret": "",
"version": "",
"fromTag": "",
"url": "",
"openid": "",
"appid": "",
"pubacckey": "",
"timestamp": "",
"nonce": "",
"pubaccid": "",
"data": {data示例}

data示例：
``` json
[
    "Result": "",
    "ErrMsg": "",
    "AccountDB": "",
    "TotalPage": "",
    "CurrentPage": data.currentPage,
    "ItemsOfPage": data.ItemsOfPage,
    "Data": {
	    "skey":"",//过滤内容，代码，名称，规格型号
	    "type":""//0全部，1促销，2新品
	}
]

```
				
**返回：**
``` json
{
	"Result":"200",
	"ErrMsg":"",
	"AccountDB":null,
	"TotalPage":"1",
	"CurrentPage":"1",
	"ItemsOfPage":"10",
	"Data":{
		"itemlist":[
			{
				"imgurl":"",
				"itemid":"664",
				"model":"",
				"number":"17554369966",
				"name":"金蝶服务特价  KIS店铺标准版版升级包"
			}
		]
	}
}
```
**备注：**
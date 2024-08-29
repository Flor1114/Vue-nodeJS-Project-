module.exports = app =>{
    const router = require('express').Router()
    const mongoose = require('mongoose')
    const Article = mongoose.model('Article')
    const Category = mongoose.model('Category')
    const Hero = mongoose.model('Hero')
    //导入新闻
    router.get('/news/init',async (req,res)=>{
        const ParentCategory = await Category.findOne({
                name:'News Category'})
        const category = await Category.find().where({
            ParentCategory : ParentCategory
            }).lean()
        
        const newsTitles = ["Ake's Origin of Dreams Skin Out-of-Game Display Scene Revealed—Which One Will You Choose!","Village Glory | Huya Rural Sports Festival Putuo Liuheng Station Finals Conclude Perfectly","Snapdragon Esports Pioneer Tournament · 2024 Elite Invitational 'Honor of Kings' Project Is About to Launch!","Crazy Iron - Dragon Rhythm Out-of-Game Display Scene Poll Results Announced","Xiao Wang Studio Opens: Latest Development News, Subscribe for Exclusive Gifts!","August 8th Issue Fixes Version Update Announcement","Explanation of Abnormal Issues in the August 8th Version Update","August 8th Version Update Announcement","August 7th Anti-Cheat Special Announcement","August 7th 'Actor' Special Strike Announcement","Suzukaze Dream Prayer Event Announcement","'Qixi Love' Event Gradually Launches Announcement","[Destiny Reunion Benefits] Event Announcement","[Tacit Action] Limited Skin/Star Wish Announcement - First Ten Pulls for as Low as 1 Yuan!","Shao Siyan · When Destiny Begins Event Launch Announcement and FAQ"]
        const newsList = newsTitles.map(title=>{
        const randomCategory = category.slice(0).sort((a,b) => Math.random() - 0.5).slice(0,2)

            return{
                multipleCategories:randomCategory,
                title:title
            }
        })
        await Article.deleteMany({})
        await Article.insertMany(newsList)
        res.send(newsList)
    })
    //新闻入口
    router.get('/news/list',async(req,res)=>{

    //聚合分类
    const ParentCategory = await Category.findOne({
        name:'News Category'
    })
    const multipleCategories = await Category.aggregate([
        {$match:{ParentCategory : ParentCategory._id}},
        {$lookup:{
            from:'articles',
            localField:'_id',
            foreignField:'multipleCategories',
            as:'newsList'
            }
        },
        {
            $addFields:{
                newsList:{$slice:['$newsList',5]}
            }
        }
    ]) 
    const subCategories = multipleCategories.map(v => v._id)
    multipleCategories.unshift({
        name:'Popular',
        newsList: await Article.find().where({
            multipleCategories:{$in:subCategories}
        }).populate('multipleCategories').limit(5).lean()
    })
    multipleCategories.map(multipleCategories =>{
        multipleCategories.newsList.map(news =>{
            news.categoryName = (multipleCategories.name === 'Popular')
            ? news.multipleCategories[0].name : multipleCategories.name
            return news
        })
    })
     res.send(multipleCategories)
    })
    //导入英雄
    router.get('/heroes/init',async (req,res)=>{
        // await Hero.deleteMany({})
       const rawData = [
        {
            "categoryName": "Popular",
            "heroes": [
                {"name": "Angela", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg"},
                {"name": "Hou Yi", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg"},
                {"name": "Yao", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/505/505.jpg"},
                {"name": "Xiao Qiao", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/106/106.jpg"},
                {"name": "Marco Polo", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/132/132.jpg"},
                {"name": "Sun Shangxiang", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg"},
                {"name": "Great Commander", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/517/517.jpg"},
                {"name": "Dian Wei", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg"},
                {"name": "Luban No.7", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg"},
                {"name": "Daji", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg"}
            ]
        },
        {
            "categoryName": "Warrior",
            "heroes": [
                {"name": "Zhao Yun", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg"},
                {"name": "Mozi", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg"},
                {"name": "Zhong Wuyan", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg"},
                {"name": "Bian Que", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/119/119.jpg"},
                {"name": "Mi Yue", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg"},
                {"name": "Lü Bu", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg"},
                {"name": "Zhou Yu", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/124/124.jpg"},
                {"name": "Xiahou Dun", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg"},
                {"name": "Cao Cao", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/128/128.jpg"},
                {"name": "Dian Wei", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg"},
                {"name": "Dharma", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg"},
                {"name": "Xiang Yu", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/135/135.jpg"},
                {"name": "Old Master", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/139/139.jpg"},
                {"name": "Guan Yu", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/140/140.jpg"},
                {"name": "Hua Mulan", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg"},
                {"name": "Ukyo Tachibana", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg"},
                {"name": "Arthur", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"},
                {"name": "Liu Bei", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/170/170.jpg"},
                {"name": "Yang Jian", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/178/178.jpg"},
                {"name": "Athena", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/183/183.jpg"},
                {"name": "Nezha", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/180/180.jpg"},
                {"name": "Kai", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"},
                {"name": "Crazy Iron", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/503/503.jpg"},
                {"name": "Sun Ce", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg"},
                {"name": "Li Xin", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg"},
                {"name": "Chang'e", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg"},
                {"name": "Pangu", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/529/529.jpg"},
                {"name": "Yao", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/522/522.jpg"},
                {"name": "Ma Chao", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg"},
                {"name": "Charlotte", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/536/536.jpg"},
                {"name": "Lan", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/528/528.jpg"},
                {"name": "Si Kong Zhen", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/537/537.jpg"},
                {"name": "Yun Ying", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/538/538.jpg"},
                {"name": "Zhao Huaizhen", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/544/544.jpg"},
                {"name": "Ji Xiaoman", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/564/564.jpg"},
                {"name": "Allen", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/514/514.jpg"},
                {"name": "Haino", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/563/563.jpg"},
                {"name": "Great Commander", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/517/517.jpg"}
            ]
        },
        {
            "categoryName": "Mage",
            "heroes": [
                {"name": "Xiao Qiao", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/106/106.jpg"},
                {"name": "Mozi", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg"},
                {"name": "Daji", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg"},
                {"name": "Ying Zheng", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/110/110.jpg"},
                {"name": "Gao Jianli", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/115/115.jpg"},
                {"name": "Sun Bin", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg"},
                {"name": "Bian Que", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/119/119.jpg"},
                {"name": "Mi Yue", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg"},
                {"name": "Zhou Yu", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/124/124.jpg"},
                {"name": "Zhen Ji", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg"},
                {"name": "Wu Zetian", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/136/136.jpg"},
                {"name": "Diaochan", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg"},
                {"name": "Angela", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg"},
                {"name": "Luna", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg"},
                {"name": "Jiang Ziya", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg"},
                {"name": "Liu Bang", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/149/149.jpg"},
                {"name": "Wang Zhaojun", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/152/152.jpg"},
                {"name": "Zhang Liang", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/156/156.jpg"},
                {"name": "Mai Shiranui", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg"},
                {"name": "Cai Wenji", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/184/184.jpg"},
                {"name": "Zhuge Liang", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/190/190.jpg"},
                {"name": "Da Qiao", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/191/191.jpg"},
                {"name": "Donghuang Taiyi", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg"},
                {"name": "Gan Jiang and Mo Ye", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/182/182.jpg"},
                {"name": "Gui Guzi", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/189/189.jpg"},
                {"name": "Mengqi", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg"},
                {"name": "Nuwa", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/179/179.jpg"},
                {"name": "Yang Yuhuan", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg"},
                {"name": "Yi Xing", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/197/197.jpg"},
                {"name": "Milady", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/504/504.jpg"},
                {"name": "Sima Yi", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg"},
                {"name": "Shen Mengxi", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/312/312.jpg"},
                {"name": "Shangguan Wan'er", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg"},
                {"name": "Chang'e", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg"},
                {"name": "Yao", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/505/505.jpg"},
                {"name": "Xi Shi", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/523/523.jpg"},
                {"name": "Si Kong Zhen", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/537/537.jpg"},
                {"name": "Jin Chan", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/540/540.jpg"},
                {"name": "Sang Qi", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/534/534.jpg"},
                {"name": "Haiyue", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/521/521.jpg"},
                {"name": "Doria", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/159/159.jpg"},
                {"name": "Son of Yuanliu (Mage)", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/582/582.jpg"}
            ]
        },
        {
            "categoryName": "Tank",
            "heroes": [
                {"name": "Lian Po", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/105/105.jpg"},
                {"name": "Zhuang Zhou", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg"},
                {"name": "Liu Shan", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg"},
                {"name": "Zhong Wuyan", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg"},
                {"name": "Bai Qi", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/120/120.jpg"},
                {"name": "Lü Bu", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg"},
                {"name": "Xiahou Dun", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg"},
                {"name": "Dharma", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg"},
                {"name": "Xiang Yu", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/135/135.jpg"},
                {"name": "Guan Yu", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/140/140.jpg"},
                {"name": "Cheng Yaojin", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg"},
                {"name": "Liu Bang", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/149/149.jpg"},
                {"name": "Arthur", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"},
                {"name": "Bull Demon King", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg"},
                {"name": "Zhang Fei", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg"},
                {"name": "Zhong Kui", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg"},
                {"name": "Taiyi Zhenren", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg"},
                {"name": "Nezha", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/180/180.jpg"},
                {"name": "Kai", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"},
                {"name": "Su Lie", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg"},
                {"name": "Mengqi", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg"},
                {"name": "Crazy Iron", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/503/503.jpg"},
                {"name": "Sun Ce", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg"},
                {"name": "Shield Mountain", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/509/509.jpg"},
                {"name": "Zhu Bajie", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/511/511.jpg"},
                {"name": "Luban Master", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/525/525.jpg"},
                {"name": "Meng Tian", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/527/527.jpg"},
                {"name": "Allen", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/514/514.jpg"},
                {"name": "Son of Yuanliu (Tank)", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/581/581.jpg"}
            ]
        },
        {
            "categoryName": "Assassin",
            "heroes": [
                {"name": "Zhao Yun", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg"},
                {"name": "Akke", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/116/116.jpg"},
                {"name": "Miyamoto Musashi", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/130/130.jpg"},
                {"name": "Li Bai", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/131/131.jpg"},
                {"name": "Luna", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg"},
                {"name": "Han Xin", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg"},
                {"name": "King of Lanling", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/153/153.jpg"},
                {"name": "Mai Shiranui", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg"},
                {"name": "Nakoruru", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/162/162.jpg"},
                {"name": "Ukyo Tachibana", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg"},
                {"name": "Sun Wukong", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"},
                {"name": "Athena", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/183/183.jpg"},
                {"name": "Baili Shouyue", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg"},
                {"name": "Baili Xuance", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/195/195.jpg"},
                {"name": "Pei Qinhu", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg"},
                {"name": "Yuan Song", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/125/125.jpg"},
                {"name": "Sima Yi", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg"},
                {"name": "Yun Zhongjun", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg"},
                {"name": "Yao", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/522/522.jpg"},
                {"name": "Jing", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/531/531.jpg"},
                {"name": "Lan", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/528/528.jpg"},
                {"name": "Yun Ying", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/538/538.jpg"},
                {"name": "Fei", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/542/542.jpg"}
            ]
        },
        {
            "categoryName": "Marksman",
            "heroes": [
                {"name": "Sun Shangxiang", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg"},
                {"name": "Luban No.7", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg"},
                {"name": "Marco Polo", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/132/132.jpg"},
                {"name": "Di Renjie", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/133/133.jpg"},
                {"name": "Hou Yi", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg"},
                {"name": "Li Yuanfang", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/173/173.jpg"},
                {"name": "Yu Ji", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/174/174.jpg"},
                {"name": "Genghis Khan", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/177/177.jpg"},
                {"name": "Huang Zhong", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/192/192.jpg"},
                {"name": "Baili Shouyue", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg"},
                {"name": "Gongsun Li", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/199/199.jpg"},
                {"name": "Galo", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/508/508.jpg"},
                {"name": "Meng Yao", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/524/524.jpg"},
                {"name": "Agu Duo", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/533/533.jpg"},
                {"name": "Ailun", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/155/155.jpg"},
                {"name": "Goya", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/548/548.jpg"},
                {"name": "Laixio", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/545/545.jpg"},
                {"name": "Ao Yin", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/519/519.jpg"}
            ]
        },
        {
            "categoryName": "Support",
            "heroes": [
                {"name": "Zhuang Zhou", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg"},
                {"name": "Liu Shan", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg"},
                {"name": "Sun Bin", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg"},
                {"name": "Bull Demon King", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg"},
                {"name": "Zhang Fei", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg"},
                {"name": "Zhong Kui", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg"},
                {"name": "Cai Wenji", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/184/184.jpg"},
                {"name": "Taiyi Zhenren", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg"},
                {"name": "Da Qiao", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/191/191.jpg"},
                {"name": "Donghuang Taiyi", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg"},
                {"name": "Gui Guzi", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/189/189.jpg"},
                {"name": "Su Lie", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg"},
                {"name": "Ming Shiyin", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/501/501.jpg"},
                {"name": "Shield Mountain", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/509/509.jpg"},
                {"name": "Yao", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/505/505.jpg"},
                {"name": "Luban Master", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/525/525.jpg"},
                {"name": "Sang Qi", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/534/534.jpg"},
                {"name": "Doria", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/159/159.jpg"},
                {"name": "Shao Siyuan", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/577/577.jpg"}
            ]
        }
    ]
        for(let item of rawData){
            if (item.categoryName ==='Popular'){
                continue
            }
            //找到当前分类的数据
            const heroCategory = await Category.findOne({
                name:item.categoryName
            })
            item.heroes = item.heroes.map(hero => {
                hero.Category = [heroCategory]
                
                return hero
            })
            //录入英雄
           
            await Hero.insertMany(item.heroes)
        }
        res.send(await Hero.find())
    })
    //英雄入口
    router.get('/heroes/list',async(req,res)=>{
        const ParentCategory = await Category.findOne({
            name:'Hero'
        })
        const multipleCategories = await Category.aggregate([
            {$match:{ParentCategory : ParentCategory._id}},
            {$lookup:{
                from:'heroes',
                localField:'_id',
                foreignField:'Category',
                as:'heroList'
                }
            }
        ])
            const subCategories = multipleCategories.map(v=>v._id)
            multipleCategories.unshift({
                name:'Popular',
                heroList: await Hero.find().where({
                Category:{$in:subCategories}
                }).populate('Category').limit(10).lean()
            })
           
        res.send(multipleCategories)
      
    })
    //新闻详情
    router.get('/articles/:id',async(req,res)=>{
        const articleDetails = await Article.findById(req.params.id).lean()
        articleDetails.relateArticle= await Article.find().where({
            multipleCategories:{$in:articleDetails.multipleCategories}
        }).limit(2)
        res.send(articleDetails)
    })
    //英雄详情
    router.get('/heroes/:id',async(req,res)=>{
        const heroDetails = await Hero.findById(req.params.id)
        .populate('Category')
        .populate('summonerSpells')
        .populate('recommendedRunes')
        .populate('aheadEquipments')
        .populate('BehindEquipemnt')
        .populate({
            path: 'recommendedRunes',
            populate: {
              path: 'effect.name',
              model: 'Runeattribute'
            }
          })
        .populate({
            path: 'theBestPartners.hero', // 填充 partners 中 hero 的详细信息
            select: 'name avatar title' // 选择需要的字段，避免返回所有数据
        })
        .populate({
            path: 'counteredByWhom.hero', // 填充 partners 中 hero 的详细信息
            select: 'name avatar title' // 选择需要的字段，避免返回所有数据
        })
        .populate({
            path: 'countered.hero', // 填充 partners 中 hero 的详细信息
            select: 'name avatar title' // 选择需要的字段，避免返回所有数据
        })
        .lean();
        if(heroDetails.mainSkillUpgrade && heroDetails.secondarySkillUpgrade){
            const mainSkill = heroDetails.skills.find(skill => 
                skill._id.equals(heroDetails.mainSkillUpgrade))
                const secondarySkill = heroDetails.skills.find(skill => 
                    skill._id.equals(heroDetails.secondarySkillUpgrade))
            heroDetails.mainSkillUpgrade = mainSkill;
            heroDetails.secondarySkillUpgrade = secondarySkill;
        };
        res.send(heroDetails)

    })
 
    app.use('/web/api',router)
}
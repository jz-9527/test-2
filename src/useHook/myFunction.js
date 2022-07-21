import { httpPost, httpGet } from "../api/request"
export function requestLimits(list, num) {
    var arr = [...list];//请求池
    var pool = [];//并发池
    var resList = [];//结果池
    // var timer = null;

    function start() {
        //刚开始先塞满并发池
        while (pool.length < num) {
            //通过截取的方式保证不会重复执行请求
            let obj = arr.shift();
            //执行任务
            setTask(obj);
        }
        //用promise.race()监听并发池的执行情况
        let race = Promise.race(pool);
        run(race);


    }
    function run(race) {
        race.then(() => {
            if (arr.length !== 0) {
                //每当并发池跑完一个任务，就再塞入一个任务
                let url = arr.shift();
                //执行新的任务
                setTask(url);
                //回调继续监听
                return run(Promise.race(pool));
            }
        })
    }
    function setTask(obj) {
        //如果请求池截取不出内容了，就直接结束掉
        if (!obj) return;
        let task = null;
        //根据参数判断是调用get请求还是post请求
        if (obj.methods === "POST") {
            task = httpPost(obj.api)
        } else {
            task = httpGet(obj.api)
        }
        //放进并发池
        pool.push(task)
        //执行结束
        task.then((res) => {
            //从并发池删除
            pool.splice(pool.indexOf(task), 1);
            //放进结果池
            resList.push(res);
            //这里想用个函数防抖返回请求结果数组的，能获取到但是这里return不出去
            // if (timer) {
            //     clearTimeout(timer);
            // }
            // timer = setTimeout(() => {
            //     console.log(res)
            //     return resList;
            // }, 5000)
        })
    }
    start();
}


// export class TaskWork {
//     constructor(list = [], num = 2) {
//         this.list = list;
//         this.num = num;
//         list.length > 0 && this.sequencePromise(list)
//     }
//     addTask(task) {
//         this.list.push(task)
//         if (this.list.length == 1) {
//             this.sequencePromise(this.list)
//         }
//     }
//     async sequencePromise(list) {
//         const task = list.shift()
//         if (task) {
//             const res = await task(task)
//             this.sequencePromise(list)
//         }
//     }
//     task(obj) {
//         //如果请求池截取不出内容了，就直接结束掉
//         if (!obj) return;
//         let task = null;
//         //根据参数判断是调用get请求还是post请求
//         if (obj.methods === "POST") {
//             task = httpPost(obj.api)
//         } else {
//             task = httpGet(obj.api)
//         }
//         //放进并发池
//         pool.push(task)
//         //执行结束
//         task.then((res) => {
//             //从并发池删除
//             pool.splice(pool.indexOf(task), 1);
//             //放进结果池
//             resList.push(res);

//         })
//     }
// }

export class Limits {
    constructor() {
        this.requestList = [];//请求池
        this.pool = [];//并发池
        this.resList = [];//结果池
    }
    start(arr, count) {
        this.requestList = [...arr];
        while (this.pool.length < count) {
            let request = this.requestList.shift();
            this.setTask(request)
        }
        let status = Promise.race(this.pool);
        this.run(status);

    }
    run(status) {
        status.then(() => {
            if (this.requestList.length != 0) {
                let request = this.requestList.shift();
                this.setTask(request)
                return this.run(Promise.race(this.pool))
            }
           
        })
    }
    setTask(request) {
        if (!request) return;
        let task = null;
        if (request.methods === "POST") {
            task = httpPost(request.api)
        } else {
            task = httpGet(request.api)
        }
        this.pool.push(task)
        task.then((res) => {
            this.pool.splice(this.pool.indexOf(task), 1);
            this.resList.push(res)
        })
    }
    getAll() {
        return Promise.allSettled(this.pool).then(() => {
            return Promise.allSettled(this.pool).then(()=>this.resList);
        })

    }
}


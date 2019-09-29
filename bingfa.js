function sendRequest(arr, max, callback) {
        let fetchArr = [],  // 存储并发max的promise数组
            i = 0;

        function toFetch() {
            if (i === arr.length) {   // 所有的都处理完了， 返回一个resolve
                return Promise.resolve();
            }

            let one = fetch(arr[i++]); // 取出第i个url， 放入fetch里面 , 每取一次i++
            one.then( () => {fetchArr.splice(fetchArr.indexOf(one), 1)}); // 当promise执行完毕后，从数组删除
            fetchArr.push(one);  //将当前的promise存入并发数组中       其实将这个push放到上一行会更好理解，那样就是我们同步的思维顺序，先push进去，再等promise执行完了之后再删除。  但由于then是异步的，所以怎么放都可以。

            let p = Promise.resolve();
            if (fetchArr.length >= max) {     // 当并行数量达到最大后， 用race比较 第一个完成的， 然后再调用一下函数自身。
                p = Promise.race(fetchArr);
            }
            return p.then(() => toFetch());
        }
        
        // arr循环完后， 现在fetchArr里面剩下最后max个promise对象， 使用all等待所有的都完成之后执行callback
        toFetch().then(() => Promise.all(fetchArr)).then(() => {
            callback();
        })
}

// 冒泡
const init = () => {
  // 从小到大
  ; (() => {
    const ARR = [1, 3, 2, 7, 3, 4, 5, 1, 2, 3, 8, 4, 5, 9, 0, 3, 4, 5, 2, 1, 9, 4, 2, 7, 3, 4, 5, 1, 2, 3, 8, 1]
    const LENGTH = ARR.length
    let tmp = []
    console.time()
    for (let i = 0; i < LENGTH; i++) {
      let isHave = false
      for (let j = 0; j < tmp.length; j++) {
        if (ARR[i] <= tmp[j]) {
          isHave = true
          tmp.splice(j, 0, ARR[i])
          break
        }
      }
      if (!isHave) {
        tmp.push(ARR[i])
      }
    }
    console.timeEnd()
    console.log(tmp)
  })()

  ;(() => {
    const arr = [1, 3, 2, 7, 3, 4, 5, 1, 2, 3, 8, 4, 5, 9, 0, 3, 4, 5, 2, 1, 9, 4, 2, 7, 3, 4, 5, 1, 2, 3, 8, 1]
    const LENGTH = arr.length
    console.time()
    for(let i = 0; i < LENGTH; i++) {
      for (let j = 0; j < LENGTH - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          var tmp = arr[j + 1]
          arr[j + 1] = arr[j]
          arr[j] = tmp
        }
      }
    }
    console.timeEnd()
    console.log(arr)
  })()
}

setTimeout(() => {
  init()
}, 0)

const paginationBev = Behavior({
 data: {
  searchResults: [],
  loading: false, //加载更多图标
  temp: false //返回空数据
 },
 methods: {
  //合并数据
  concatResult(result) {
   const newResults = this.data.searchResults.concat(result);
   this.setData({
    searchResults: newResults
   })
  },
  // 是否重新搜索
  reSearch() {
   this.setData({
    searching: true,
    q: null,
    searchResults: [],
    total: 0,
    temp:false
   })
  },
  //判断是否加载完成
  isMore() {
   //如果显示现在在页面上的数据大于总数则加载完成；如果以返回的数据为null则不准确比如断网的时候
   if (this.data.searchResults.length >= this.data.total) {
    return false;
   } else {
    return true;
   }
  },
  //显示加载图标
  loading() {
   if (this.data.loading) {
    this.setData({
     loading: false
    })
   } else {
    this.setData({
     loading: true
    })
   }
  },
  //无数据
  noData(res) {
   if (!res.length) {
    this.setData({
     temp: true
    })
   }else{
    this.setData({
     temp: false
    })
   }
  }
 }
})
export {
 paginationBev
}
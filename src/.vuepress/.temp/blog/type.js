export const typesMap = JSON.parse("{\"article\":{\"/\":{\"path\":\"/article/\",\"indexes\":[13,0,8,7,6,16,17,9,10,11,12,14,15,36,1,2,3,4,5]},\"/zh/\":{\"path\":\"/zh/article/\",\"indexes\":[31,18,26,25,24,34,35,27,28,29,30,32,33,37,19,20,21,23,22]}},\"star\":{\"/\":{\"path\":\"/star/\",\"indexes\":[9,13,14,0]},\"/zh/\":{\"path\":\"/zh/star/\",\"indexes\":[27,31,32,18]}},\"timeline\":{\"/\":{\"path\":\"/timeline/\",\"indexes\":[13,8,7,6,16,17,9,10,11,12,14,15,0]},\"/zh/\":{\"path\":\"/zh/timeline/\",\"indexes\":[31,26,25,24,34,35,27,28,29,30,32,33,18]}}}");

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogType)
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ typesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogType(typesMap);
  });


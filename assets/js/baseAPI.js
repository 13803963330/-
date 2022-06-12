$.ajaxPrefilter((option) => {
  // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
  console.log(option);
  option.url = `http://big-event-api-t.itheima.net` + option.url;
  if (option.url.includes("/my/")) {
    option.headers = {
      Authorization: localStorage.getItem("token"),
    };
  }
  //权限校验
  option.complete = (res) => {
    console.log(res);
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === "身份认证失败！"
    ) {
      localStorage.removeItem("token");
      //跳转登陆页面
      location.href = "/login.html";
    }
  };

 
});

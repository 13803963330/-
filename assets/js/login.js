$(function () {
  $("#link_reg").click(() => {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  $("#link_login").click(() => {
    $(".login-box").show();
    $(".reg-box").hide();
  });

  // 从 LayUI 中获取 form 对象
  const form = layui.form;

  // 通过 form.verify() 方法自定义校验规则
  form.verify({
    // 自定义一个的校验规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    // 校验两次密码是否一致的规则
    repwd: (val) => {
      // 如果判断失败,则return一个提示消息即可
      const pwd = $(".reg-box [name=password").val();
      if (pwd !== val) return "两次密码不一致";
    },
  });

  //基本路径
  // const baseUrl = "http://www.liulongbin.top:3007";

  $("#form_reg").submit((e) => {
    e.preventDefault();
    //发起注册请求
    $.ajax({
      type: "POST",
      url: "/api/reguser",
      data: {
        username: $("#form_reg [name=username]").val(),
        password: $("#form_reg [name=password]").val(),
      },
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg("注册成功");
        $("#link_login").click();
      },
    });
  });
  //登陆请求
  $("#form_login").submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/api/login",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg("登陆失败");
        layer.msg("登陆成功");
        //token存储本地
        localStorage.setItem("token", res.token);
        //跳转首页
        location.href = "/index.html";
      },
    });
  });
});
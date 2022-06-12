$(function () {
  //获取分类列表

  const initArtCateList = () => {
    $.ajax({
      type: "GET",
      url: "/my/article/cates",
      success: (res) => {
        if (res.status !== 0) return layer.msg("获取文章分类列表失败");
        const htmlStr = template("tpl-table", res);
        $("tbody").empty().html(htmlStr);
      },
    });
  };
  initArtCateList();
  // const layer = layui.layer;

  let indexAdd = null;
  $("#btnAddCate").click(() => {
    indexAdd = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "添加文章分类",
      content: $("#dialog-add").html(),
    });
  });
  //添加
  $("body").on("submit", "#form-add", function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/article/addcates",
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg("新增分类失败！");
        layer.msg("新增分类成功！");
        initArtCateList();
        //关闭弹窗
        layer.close(indexAdd);
      },
    });
  });
  //委托添加编辑功能
  const form = layui.form;
  let indexEdit = null;
  $("tbody").on("click", ".btn-edit", function () {
    // console.log(11);
    // console.log(id);
    // 弹出修改文章分类的弹窗
    indexEdit = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "修改文章分类",
      content: $("#dialog-edit").html(),
    });
    const id = $(this).attr("data-id");
    $.ajax({
      method: "GET",
      url: "/my/article/cates/" + id,
      success: function (res) {
        console.log(1);
        if (res.status !== 0) return layer.msg("获取文章分类数据失败");
        form.val("form-edit", res.data);
      },
    });
  });
  // 更新文章分类
  $("body").on("submit", "#form-edit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/article/updatecate",
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) {
          return layer.msg("更新分类数据失败！");
        }
        layer.msg("更新分类数据成功！");
        layer.close(indexEdit);
        initArtCateList();
      },
    });
  });
  $("tbody").on("click", ".btn-delete", function () {
    const id = $(this).attr("data-id");
    layer.confirm("确定删除吗？", { icon: 3, title: "提示" }, (index) => {
      $.ajax({
        method: "GET",
        url: "/my/article/deletecate/" + id,
        success: function (res) {
          if (res.status !== 0) return layer.msg("删除分类失败！");
          layer.msg("删除分类成功！");
          layer.close(index);
          initArtCateList();
        },
      });
    });
  });
});

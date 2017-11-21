/**
 * Created by huangyalan on 2017/11/21.
 */
//进行表单验证
$(function () {
  var $form=$("form");
  $form.bootstrapValidator({
    //配置图标
    feedbackIcons: {
      //校验成功的图标
      valid: 'glyphicon glyphicon-ok',
      invalid:'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //配置校验规则
    fields:{
      username:{
        validators:{
          notEmpty:{
            message:"用户名不能为空"
          },
          callback:{
            message:"用户名不存在"
          }
        }
      },
      password:{
        validators:{
          notEmpty:{
            message:"密码不能为空"
          },
          stringLength:{
            min:6,
            max:12,
            message:"密码长度是6-12位"
          },
          callback:{
            message:"密码错误"
          }
        }
      }
    }
  });
  //需要给表单注册成功事件
  $form.on("success.form.bv",function (e) {
    //阻止浏览器默认行为
    e.preventDefault();
    //发送ajax
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      //表单序列化
      data:$form.serialize(),
      success:function (data) {
        if(data.submit) {
          location.href = "index.html";
        }else if(data.error===1000){
          $form.data("bootstrapValidator").updateStatus("username","INVALID","callback");
        }else if(data.error===1001){
          $form.data("bootstrapValidator").updateStatus("password","INVALID","callback");
        }
      }
    });
  });
});

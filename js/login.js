$(function () {
    // tabSwicth
    let phoneTabcont = $(".tabContentPhone");
    let accountTabcont = $(".tabContentAccount");
    $("ul.tabBoxSwitchUl").on('click', 'li', function () {
        let i = $(this).index();
        // $(this).attr("data-id",i);
        // console.log(i);
        $(this).addClass("tab-active").siblings('li').removeClass("tab-active");
        $("div.tabcont").eq(i).addClass("active").siblings().removeClass("active");

        // let module;//smsFrom accountFrom
        formType(i);
    });

    function formType(i) {
        if (i == 0) {
            $("form").attr("data-module", "smsFrom");
            $("form button.voice-btn").attr("data-btn", "sms-voice-btn").text("接收语音验证码");
            $("form button.out-login-btn").hide();
            $("form button.fromSubmit").attr("data-type", "smsSubmit").text("注册/登录");

        } else if (i == 1) {
            $("form").attr("data-module", "accountFrom");
            $("form button.voice-btn").attr("data-btn", "account-forget-btn").text("忘记密码");
            $("form button.out-login-btn").show();
            $("form button.fromSubmit").attr("data-type", "accountSubmit").text("登录");
            forgeClick();
        }
    }
    // 密码登录：海外手机/账号
    $("button[data-clilck='isClick']").click(function (e) {
        e.preventDefault();
        let _this = $(this);
        let _show = $(".login-out-phoneBox");
        if (_show.is(':hidden')) {
            _show.show()
            _this.text("邮箱账号登录");
        } else {
            _show.hide()
            _this.text("海外手机号登录");

        }
    });
    // 忘记密码点击
    // 语音服务
    $("button[data-btn='sms-voice-btn']").click(function (e) {
        e.preventDefault;
        console.log("语音服务");
    });
    var forgeClick = function () {
        $("button[data-btn='account-forget-btn']").click(function (e) {
            e.preventDefault;
            // window.open("http://www.baidu.com");//忘记密码页面
            alert("前往忘记密码页");
        });
    }


    $("button.selectBtn").click(function (e) {
        if ($(".selectConentent").is(':hidden')) {
            $(".selectConentent").show();

        } else {
            $(".selectConentent").hide();
        }
        $(document).one('click', function () {
            $(".selectConentent").hide();
        });
        e.stopPropagation();
    });
    $(".selectConentent").on('click', function (e) {
        e.stopPropagation();
    })
    // 国际区号json
    $.ajax({
        type: "GET",
        url: "../js/selectOptions.json",
        data: "data",
        dataType: "JSON",
        success: function (data) {
            // console.log(data);
            $.each(data.CountryNum, function (i, item) {
                // console.log(item.countryName, item.number);
                let btns = " <button class='phone-btn selectBtn select-option' type='button' data-type='option'" + "data-id=" + i + ">" + item.countryName + "   " + item.number + "</button>";
                $(".selectOptions").append(btns);
                chooseBtn();
                // console.log(btns);
            });
        }
    });


    function chooseBtn() {
        $("button[data-type='option']").each(function () {
            $(this).click(function () {
                let txt = $(this).text();
                $("button[data-type='selected']").attr("data-fid", $(this).index());
                $("button[data-type='selected'] span").text(txt);
                $(".selectConentent").hide();
                $(".selectOptions").scrollTop($(this).index() * 40);
            });
            $(this).hover(function () {
                $(this).css("background-color", "#f6f6f6");
            }, function () {
                $(this).css("background-color", "#ffffff");
            });
        });
    };




    //失去焦点;获得焦点     

    Focuss($(".msgInput"), "输入 6 位短信验证码");
    Focuss($(".phoneInput"), "手机号");
    Focuss($(".accountUsername"), "手机号或邮箱");
    Focuss($(".accountPwd"), "密码");

    Blurr($(".phoneInput"), "请输入手机号");
    Blurr($(".msgInput"), "请输入短信验证码");
    Blurr($(".accountUsername"), "请输入手机号或邮箱");
    Blurr($(".accountPwd"), "请输入密码");



    function Focuss(ele, content) {
        ele.focus(function (e) {
            e.preventDefault();
            let _this = $(this);
            _this.parent().removeClass('isShow');
            _this.attr("placeholder", content);
        })
    }

    function Blurr(eleb, contentb) {
        eleb.blur(function (e) {
            e.preventDefault();
            let _this = $(this);
            if (_this.val() == null || _this.val() == "" || _this.val() == undefined) {
                // let content = "请输入短信验证码"
                _this.parent().addClass('isShow').attr('data-content', contentb);
                _this.attr("placeholder", " ");
            } else {
                _this.parent().removeClass('isShow');
            }
        })
    }

    // 60s倒计时
    $(".msgBtn").click(function () {
        let pval = $(".phoneInput").val();
        if (pval == "" || pval == null || pval == undefined) {
            $(".msgBtn").text("重新发送短信验证码");
            let content = "请输入手机号";
            $(".phoneInput").parent().addClass('isShow').attr('data-content', content);
            $(".phoneInput").attr("placeholder", " ");
        } else {
            $(".msgBtn").css("color", "#b7b7b7");
            $(".msgBtn").attr("disabled", true);
            getRandom();
        }
        // getRandom();

    })

    var time = 60;
    function getRandom() {
        if (time === 0) {
            $(".msgBtn").text("发送短信验证码");
            $(".msgBtn").css("color", "#175199");
            $(".msgBtn").attr("disabled", false);
            return
        } else {
            time--;

            $(".msgBtn").text(time + " 秒后可重发");
        }
        setTimeout(function () {
            getRandom();
        }, 1000)

    }
    // ercode tab
    $(".swicth-ercode").click(function (e) {
        e.preventDefault();
        $("form#form_key").hide();
        $(".ercodeSignBox").show();
        makeCode();
    });
    $(".switch-input").click(function (e) {
        e.preventDefault();
        $("form#form_key").show();
        $(".ercodeSignBox").hide();
    });

    //ercode

    var qrcode = new QRCode('qrcode', {
        text: 'your content',
        width: 150,
        height: 150,
        colorDark: '#0084ff',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });
    function makeCode() {
        qrcode.clear();
        let txt = '';
        qrcode.makeCode(txt);
    }

    // 提交表单验证

});
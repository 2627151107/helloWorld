/**
 * Created by 沙建祥 on 2016/10/26.
 */
var currentPage = 1;
var tagType = ['全部', '寄件人', '收件人', '全部'];
Address = {};
var xzqArr = [];

function init() {
	getContact();
}
$("#addrbookPage").delegate("a.a-page-num", "click", function() {
	currentPage = $(this).text();
	getContact();
}).delegate("a.a-pre", "click", function() {
	currentPage--;
	getContact();
}).delegate("a.a-next", "click", function() {
	currentPage++;
	getContact();
});

/* function initProvinceOrCity(type) {
	var getType = type || 'province';
	var collects = type === 'city' ? calcCity() : area.province;
	var selectIndex = 0;
	domFragment = document.createDocumentFragment(),
		select = document.getElementById(getType);
	for (var i = 0, len = collects.length; i < len; i++) {
		var dom = new Option(collects[i].name, collects[i].code);
		if (xzqArr[1] && xzqArr[1] == collects[i].name) {
			selectIndex = i;
		}
		domFragment.appendChild(dom);
	}
	select.innerHTML = '';
	select.appendChild(domFragment);
	$(select).find("option").eq(selectIndex).prop("selected", true);
	$(select).change();
} */

/* function calcCity() {
	var provinceCode = $('#province').val().substring(0, 2),
		city = [],
		cities = area.city;
	for (var i in cities) {
		if (cities[i].code.substring(0, 2) === provinceCode) {
			city.push(cities[i]);
		}
	}
	return city;
} */

/* function getDistrict() {
	var cityCode = $('#city').val();
	var selectIndex = 0;
	$.ajax({
		type: "POST",
		contentType: "application/x-www-form-urlencoded;charset=utf-8",
		url: "/network/www/searchapi.do?method=getcounty",
		data: "city=" + cityCode,
		dataType: "json",
		success: function(res) {
			var district = $('#district').empty(),
				html = '';
			if (res.length > 0) {
				for (var i = 0, len = res.length; i < len; i++) {
					html += '<option value="' + res[i].number + '">' + res[i].name + '</option>';
				}
				district.append(html).append('<option value="">暂不选择</option>').show(); //直接到 县区
			} else {
				district.hide();
			}
			if (xzqArr[2] || xzqArr[1]) {
				$('#district option').each(function(index, el) {
					if ($(this).text() == xzqArr[2] || $(this).text() == xzqArr[1]) {
						$(this).prop('selected', 'selected')
					}
				});
			}
		}
	});
} */
//寄件人地址
function getContact() {
	var type = $("#addrbookTable").data("type");
	var table = $("#addrbookTable tbody");
	var html =
		"<tr><td colspan=\"7\"><div class=\"table-td-box\" style='text-align:center;'>读取数据中，请稍候片刻...</div></td></tr>";
	table.empty();
	table.html(html);
	$.ajax({
		type: "post",
		url: "/user/userapi.do",
		data: "method=getaddressbook&type=" + type + "&page=" + currentPage + "&size=10",
		dataType: "json",
		success: function(resultJson) {
			if (resultJson.status == 200) {
				if (resultJson.addressBooks.length > 0) {
					table.empty();
					for (var i in resultJson.addressBooks) {
						var html = '';
						var tr = $('<tr></tr>');
						tr.data(resultJson.addressBooks[i]);
						html += '<td class="col2"><span class="row">' + resultJson.addressBooks[i].name +
							'</span>';
						if (+resultJson.addressBooks[i].isDefault === 1) {
							html += '<span class="row fontgray">[默认地址]</span>';
						}
						html += '</td><td class="col3">';
						html += resultJson.addressBooks[i].phone ? '<span class="row">' + resultJson
							.addressBooks[i].phone + '</span>' : '';
						html += resultJson.addressBooks[i].fixedPhone ? '<span class="row">' + resultJson
							.addressBooks[i].fixedPhone + '</span>' : '';
						html += '</td>';
						html += '<td class="col5"><span class="row">' + resultJson.addressBooks[i].xzqName +
							'</span><span class="row">' + resultJson.addressBooks[i].address +
							'</span></td>';
						html += '<td>' + (tagType[+resultJson.addressBooks[i].tag]) + '</td>';
						html +=
							'<td class="col4 center"><a href="#" handle="edit">编辑</a>&nbsp;&nbsp;<a href="#" class="fontred" handle="del">删除</a></td>';
						tr.append(html);
						table.append(tr);
					}
					$("#addrbookPage").html(getPage(currentPage, resultJson.countPage));
				} else {
					if (type == "2") {
						html =
							"<tr><td colspan='5'><div class=\"table-td-box\" style='text-align:center;'>您的收寄件人通讯录为空</div></td></tr>";
					} else {
						html =
							"<tr><td colspan='5'><div class=\"table-td-box\" style='text-align:center;'>您的收寄件人通讯录为空</div></td></tr>";
					}

					$("#addrbookPage").html("");
					table.html(html);
				}
			} else if (resultJson.status == 403) {
				login();
			} else {
				if (type == "2") {
					html = "<tr><td><div class=\"table-td-box\">获取寄件人地址失败，请稍后再试！</div></td></tr>";
					$("#errorTips").show().html("获取寄件人地址失败，请稍后再试！");
				} else {
					html = "<tr><td><div class=\"table-td-box\">获取收件人地址失败，请稍后再试！</div></td></tr>";
					$("#errorTips").show().html("获取收件人地址失败，请稍后再试！");
				}
				errorTips();
				table.html(html);
			}
		}
	});
}

/* function saveAddress(type) {
	var data = {
		method: type == 'add' ? 'saveaddressbook' : 'editaddressbook',
		xzqName: $('#province option:selected').text() + $('#city option:selected').text() + ($(
			'#district option:selected').text() != "暂不选择" ? $('#district option:selected').text() : ""),
		address: $('#address').val(),
		name: $('#name').val(),
		phone: $('#phone').val(),
		fixedPhone: $('#fixphone').val(),
		postcode: $('#postcode').val(),
		isDefault: +$('#isdefault').is(":checked")
	}
	type == 'edit' && (data.id = $('table').data('edit-id')); //编辑地址id
	$.ajax({
		type: "post",
		url: "/user/userapi.do",
		data: data,
		dataType: "json",
		success: function(resultJson) {
			if (resultJson.status == 200) {
				location.reload();
			} else if (resultJson.status == 403) {
				login();
			} else {
				$('#error-message').text(type == 'add' ? '添加地址失败，请稍后再试！' : '地址修改失败，请稍后再试！');
			}
		}
	});
}
 */
function delAddress() {
	$.ajax({
		type: "post",
		url: "/user/userapi.do",
		data: {
			method: 'deladdressbook',
			id: $('#delDialog').data('dom-del')
		},
		dataType: "json",
		success: function(resultJson) {
			if (resultJson.status == 200) {
				Address.delDom.remove();
				if ($('#addrbookTable tr').length < 2) {
					location.reload();
				}
			} else if (resultJson.status == 403) {
				login();
			} else {
				$("#errorTips").show().html("操作失败，请稍后再试！");;
			}
		}
	});
}

function showDelConfirm(dom) {
	$('#delDialog').show().data('dom-del', dom.data('id'));
	Address.delDom = dom;
}

function getPage(current, countPage) {
	var html = "";
	var index = countPage;
	current = parseInt(current);
	if (current > 1) {
		html += "<a class=\"a-pre\">上一页</a>";
	} else {
		html += "<a class=\"a-pre-dis\">上一页</a>";
	}
	var hellip1 = 0,
		hellip2 = 0;
	for (var i = 1; i <= index; i++) {
		if (i < current - 2) {
			if (i == 1) {
				html += "<a class=\"a-page-num\">1</a>";
			} else if (hellip1 != 1) {
				html += "<span>&nbsp;&hellip;&nbsp;</span>";
				hellip1 = 1;
			}
		} else if (i > current + 2) {
			if (i == index) {
				html += "<a class=\"a-page-num\">" + index + "</a>";
			} else if (hellip2 != 1) {
				html += "<span>&nbsp;&hellip;&nbsp;</span>";
				hellip2 = 1;
			}
		} else if (i == current) {
			html += "<a class=\"a-page-current\">" + i + "</a>";
		} else {
			html += "<a class=\"a-page-num\">" + i + "</a>";
		}
	}
	if (current < index) {
		html += "<a class=\"a-next\">下一页</a>";
	} else {
		html += "<a class=\"a-next-dis\">下一页</a>";
	}
	return html;
}

function errorTips() {
	var settime = setTimeout(function() {
		$("#errorTips").hide().html("");
	}, 5000)
}
//验证表单
 function validateForm() {
	if (!$('#province').val() || !$('#city').val()) {
		return {
			status: 0,
			message: '请选择完整的地区信息'
		};
	}
	if (!$.trim($('#address').val())) {
		return {
			status: 0,
			message: '请填写寄货地址'
		};
	}
	if (!$.trim($('#name').val())) {
		return {
			status: 0,
			message: '请填写寄件人姓名'
		};
	}
	if (!$('#phone').val() && !$('#fixphone').val()) {
		return {
			status: 0,
			message: '联系方式和固定电话至少填写一个'
		};
	}
	var phone = $('#phone').val();
	if (phone && !/^1\d{10}$/.test(phone) && !/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{6,8}$/.test(phone)) {
		return {
			status: 0,
			message: '请填写正确的联系方式'
		}
	}
	if ($('#fixphone').val() && !/^(\(\d{3,4}\)|\d{3,4}(-|\s)?)?\d{6,8}$/.test($('#fixphone').val())) {
		return {
			status: 0,
			message: '请填写正确的固定电话'
		};
	}
	if ($('#postcode').val() && !/^\d{6}$/.test($('#postcode').val())) {
		return {
			status: 0,
			message: '请填写正确的邮编'
		};
	}
	return {
		status: 1,
		message: ''
	};
} 

 function initForm(dom) {

	 var selectIndex = 0;
	 $('#mask').show();
	 //alert(dom.find('td:nth-child(1)').text())
	 $('#address').val(dom.find('td:nth-child(3)>span:nth-child(2)').text());
	 $('#name').val(dom.find('td:nth-child(1)').text());
	 $('#fixphone').val(dom.find('td:nth-child(2)>span:nth-child(2)').text());
	 $('#phone').val(dom.find('td:nth-child(2)>span:nth-child(1)').text());
	 $('#postcode').val(dom.find('td:nth-child(4)').text());
	 /* $('#address').val(dom.data('address'));
     $('#name').val(dom.data('name'));
     $('#fixphone').val(dom.data('fixedPhone') || '');
     $('#phone').val(dom.data('phone') || '');
     $('#postcode').val(dom.data('postcode') || ''); */
	 var xzqArrs=dom.find('td:nth-child(3)>span:nth-child(1)').text().split(',');

	 $('#isdefault').prop('checked', +dom.data('isDefault') % 2 === 1);
	 $('table').data('edit-id', dom.data('id'));
	 //xzqArr = (dom.data('xzqName') || '').split(',');
	 $('#province option').each(function(index, el) {
		 if ($(this).text() == xzqArrs[0]) {
			 selectIndex = index;
		 }
	 });
	 $("#province option").eq(selectIndex).prop("selected", true);
	 $("#province").change();
}

function emptyForm() {
	$('#address').val('');
	$('#name').val('');
	$('#fixphone').val('');
	$('#phone').val('');
	$('#postcode').val('');
	$('#isdefault').prop('checked', false);
	$('#province').val('');
	$('#city').val('');
	$('#district').val('').data('district', null);
}
$(function() {
	//initProvinceOrCity();
	$('.dialog-close').click(function(event) {
		$(this).closest('#mask').hide();
		/*if ($(this).data('handle') == 'edit') {
			emptyForm();
		}*/
	});
	$('#add-address .btn-yellow').click(function(event) {
		event.preventDefault();
		xzqArr = [];
		$("#addrbookTable").data("handle-type", 'add');
		$('.dialog-close').data('handle', 'add');
		$('#mask').show();
		$("#province").change();
	});
	$('.handle .btn-yellow').click(function(event) {
		$('#mask').hide();
		if($("#addrbookTable").data("handle-type")=="add"){
			alert("新增")
			//拿到所有值
			/*alert($("#province").val()+$("#city").val()+$("#district").val()+$("#address").val()+$("#name").val()
            +$("#phone").val()+$("#fixphone").val()+$("#postcode").val());*/
			//用ajax向后台传值
			$.ajax({
				url: "address_add",    //请求的url地址
				data: "customerId="+1+"&addressState="+0+"&addressPhone="+$("#phone").val()+"&addressName="+
					$("#name").val()+"&postcode="+$("#postcode").val()+"&province="+$("#province").val()+
					"&city="+$("#city").val()+"&district="+$("#district").val()+"&street="+$("#address").val()+
					"&state="+1,    //参数值
				type: "post",   //请求方式
				success: function (s) {
					if(s=="no"){
						alert("添加地址失败!")
					}else{
						var table = $("#addrbookTable tbody");
						var tr = $('<tr></tr>');
						var html="";
						html += '<td class="col2"><span class="row">' + $("#name").val() +
							'</span>';
						/* if (+resultJson.addressBooks[i].isDefault === 1) {
                            html += '<span class="row fontgray">[默认地址]</span>';
                        } */
						html += '</td><td class="col3">';
						html += '<span class="row">' + $("#phone").val() + '</span>';
						html += '<span class="row">' + $("#fixphone").val() + '</span>';
						html += '</td>';
						html += '<td class="col5"><span class="row">' + $("#province").val()+","+$("#city").val()+","+$("#district").val() +
							'</span><span class="row">' + $("#address").val() +
							'</span></td>';
						html += '<td>' + $("#postcode").val() + '</td>';
						html +=
							'<td class="col4 center"><a href="#" handle="edit">编辑</a>&nbsp;&nbsp;<a href="#" class="fontred" handle="del">删除</a></td>';
						tr.append(html);
						table.append(tr);
					}
				}
			})
		}else if($("#addrbookTable").data("handle-type")=="edit"){
			//alert("修改")


		}

		//只有我和上帝才知道这个代码的意思()
		//2021.4.25，现在只有上帝知道了
		/* var validate = validateForm();
		if (validate.status === 0) {
			$('#error-message').text(validate.message);
			return false;
		}
		$('#error-message').text('');
		var type = $("#addrbookTable").data("handle-type");
		saveAddress(type); */
	});
	$('table').on('click', '[handle=del]', function(event) {
		event.preventDefault();
		//delAddress($(this).closest('tr'));
		showDelConfirm($(this).closest('tr'));
	}).on('click', '[handle=edit]', function(event) {
		//地址编辑

		event.preventDefault();
		$("#addrbookTable").data("handle-type", 'edit');
		$('.dialog-close').data('handle', 'edit');
		initForm($(this).closest('tr'));
	});
	$('#delDialog').on('click', '.dialog-btn[handle=del]', function(event) {
		event.preventDefault();
		delAddress();
		$(this).closest('#delDialog').hide();
	}).on('click', '.dialog-btn[handle=cancel],.dialog-close', function(event) {
		event.preventDefault();
		$(this).closest('#delDialog').hide();
	});
	/*$('#province').change(function(event) {
		initProvinceOrCity('city');
	});
	$('#city').change(function(event) {
		getDistrict();
	});*/
})

'use strict';
angular.module('yhtml5.user', ['ui.bootstrap', 'ngAnimate'])
    .controller('yhtml5.user', function($scope, $uibModal, $http, $timeout,Data) {
        $scope.dataInit = Data;
        $scope.banks = Data.banks;
        /** ========================= 银燕 获取 经营范围、地市字典 ========================= B**/
        $scope.citiesLookup = {};
        $scope.busiSubTypesLookup = {};
        $scope.citiesLookup = $http.get("http://admin.jubaobar.com/front/common/region/all.htm")
            .success(function(response) {
                $scope.dataInit.division = response.data;
                angular.forEach(response.data, function(province) {
                    var cities = [];
                    angular.forEach(province.children, function(city) {
                        cities.push({
                            id: city.id,
                            name: city.name
                        });
                    });
                    $scope.citiesLookup[province.id] = cities;
                });
                return $scope.citiesLookup;
            });

        $scope.busiSubTypesLookup = $http.get("http://admin.jubaobar.com/front/homePage/queryEnumData.htm")
            .success(function(response) {
                $scope.dataInit.businessTypes = response.data;
                angular.forEach(response.data, function(busiType) {
                    var busiSubTypes = [];
                    angular.forEach(busiType.subList, function(subType) {
                        busiSubTypes.push({
                            dictCode: subType.dictCode,
                            dictValue: subType.dictValue
                        });
                    });
                    $scope.busiSubTypesLookup[busiType.dictCode] = busiSubTypes;
                });
                return $scope.busiSubTypesLookup;
            });
        /** ========================= 银燕 获取 经营范围、地市字典 ========================= **/

        $scope.bankSelect = {};
        $scope.bankprovAccount = {};
        $scope.bankcityAccount = {};
        $http.get('http://admin.jubaobar.com/front/myAccount/queryAccountMessage.htm')
            .success(function(response) {
                $scope.userAccount = response.data;
                $scope.bankSelect.id = $scope.userAccount.bankid;
                $scope.bankSelect.bank = $scope.userAccount.bankname;
                $scope.bankprovAccount.id = $scope.userAccount.bankprov;
                $scope.bankcityAccount.id = $scope.userAccount.bankcity;
                $scope.bankprovAccount.children = $scope.citiesLookup[$scope.userAccount.bankprov] || [];
            });
        $scope.userAccountFormSave = function(size) {
            $scope.userPersonFormEnabled = true
            $scope.userPersonUpdate = true
            $scope.userPersonSave = true;
            $http({
                method: "post",
                url: "http://admin.jubaobar.com/front/authentication/settleAccountMessage.htm",
                params: {
                    accountname: $scope.userAccount.accountname,
                    accounttype: $scope.userAccount.accounttype,
                    accountnum: $scope.userAccount.accountnum,
                    bankid: $scope.bankSelect.id,
                    bankname: $scope.bankSelect.bank,
                    bankprov: $scope.bankprovAccount.id,
                    bankcity: $scope.bankcityAccount.id,
                    bankbranch: $scope.userAccount.bankbranch,
                    alipayname: $scope.userAccount.alipayname,
                    alipay: $scope.userAccount.alipay,
                    id: $scope.userAccount.id
                }
            }).success(function(res) {
                $scope.savingBase = false;
                if (res.resultCode == 0) {
                    $scope.app.proxy_base_objectid = res.objectid;
                    $scope.view.state = $scope.view.stateMachine["fullfill_base"];
                    $anchorScroll();
                }
            })
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'noteSimple.html',
                controller: 'userAccountNoteSimpleCtrl',
                size: size
            })
        };
        $scope.businessTypeUser = {};
        $scope.businessSubTypeUser = {};
        $scope.provUser = {};
        $scope.cityUser = {};
        $http.get('http://admin.jubaobar.com/front/user/person/info.htm')
            .success(function(response) {
                console.log(response);
                $scope.userInfo = response.data;
                console.log(response.data.contactProvIdShow);
                $scope.businessTypeUser.dictCode = $scope.userInfo.businessType;
                $scope.businessSubTypeUser.dictCode = $scope.userInfo.businessSubType;
                $scope.provUser.id = $scope.userInfo.contactProvId;
                $scope.cityUser.id = $scope.userInfo.contactCityId;
                $scope.businessTypeUser.subList = $scope.busiSubTypesLookup[$scope.userInfo.businessType] || [];
                $scope.provUser.children = $scope.citiesLookup[$scope.userInfo.contactProvId] || [];
            });
        $scope.userPersonFormEnabled = true
        $scope.userPersonUpdate = true
        $scope.userPersonSave = true
        $scope.userPersonFormTotal = function() {
            $scope.userPersonFormEnabled = !$scope.userPersonFormEnabled
            $scope.userPersonUpdate = false
            $scope.userPersonSave = false
        };
        $scope.animationsEnabled = true;
        $scope.userPersonFormSave = function(size, file) {
            $scope.userPersonFormEnabled = true;
            $scope.userPersonUpdate = true;
            $scope.userPersonSave = true;
            $http({
                method: "post",
                url: "http://admin.jubaobar.com/front/authentication/businessInformation.htm",
                params: {
                    companyType: $scope.userInfo.companyType,
                    subCompanyType: $scope.userInfo.subCompanyType,
                    userName: $scope.userInfo.userName,
                    businessType: $scope.userInfo.businessType1.dictCode,
                    businessSubType: $scope.userInfo.businessType2.dictCode,
                    businessTypeAll: $scope.userInfo.businessType1 + "/" + $scope.userInfo.businessType2,
                    companyName: $scope.userInfo.companyName,
                    companyAddress: $scope.userInfo.companyAddress,
                    licenseNo: $scope.userInfo.licenseNo,
                    contactName: $scope.userInfo.contactName,
                    contactEmail: $scope.userInfo.contactEmail,
                    contactTelephone: $scope.userInfo.contactTelephone,
                    contactQQ: $scope.userInfo.contactQQ,
                    contactProvId: $scope.provUser.id,
                    contactCityId: $scope.cityUser.id,
                    contactAddress: $scope.userInfo.contactAddress,
                    contactAddressAll: $scope.userInfo.contactProvId.name + $scope.userInfo.contactCityId.name + $scope.userInfo.contactAddress,
                    idCard: $scope.userInfo.idCard,
                    idCardPic: $scope.userInfo.idCardPic,
                    idCardFrontPic: $scope.userInfo.idCardFrontPic,
                    idCardReversePic: $scope.userInfo.idCardReversePic,
                    licensePic: $scope.userInfo.licensePic,
                    taxCertPic: $scope.userInfo.taxCertPic,
                    orgCodeCertPic: $scope.userInfo.orgCodeCertPic,
                    openPermitPic: $scope.userInfo.openPermitPic,
                    otherTypePic: $scope.userInfo.otherTypePic,
                    companyId: $scope.userInfo.companyId
                }
            }).success(function(res) {
                $scope.savingBase = false;
                if (res.resultCode == 0) {
                    console.log("应用信息保存成功")
                }
            });
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'noteSimple.html',
                controller: 'userPersonNoteSimpleCtrl',
                size: size
            });
        };
        console.log("I'll send picture");
        // ====== check password demo ======
        var vm = $scope.vm = {
            show_error: false,
            user: {}
        };
        vm.userPasswordLoginSave = function(userPasswordLoginForm, size) {
            vm.show_error = true;
            userPasswordLoginForm.$setDirty();
            if (userPasswordLoginForm.$valid) {
                $scope.data = {};
                $http({
                    method: "post",
                    url: "http://admin.jubaobar.com/front/pwd/update.htm",
                    params: {
                        loginPwd: $scope.vm.user.loginPwd,
                        newPwd: $scope.vm.user.password,
                        confirmPwd: $scope.vm.user.repeatPassword
                    }
                }).success(function(res) {
                    var rslt = 'userPasswordLoginFailCtrl';
                    if (res.result == '0') {
                        rslt = 'userPasswordLoginCtrl';
                    }
                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'noteSimple.html',
                        controller: rslt,
                        size: size
                    });
                })
            }
        };
        // ====== end ======
        /** writed by 白豆腐  安全密码修改*/
        var safe = $scope.safe = {
            show_error: false,
            user: {}
        };
        safe.userPasswordSecuritySave = function(userPasswordSafeForm, size) {
            safe.show_error = true;
            userPasswordSafeForm.$setDirty();
            if (userPasswordSafeForm.$valid) {
                $scope.data = {};
                $http({
                    method: "post",
                    url: "http://admin.jubaobar.com/front/safetypwd/update.htm",
                    params: {
                        safetypwd: $scope.safe.user.safetyPwd,
                        newSafetyPwd: $scope.safe.user.newSafetyPwd,
                        confirmSafetyPwd: $scope.safe.user.repeatSafetyPwd
                    }
                }).success(function(res) {
                    var rslt = 'userPasswordSecurityFailCtrl';
                    if (res.result == '0') {
                        rslt = 'userPasswordSecurityCtrl';
                    }
                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'noteSimple.html',
                        controller: rslt,
                        size: size
                    });
                })
            }
        };
        /** writed by 白豆腐  安全密码修改*/
        $scope.userPasswordSecurityRetrieveOpen = function(size) {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'userPasswordSecurityRetrieve.html',
                controller: 'userPasswordSecurityRetrieveCtrl',
                size: size
            })
        };
    })
    .controller('userPersonNoteSimpleCtrl', function($scope, $uibModalInstance) {
        $scope.text = "资料修改成功，信息正在审核中，请耐心等候！"
        $scope.isInfo = true
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
    })
    .controller('userAccountNoteSimpleCtrl', function($scope, $uibModalInstance) {
        $scope.text = "结算信息修改成功！"
        $scope.isInfo = true
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
    })
    .controller('userPasswordLoginCtrl', function($scope, $uibModalInstance) {
        $scope.text = "登录密码修改成功！"
        $scope.isInfo = true
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
    })
    .controller('userPasswordSecurityCtrl', function($scope, $uibModalInstance) {
        $scope.text = "安全密码修改成功！"
        $scope.isInfo = true
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
    })
    .controller('userPasswordLoginFailCtrl', function($scope, $uibModalInstance) {
        $scope.text = "用户不存在或者登录密码错误！"
        $scope.isInfo = true
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
    })
    .controller('userPasswordSecurityFailCtrl', function($scope, $uibModalInstance) {
        $scope.text = "用户不存在或者安全密码错误！"
        $scope.isInfo = true
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
    })
    .controller('userPWDSafeInputFailCtrl', function($scope, $uibModalInstance) {
        $scope.text = "录入文本框不能空!"
        $scope.isInfo = true
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
    })
    .controller('userPWDSafeExistFailCtrl', function($scope, $uibModalInstance) {
        $scope.text = "用户不存在或者安全问题答案错误!"
        $scope.isInfo = true
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
    })
    .controller('userPWDSafeAuthCodeFailCtrl', function($scope, $uibModalInstance) {
        $scope.text = "短信验证码错误!"
        $scope.isInfo = true
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
    })
    .controller('userPWDSafeResetFailCtrl', function($scope, $uibModalInstance) {
        $scope.text = "安全密码重置错误!"
        $scope.isInfo = true
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
    })
    .controller('userPasswordSecurityRetrieveCtrl', function($scope, $uibModalInstance, $uibModal, $interval, $http) {
        $scope.passwordFormEnabled = true;
        $scope.newPasswordFormEnabled = false;
        $scope.buttonText = "获取验证码";
        $scope.send = function() {
        	/* writed by 白豆腐  发送验证码   */
            $http({
                method: "post",
                url: "http://admin.jubaobar.com/front/safetypwd/sendCode.htm",
            }).success(function() {})

            // ========= 倒计时 =========
            $scope.isDisabled = false;
            var second = 60;
            timePromise = undefined;
            timePromise = $interval(function() {
                if (second <= 0) {
                    $interval.cancel(timePromise);
                    timePromise = undefined;
                    second = 60;
                    $scope.buttonText = "重发验证码";
                    $scope.isDisabled = false;
                } else {
                    $scope.buttonText = second + "秒后可重发";
                    $scope.isDisabled = true;
                    second--;
                }
            }, 1000, 0);
        };
        /* writed by 白豆腐  找回安全密码*/
    	$scope.forget = {show_error: false};
        $http.get('http://admin.jubaobar.com/front/safetypwd/showfindpwd.htm')
        .success(function(response) {
        	$scope.forget.pwdQuestion = response.data;
        });
        $scope.next = function(forgetSafePasswordForm,size) {
        	$scope.forget.show_error = true;
        	forgetSafePasswordForm.$setDirty();
            if (forgetSafePasswordForm.$valid) {
                $http({
                    method: "post",
                    url: "http://admin.jubaobar.com/front/safetypwd/find.htm",
                    params: {
                        pwdAnswer: $scope.forget.pwdAnswer,
                        authCode: $scope.forget.authCode
                    }
                }).success(function(response) {
                	if(response.result =='0'){
                		$scope.newPasswordFormEnabled = true;
                    	$scope.isConfirm = true;
                    	$scope.passwordFormEnabled = false;
                        $scope.isNext = true;
                	}else {
                		$scope.passwordFormEnabled = true;
                		$scope.newPasswordFormEnabled = false;
                		$scope.isNext = false;
                		$scope.isConfirm = false;
                		var rslt= 'userPWDSafeInputFailCtrl';
                		if(response.result =='1'){
                			rslt= 'userPWDSafeExistFailCtrl';
                		}else if(response.result =='6'){
                			rslt= 'userPWDSafeAuthCodeFailCtrl';
                		}
                    	var modalInstance = $uibModal.open({
                            animation: $scope.animationsEnabled,
                            templateUrl: 'noteSimple.html',
                            controller: rslt,
                            size: size
                        });
                	}
                })
            }
        };

        $scope.cancel = function() {
        	$uibModalInstance.dismiss('cancel');
        }

        $scope.animationsEnabled = true;

        /* writed by 白豆腐  重设安全密码*/
        $scope.reset = {show_error: false};
        $scope.confirm = function(resetSafePasswordForm, size) {
        	$scope.reset.show_error = true;
        	resetSafePasswordForm.$setDirty();
            if (resetSafePasswordForm.$valid) {
                $http({
	                method: "post",
	                url: "http://admin.jubaobar.com/front/safetypwd/reset.htm",
	                params: {
	                	newSafetyPwd: $scope.reset.newSafetyPwd,
	                	confirmPwd: $scope.reset.confirmPwd
	                }
                }).success(function(response) {
                	if(response.result == '0'){
                		var modalInstance = $uibModal.open({
                            animation: $scope.animationsEnabled,
                            templateUrl: 'noteSimple.html',
                            controller: 'userPasswordSecurityCtrl',
                            size: size
                        })
                        $uibModalInstance.dismiss('cancel');
                	}else{
                		var modalInstance = $uibModal.open({
                            animation: $scope.animationsEnabled,
                            templateUrl: 'noteSimple.html',
                            controller: 'userPWDSafeResetFailCtrl',
                            size: size
                        })
                	}
                });
            }
        };
        /* writed by 白豆腐  重设安全密码*/
    });
var code="" ; //��ȫ�� ������֤��

function createCode(){ 




    if(mima5==nUM){
	
	alert("������ͬ")
	}
 
else 
{ 
alert("���������֤�벻��������������") 
document.getElementById("checkCode").focus() 
//���㶨λ
} 
//if ( yyy.val == code ){
//	alert("u r a bitch");
//	
//	}



code = "";
var codeLength = 6;//��֤��ĳ���
var checkCode = document.getElementById("checkCode");
checkCode.value = "";
var selectChar = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z');

for(var i=0;i<codeLength;i++) {
   var charIndex = Math.floor(Math.random()*32);
   code +=selectChar[charIndex];
}
if(code.length != codeLength){
   createCode();
}



document.getElementById("checkCode").innerHTML = code;
}

function validate () {
var inputCode = document.getElementById("checkNum").value.toUpperCase();

if(inputCode.length <=0) {
   alert("��������֤�룡");
   return false;
}
else if(inputCode != code ){
   alert("��֤���������");
   createCode();
   return false;
}
else {
   alert("��֤��ͨ����");
   return true;
}

}


// checkinnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnng


/*function check(str) 
{ 
var x = document.getElementById(str); 
var y = document.getElementById(str+"Check"); 
//alert("check!"); 
if(str=="name") 
{ 
if(x.value=="") 
y.hidden = false; 
else 
y.hidden = true; 
} 
else if(str=="age") 
{ 
if(isNaN(x.value) || x.value < 17) 
y.hidden = false; 
else 
y.hidden = true; 
} 
else if(str=="weight") 
{ 
x = x.value; 
if(isNaN(x) || x < 30 || x > 150) 
y.hidden = false; 
else 
y.hidden = true; 
} 
else if(str=="password") 
{ 
x = x.value.length; 
if(x < 8) 
{ 
y.hidden = false; 
//alert("check!"); 
} 
else 
y.hidden = true; 
} 
else if(str=="cpassword") 
{ 
var z = document.getElementById("password").value; 
x = x.value; 
if(x != z) 
y.hidden = false; 
else 
y.hidden = true; 
} 
else if(str=="email") 
{ 
x = x.value.indexOf("@") 
if(x == -1) 
y.hidden = false; 
else 
y.hidden = true; 
} 
return y.hidden; 
} 

function validate() 
{ 
var arr=["name", "age", "weight", "password", "cpassword", "email"]; 
var i = 0; 
submitOK = true; 
while(i <= 5) 
{ 
if(!check(arr[i])) 
{ 
alert(arr[i]+" wrong!"); 
submitOK = false; 
break; 
} 
i++; 
} 
if(submitOK) 
{ 
alert("�ύ�ɹ���"); 
return true; 
} 
else 
{ 
alert("�ύʧ��"); 
return false; 
} 
} 

function load_greeting() 
{ 
//alert("visit \n"); 
} */
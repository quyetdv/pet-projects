let button = document.getElementsByClassName('phim_bam')[0]

let screen = document.getElementById('man_hinh');

let doi_dau = false;
let phim_moi = '';
let chuoi_ketqua = '';

let doi_phep_tinh = false;
let phep_tinh_cu = '';

let bo_nho = 0;

let num = 0;
let mang_so = new Array();

let phep_tinh = 0;
let mang_Phep_Tinh = new Array();

let end = false;

	button.addEventListener("click", hienthi_So);

	function hienthi_So(event) {
		let type = event.target.textContent;

		if (end) {
			screen.innerHTML = '';
			end = false;
		}

		if (chuoi_ketqua == '' && phim_moi == '') {
			chuoi_ketqua = screen.innerHTML;
		}
		
		if (chuoi_ketqua=='0'){
			chuoi_ketqua = '';
		}
//****************************************************
	//Số cơ bản và đổi dấu
	if (type == '0' ||
		type == '1' ||
		type == '2' ||
		type == '3' ||
		type == '4' ||
		type == '5' ||
		type == '6' ||
		type == '7' ||
		type == '8' ||
		type == '9' ||
		type == '+/-' ||
		type == '.')	
	{
		doi_phep_tinh = false;

		if (type == '+/-') { 
    	
    		if (doi_dau) {
    			doi_dau = false;
    			phim_moi = phim_moi.substring(1);
    		}
    		else {
    			doi_dau = true;
    			phim_moi = '-' + phim_moi;
    		}
    	}
    	else {phim_moi += type;}
    	
    	screen.innerHTML = chuoi_ketqua + phim_moi;
    }
//****************************************************
	//Phép tính cơ bản
		else if (type == '+' ||
				 type == '−' ||
				 type == '×' ||
				 type == '÷') 
		{
			
			if (doi_phep_tinh) {

				if ((phep_tinh_cu == '×' || phep_tinh_cu == '÷') && (phep_tinh_cu == '+' || phep_tinh_cu == '−')) {bo_nho--;}
				else if ((phep_tinh_cu == '+' || phep_tinh_cu == '−') && (phep_tinh_cu == '×' || phep_tinh_cu == '÷')) {bo_nho++;}
			
				mang_Phep_Tinh[phep_tinh-1] = type;

				screen.innerHTML = screen.innerHTML.substring(0, screen.innerHTML.length-1) + type;
			} 
			else {
				phep_tinh_cu = type;

				mang_so[num] = parseFloat(phim_moi);		
				num++;

				mang_Phep_Tinh[phep_tinh] = type;		
				phep_tinh++;

				screen.innerHTML = screen.innerHTML + type;

				if (type == '×' || type == '÷') {bo_nho++;} 
			}
			doi_phep_tinh = true;

			chuoi_ketqua = '';
			phim_moi = '';
		}    	     
 //****************************************************
 	//Tính ra ngay
 		else if (type == '=' || type == '%' || type == '!' || type == '√' || type == 'x²') {
 				end = true;

 				if (phim_moi != '') {mang_so[num] = parseFloat(phim_moi)}

	 			if (type == '=') {
	 				tinh_Co_Ban();
	 			} 
	 				else if (type == '%') {
	 					tinh_Phan_Tram();
	 				} 
	 					else if (type == '!') {
	 						tinh_Giai_Thua();
	 					} 
	 						else if (type == '√') {
	 							tinh_Can_Bac_Hai ();
	 						}
	 							else if (type == 'x²') {
	 								tinh_Binh_Phuong();
	 							}
	 			
	 			chuoi_ketqua = '';
	 			
	 			phim_moi = '';

	 			bo_nho = 0;

	 			num = 0;
	 			mang_so = new Array();
	 			
	 			phep_tinh = 0;
	 			mang_Phep_Tinh = new Array();
 		}
 //****************************************************
    //Reset
    	else if (type == 'CE' || type == 'C') 
    		{
    			if (type == 'CE') {
    			phim_moi = '';

				chuoi_ketqua = chuoi_ketqua.substring(0, chuoi_ketqua.length-1);
    			}
    			else {
    				phim_moi = '';
    				chuoi_ketqua = '';
    			}
    			screen.innerHTML = chuoi_ketqua + phim_moi;
			}	
//****************************************************   	
    //Phím xóa	
    	else 
    	{
    		if (phim_moi.length >= 1) 
    		{
    			phim_moi = phim_moi.substring(0, phim_moi.length-1)
    		} 
    		else 
    		{
    			phim_moi = '';

    			if (chuoi_ketqua.length > 1) 
    				{
    					chuoi_ketqua = chuoi_ketqua.substring(0, chuoi_ketqua.length-1);
    				}
    			else 
    			{
    				chuoi_ketqua = '';
    			}	
    		}
    		screen.innerHTML = chuoi_ketqua + phim_moi;
    	} 
//****************************************************
    }    

function tinh_Phan_Tram () {

	if (mang_so[1] == 0) {screen.innerHTML = 'Lỗi';}
	else if (num == 0) {screen.innerHTML = mang_so[0] / 100}

	else if (phep_tinh != 0 && mang_Phep_Tinh[0] != '÷') {screen.innerHTML = 'Lỗi';}
	else {
		screen.innerHTML = mang_so[0] / mang_so[1] * 100;;
	}
}

function tinh_Binh_Phuong () {
	let kqt = tinh_Co_Ban();

	if (num == 0) {
		screen.innerHTML = Math.pow(mang_so[0],2);
	} else {
		screen.innerHTML = Math.pow(kqt,2);
	}
}

function tinh_Can_Bac_Hai () {
	let kqt = tinh_Co_Ban();

	if (mang_so[0] < 0) {screen.innerHTML = 'Lỗi';}
	
	if (num == 0 && mang_so[0] > 0) {
		screen.innerHTML = Math.sqrt(mang_so[0]);
	} else {
		screen.innerHTML = Math.sqrt(kqt);
	}
}

function tinh_Giai_Thua () {
	let giai_thua = 1;

	for (let j = 1; j <= mang_so[0]; j++) {giai_thua = giai_thua * j;}
	
	screen.innerHTML = giai_thua;	
}

function tinh_Co_Ban () {
	phep_tinh--;
	while (bo_nho > 0) {
				
		for (let index = 0; index <= phep_tinh; index++) {
			
			if (mang_Phep_Tinh[index] == '×' || mang_Phep_Tinh[index] == '÷') {
				
				let num1 = mang_so[index];
				let num2 = mang_so[index + 1];
				
				let ket_qua = 0;

				if (mang_Phep_Tinh[index] == '×') {ket_qua = num1 * num2}
					else {
						if (num2 == 0) {screen.innerHTML = 'Lỗi'}
						else {ket_qua = num1 / num2;}
					}
				
				mang_so[index] = ket_qua;
				
				for (let newIndex = index + 1; newIndex < num; newIndex++) {
					mang_so[newIndex] = mang_so[newIndex + 1];
				}
				num--;	

				for (let newIndex = index; newIndex < phep_tinh; newIndex++) {
					mang_Phep_Tinh[newIndex] = mang_Phep_Tinh[newIndex + 1];
				}
				phep_tinh--;

				bo_nho--;

				break;
			}
		}
	}
	while (num > 0) {
		
		let num1 = mang_so[0];
		let num2 = mang_so[1];

		let ket_qua = 0;
		if (mang_Phep_Tinh[0] == '+') {ket_qua = num1 + num2;} 

		else {ket_qua = num1 - num2;}
		
		mang_so[0] = ket_qua;

		for (let newIndex = 1; newIndex < num; newIndex++) {
			mang_so[newIndex] = mang_so[newIndex + 1];
		}
		num--;

		for (let newIndex = 0; newIndex < phep_tinh; newIndex++) {
			mang_Phep_Tinh[newIndex] = mang_Phep_Tinh[newIndex + 1];
		}
		phep_tinh--;
	}

	screen.innerHTML = mang_so[0];
}
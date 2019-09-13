$(function () {

let doi_dau = false;
let doi_phep_tinh = false;

let phim_moi = '';
let chuoi_ketqua = '';

let phep_tinh_cu = '';

let so_Index = 0;
let mang_So = new Array();

let phep_tinh_Index = 0;
let mang_Phep_Tinh = new Array();

let bo_nho = 0;

let end = false;

	$(".phim_bam").click(function (event) {
		let $type = $(event.target).text();

		if (chuoi_ketqua == '' && phim_moi == '') {
			chuoi_ketqua = $('#man_hinh').html();
		}
		
		if (chuoi_ketqua=='0'){
			chuoi_ketqua = '';
		}
		
		if (end) {
			$('man_hinh').html('');
			end = false;
		}

		if ($type == '0' ||
			$type == '1' ||
			$type == '2' ||
			$type == '3' ||
			$type == '4' ||
			$type == '5' ||
			$type == '6' ||
			$type == '7' ||
			$type == '8' ||
			$type == '9' ||
			$type == '+/-' ||
			$type == '.')	
			{
				doi_phep_tinh = false;

				if ($type == '+/-') 
				{ 
	    	
		    		if (doi_dau) 
		    		{
		    			doi_dau = false;
		    			phim_moi = phim_moi.substring(1);
		    		}
		    		else 
		    		{
		    			doi_dau = true;
		    			phim_moi = '-' + phim_moi;
	    			}
	    		}   	
	    		else {phim_moi += $type;}
	    	
	    		$('#man_hinh').html(chuoi_ketqua + phim_moi);
			}
//************************************************************************************************************************			
		else if ($type == '+' ||
				 $type == '−' ||
				 $type == '×' ||
				 $type == '÷')
				{
				 	if (doi_phep_tinh)
					 	{
					 		if ((phep_tinh_cu == '×' || phep_tinh_cu == '÷') && (phep_tinh_cu == '+' || phep_tinh_cu == '−')) {bo_nho--;}
							else if ((phep_tinh_cu == '+' || phep_tinh_cu == '−') && (phep_tinh_cu == '×' || phep_tinh_cu == '÷')) {bo_nho++;}
					 		
					 		mang_Phep_Tinh[phep_tinh_Index-1] = $type;
					 		
					 		$('#man_hinh').html($('#man_hinh').html().substring(0, $('#man_hinh').html().length-1) + $type)
				 		}
				 	else 
				 		{
				 			phep_tinh_cu = $type;

				 			mang_So[so_Index] = parseFloat(phim_moi);		
							so_Index++;

							mang_Phep_Tinh[phep_tinh_Index] = $type;		
							phep_tinh_Index++;

							$('#man_hinh').html($('#man_hinh').html() + $type);

							if ($type == '×' || $type == '÷') {bo_nho++;}
				 		}
				 	doi_phep_tinh = true;

				 	chuoi_ketqua = '';
				 	phim_moi = '';
				}
//************************************************************************************************************************
		else if ($type == '=' || $type == '%' || $type == '!' || $type == '√' || $type == 'x²') 
				{
 				
	 				end = true;

	 				if (phim_moi != '') {mang_So[so_Index] = parseFloat(phim_moi)}

		 			if ($type == '=') {
		 				tinh_Co_Ban();
		 			} 
		 				else if ($type == '%') {
		 					tinh_Phan_Tram();
		 				} 
		 					else if ($type == '!') {
		 						tinh_Giai_Thua();
		 					} 
		 						else if ($type == '√') {
		 							tinh_Can_Bac_Hai ();
		 						}
		 							else if ($type == 'x²') {
		 								tinh_Binh_Phuong();
		 							}
	 			
		 			chuoi_ketqua = '';
		 			
		 			phim_moi = '';

		 			bo_nho = 0;

					so_Index = 0;
					mang_So = new Array();

					phep_tinh_Index = 0;
					mang_Phep_Tinh = new Array();
 				}		  
//************************************************************************************************************************
		else if ($type == 'CE' || $type == 'C') 
    		{
    			if ($type == 'CE') {
    			phim_moi = '';

				chuoi_ketqua = chuoi_ketqua.substring(0, chuoi_ketqua.length-1);
    			}
    			else {
    				phim_moi = '';
    				chuoi_ketqua = '';
    			}
    			$('#man_hinh').html(chuoi_ketqua + phim_moi);
			}
//************************************************************************************************************************
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
    		$('#man_hinh').html(chuoi_ketqua + phim_moi);
    	} 
	})
//************************************************************************************************************************
function tinh_Phan_Tram () {

	if (mang_So[1] == 0) {$('#man_hinh').html('Lỗi');}
	
		else if (so_Index == 0) {$('#man_hinh').html(mang_So[0] / 100)}

			else if (phep_tinh_Index != 0 && mang_Phep_Tinh[0] != '÷') {$('#man_hinh').html('Lỗi');}
	
				else {$('#man_hinh').html(mang_so[0] / mang_So[1] * 100);}
}
//************************************************************************************************************************
function tinh_Binh_Phuong () {
	let kqt = tinh_Co_Ban();

	if (so_Index == 0) {
		$('#man_hinh').html(Math.pow(mang_So[0],2));
	} else {
		$('#man_hinh').html(Math.pow(kqt,2));
	}
}
//************************************************************************************************************************
function tinh_Can_Bac_Hai () {
	let kqt = tinh_Co_Ban();

	if (mang_So[0] < 0) {$('#man_hinh').html('Lỗi');}
	
	if (so_Index == 0 && mang_So[0] > 0) {
		$('#man_hinh').html(Math.sqrt(mang_So[0]));
	} else {
		$('#man_hinh').html(Math.sqrt(kqt));
	}
}
//************************************************************************************************************************
function tinh_Giai_Thua () {
	let giai_thua = 1;

	for (let j = 1; j <= mang_So[0]; j++) {giai_thua = giai_thua * j;}
	
	$('#man_hinh').html(giai_thua);	
}
//************************************************************************************************************************
function tinh_Co_Ban () {
	phep_tinh_Index--;
	while (bo_nho > 0) {
				
		for (let index = 0; index <= phep_tinh_Index; index++) {
			
			if (mang_Phep_Tinh[index] == '×' || mang_Phep_Tinh[index] == '÷') {
				
				let num1 = mang_So[index];
				let num2 = mang_So[index + 1];
				
				let ket_qua = 0;

				if (mang_Phep_Tinh[index] == '×') {ket_qua = num1 * num2}
					else {
						if (num2 == 0) {$('#man_hinh').html('Lỗi')}
						else {ket_qua = num1 / num2;}
					}
				
				mang_So[index] = ket_qua;
				
				for (let newIndex = index + 1; newIndex < so_Index; newIndex++) {
					mang_So[newIndex] = mang_So[newIndex + 1];
				}
				so_Index--;	

				for (let newIndex = index; newIndex < phep_tinh_Index; newIndex++) {
					mang_Phep_Tinh[newIndex] = mang_Phep_Tinh[newIndex + 1];
				}
				phep_tinh_Index--;

				bo_nho--;

				break;
			}
		}
	}
	while (so_Index > 0) {
		
		let num1 = mang_So[0];
		let num2 = mang_So[1];

		let ket_qua = 0;
		if (mang_Phep_Tinh[0] == '+') {ket_qua = num1 + num2;} 

		else {ket_qua = num1 - num2;}
		
		mang_So[0] = ket_qua;

		for (let newIndex = 1; newIndex < so_Index; newIndex++) {
			mang_So[newIndex] = mang_So[newIndex + 1];
		}
		so_Index--;

		for (let newIndex = 0; newIndex < phep_tinh_Index; newIndex++) {
			mang_Phep_Tinh[newIndex] = mang_Phep_Tinh[newIndex + 1];
		}
		phep_tinh_Index--;
	}

	$('#man_hinh').html(mang_So[0]);
}
})
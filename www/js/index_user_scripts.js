/*jshint browser:true */
/*global $ */
(function() {
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {        
        $.getScript("https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js");
     
     
     
     
/****************** button  #btn-register ********************/
     
    $(document).on("click", "#btn-register", function(evt)
    {
        var name = $('input[name="nama"]').val();
        var email = $('input[name="email"]').val();
        var username = $('input[name="username"]').val();
        var password = $('input[name="password"]').val();
        
        $.ajax({
            url : 'http://192.168.158.1/android_server/PostRegister.php', //lokasi server buat nyimpan ke dalam database
            type: 'POST',
            data: {
                name : name,
                email : email,
                username : username,
                password : password
            },
            
            success:function(result){
                if(result.status == 'sukses')
                    {
                        alert("register berhasil");
                        window.location = 'login.html';
                } else {
                    alert(result.status);
                    }
                }
        });
        
    });
    
     
     
/*********************** button  #btn-login ************************/
     
    $(document).on("click", "#btn-login", function(evt)
    { //mengambil value dari input username dan password
        var username = $('input[name="username"]').val();
        var password = $('input[name="password"]').val();
        
        $.ajax({
            url : 'http://192.168.158.1/android_server/PostLogin.php',
            type: 'POST',
            data: {
                username : username,
                password : password
            },
            //jika berhasil
            success: function(result) {
                if(result.status == 'sukses')
                    {
                        $.cookie('id_user', result.id); //buat ngambil user idnya sejenis session
                        window.location = 'barang.html';
                    }
                else
                {
                    alert(result.status);
                    window.location = 'login.html';
                }
            },
            error: function (result) {
                alert('Tidak terkoneksi dengan server');
            }
        });
    });
    
     
     
/************************ buat nampilin skedul **********************************/
     
     $(document).ready(function(){              
         $.post("http://192.168.158.1/android_server/get_all.php",function(response){
              // alert(JSON.stringify(response));        
                    var arr = $.parseJSON(response); 
                    var trHTML = '';
                    
                    $.each(arr, function(ix, nilai){                  
                        
                     trHTML += '<tr><td><a href="belanja.html" class="belanja">'+ arr[ix].tanggal +'</a></td><td>'+ arr[ix].nama_skedul +'</td><td align="center"><a href="edit_skedul.html" class="edit_skedul" id="'+ arr[ix].id_skedul+'">Edit</a>&nbsp;&nbsp;&nbsp;<a href="#">Hapus</a></td></tr>'
                    });
                           
                    
                      $('#tabel_skedul').append(trHTML).listview("refresh");
    
                });
                        
         });
     
     
     
/************************** tombol buat skedul ******************************/
     
      $(document).on("click", "#btn-buat-skedul", function(evt)
    {
        var tanggal = $('input[name="tanggal"]').val();
        var nama_skedul = $('input[name="nama_skedul"]').val();
        
        $.ajax({
            url : 'http://localhost/android_server/PostBuatSkedul.php', //lokasi server buat nyimpan ke dalam database
            type: 'POST',
            data: {
                id_user : $.cookie('id_user'),
                tanggal : tanggal,
                nama_skedul : nama_skedul
            },
            
            success:function(result){
                if(result.status == 'sukses')
                    {
                        alert("berhasil membuat skedul");
                        window.location = 'skedul.html';
                } else {
                    alert(result.status);
                    }
                }
        });
        
    });
     

     
/************************** untuk ngarahin ke halaman edit skedul **************************************/
     
     $(document).on('click','.edit_skedul',function(){
                         
           var idsked = $(this).attr('id');
        
               
            window.location="edit_skedul.html?id_skedul="+idsked;
            
            return false;         
                
        });
     
     
     
/************************** pemanggilan data untuk di edit **************************************/
      
     //NAH INI JOK DIA GAMAU NAMPIL MASA PADAHAL DI TUTORIAL YG AKU IKUTIN UDAH BENER
    $(document).ready(function(){
          
          var idsked = parse("id_skedul");
            
    $.post("http://localhost/android_server/edit_skedul.php?id_skedul="+idsked,function(data){
              
    var skedul = $.parseJSON(data);
      
    $('#tanggal').val(skedul.tanggal);
    $('#nama_skedul').val(skedul.nama_skedul);
                  
                  
            });
          
          
         
/******************************* proses simpan edit *************************************/
        //SEKALIAN BIKININ YANG DELETENYA JOK 
              
    //$(document).on("click", "#btn-edit-skedul", function()
     $("btn-edit-skedul").on('click',function()
    {  
        var edit = $("#NGESAVE").serialize(); 
         
        // alert(edit);
         
         $.post("http://localhost/android_server/edit_skedul.php?id_skedul2="+id_skedul, edit, function(data){
                         
         if(data.status == "sukses"){
  	         alert('Input Berhasil');
  	         window.location='skedul.html';
  	     }
             else if(data.status == 'gagal'){
            alert("Error on query!");
  	     }
                         
        });
         
     
    });
              
    
/********************************** proses delete skedul ******************************/ 
              
    $('#delete').on('click',function(){
        var hapus = $("#ngesave").serialize();
        
        $.post("http://localhost/android_server/delete_skedul.php?id_skedul="+id_skedul, hapus, function(data){
            if(data.status == "sukses"){
  				  alert('Delete Berhasil');
  				  window.location='index.html';
            }
  			else if(data.status == 'gagal'){
                alert("Error on query!");
            }
        });
    });
              
     
          });
     
    
/************************* button  #btn-edit-skedul ******************************/
     
    $(document).on("click", "#btn-edit-skedul", function(evt)
    {
        /* your code goes here */ 
         return false;
    });
   
     
// $.removeCookie('id_user');
    
     
     
/************************* menampilkan daftar belanja ************************/
     
$(document).ready(function(){              
    $.post("http://192.168.158.1/android_server/get_belanja.php",function(response){
     // alert(JSON.stringify(response));        
    var arr = $.parseJSON(response); 
    var trHTML = '';
            
    $.each(arr, function(ix, nilai){                  
                        
        trHTML += '<tr><td>'+ arr[ix].nama_barang +'</td><td>'+ arr[ix].harga_barang +'</td><td align="center"><input type="checkbox"></td><td align="center"><a href="edit_skedul.html" class="edit_skedul" id="'+ arr[ix].id_barangbelanja+'">Edit</a>&nbsp;&nbsp;&nbsp;<a href="#">Hapus</a></td></tr>'
    });
                           
                    
        $('#tabel_belanja').append(trHTML).listview("refresh");
    
    });
                        
});
     
     
     
     
    }
 document.addEventListener("app.Ready", register_event_handlers, false);
    
    
})();

function kembali(){
    window.history.back()
}
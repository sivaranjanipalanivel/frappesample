
 var uppy = Uppy.Core()
        .use(Uppy.Dashboard, {
          inline: true,
          target: '#drag-drop-area'
        })
   var filelists=[];
  uppy.on('upload', (data,file) => {
    $( "<h4>Uploaded successfully!</h4>" ).appendTo( ".uppy-Informer" );

    $('.uppy-Dashboard-progressindicators').find('.uppy-Informer p').css("display","none");
  $.each(filelists[0][0].files,function(i,s){
    $('.uppy-Dashboard-progressindicators').find('.uppy-Informer p').css("display","none");
     // console.log(s);
      var reader = new FileReader();
        reader.onload = function (e) {
          $('.uppy-Dashboard-progressindicators').find('.uppy-Informer p').css("display","none");
//           console.log("-----------");
          // console.log(e);
//           console.log( e.target.result);
//  console.log(cur_frm.doctype)
//  console.log(cur_frm.doc)
//  console.log(cur_frm.docname)
//  localStorage.getItem("upload_tab")
// localStorage.getItem("upload_doc")
// localStorage.getItem("upload_parnt")
// console.log(localStorage.getItem("upload_tab"))
//  console.log(localStorage.getItem("upload_doc"))
//  console.log(localStorage.getItem("upload_parnt"))
 var  upload_doc= localStorage.getItem("upload_tab");
var upload_name= localStorage.getItem("upload_doc");
             frappe.call({
                                      method:'uploadfile',
                                      args:{
                                         
                                            from_form: 1,
                            doctype: cur_frm.doctype,
                            docname: cur_frm.docname,
                            is_private: 0,
                            filename: s.name,
                            file_url: '',
                            file_size:s.size,
                            filedata: e.target.result 
                                      },
                                      async:false,
                                      callback:function(r){
                                      
                          

// console.log(r.message.name);
// console.log(upload_doc);
// console.log(upload_name);
// console.log("------------=");
 console.log('Upload complete! We’ve uploaded these files:', r)

// frappe.model.set_value("File", r.message.name, "upload_doc", upload_doc)
// frappe.model.set_value("File", r.message.name, "upload_doc", upload_name)
$('.uppy-Dashboard-progressindicators').find('.uppy-Informer p').css("display","none");
       
     frappe.call({
        method:'ordermanagement.ordermanagement.api.update_to_file',
        args:{
            file_name:r.message.name,
            upload_doc:upload_doc,
            upload_name:upload_name,
             file_type:s.type
        },
        async:false,
        callback:function(f){
          console.log(f)
        }
      });
                                      
                                    }
          })
        
        };
        reader.readAsDataURL(s);
        uppy.reset();
// localStorage.setItem("upload_tab"," ")
// localStorage.setItem("upload_doc"," ")
// localStorage.setItem("upload_parnt"," ")
  });
   
})
  uppy.on('upload-progress', (file, progress) => {
 
  console.log(file.id, progress.bytesUploaded, progress.bytesTotal)
})
      // .use(Uppy.Tus, {endpoint: 'http://192.168.0.156:8028/'})
// api/method/uploadfile?cmd=uploadfile&doctype=Order&docname=Test%20Item%20%201&filename=api.txt&filedata=SGVsbG8gV29ybGQ=&from_form=1
      // uppy.on('complete', (result) => {
      //   console.log('Upload complete! We’ve uploaded these files:', result.successful)
      // })
      $( document ).ready(function() {
   $('.uppy-DashboardAddFiles-info').find('.uppy-Dashboard-poweredBy').css("display","none");
$('.uppy-Dashboard-progressindicators').find('.uppy-StatusBar-actions button').attr("id","uploadbtn");

$('.uppy-Dashboard-progressindicators').find('.uppy-Informer p').css("display","none");
// $('.uppy-Informer').find('p').css("display","none");

});
     
     
      $('input[type=file]').change(function() {
        filelists.push($(this))
         var input   = $(this);
         console.log("---=-0-=0-0-0-");
         console.log(input);
         console.log("---=-0-=0-0-0-");
         $.each(this.files,function(i,s){
   
         });

      });

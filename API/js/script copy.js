var gData;
//var url =  'https://script.google.com/macros/s/AKfycbxlTNmGTmKUL70Q1j_fsVrxICSfYhJUK2hJ3HhIeWLyXxVP8zEPy9Fvn3UmNCUQmgvc/exec'
var url = 'https://script.google.com/macros/s/AKfycbysu7f5CP4xtqVEypJa_tkOKnTFD7lBpIq-Soy10CZvEKftmxZE2JjxtRD9iAjVX-zlfg/exec'
  function getDataAPI() 
        {  
    $('#d_table').html('<div class="col">Please Wait.....</div>') 
    const url1 = url+'?action=getData'   
   
    fetch(url1)
    .then(response =>{      
      return response.json()        
    })
    .then(data => {
      gData = data.data
      showSendPatientTable(gData)
      console.log(data.data);
      
    })
    .catch(error => {
      console.error("Error in fetch:", error.message);
      
    });
  }

  function addRecord(){
    document.getElementById("btn1").disabled = true
    const name = $('#name').val()
    const amount = $('#amount').val()
    const category = $('#category').val()
    const obj = 
    {
      name:name,
      amount:amount,
      category:category
    }
    const obj_json = JSON.stringify(obj)
    let formData = new FormData();
      formData.append('action', 'addData');
      formData.append('data',obj_json);        
      fetch(url, 
     {
        method: 'POST',
        body: formData,
        //mode:'no-cors'
      })
      .then(response => {        
        return response.json()})
      .then(data => {
        console.log(data)        
        if(data.status == "success"){          
          document.getElementById("name").value = "";
          document.getElementById("amount").value = "";
          document.getElementById("category").value = "";
          document.getElementById("btn1").disabled = false
          getDataAPI()
        }
             
      })
      .catch(error => {
        console.error(error);
        document.getElementById("btn1").disabled = false
      });
    
  }
  rec['id'] = r[0]
  rec['produit'] = r[1]
  rec['superficie'] = r[2]
  rec['nature'] = r[3]
  rec['pu'] = r[4]
  rec['pt'] = r[5]
  rec['site'] = r[6]
  rec['section'] = r[7]
  rec['lot'] = r[8]
  rec['plle'] = r[9]
  rec['statut'] = r[10]
  rec['niveau'] = r[11]
  rec['date'] = r[12]
  rec['image'] = r[13]

  function showSendPatientTable(){    
    if(gData && gData !== undefined && gData.length != 0){
      
      let row_number = 0
      let table_result = `<h5>Edit Table</h5><table class="table table-responsive table-bordered" id="mainTable" style="text-align:center;">
        <thead>
          <tr>
            <th scope='col' class="dt-center">Produit</th> 
            <th scope='col' class="dt-center">Superficie</th>                             
            <th scope='col' class="dt-center">Prix unitaire</th>   
            th scope='col' class="dt-center">Prix total</th>  
            th scope='col' class="dt-center">Site</th>  
            th scope='col' class="dt-center">Section</th>  
            th scope='col' class="dt-center">Lot</th>  
            th scope='col' class="dt-center">Parcelle</th>  
            th scope='col' class="dt-center">Statut</th>  
            th scope='col' class="dt-center">Niveau</th>   
            th scope='col' class="dt-center">Date</th>           
            <th scope='col' class="dt-center">Action</th> 
                                
          </tr>
        </thead>        
        `    
        gData.forEach(r =>{
        table_result += `<tr id="ROWNUMBER:${row_number}">                     
            <td><input type="hidden" id="idM${row_number}" value="${r['id']}">${r['produit']}</td>   
            <td>${r['superficie']}</td>  
            <td>${r['nature']}</td> 
            <td>${r['pu']}</td>   
            <td>${r['pt']}</td>   
            <td>${r['site']}</td>   
            <td>${r['section']}</td>   
            <td>${r['lot']}</td>   
            <td>${r['plle']}</td>   
            <td>${r['statut']}</td>   
            <td>${r['niveau']}</td>   
            <td>${r['date']}</td>   
            // <td>${r['nature']}</td>   
             
            <td>
              <p style="color:blue;" type="button" onclick="editData(${row_number})"><i class="fa-solid fa-pen-to-square"></i></p>
              <p style="color:red;" type="button" onclick="delData(${row_number})"><i class="fa-solid fa-trash-can"></i></p>
            </td>  
                              
           </tr>` 
           row_number++        
        })
        table_result += "</table>"        
        $('#d_table').html(table_result)  

        
         $('#mainTable').DataTable({       
              
              lengthMenu: [[20,50,100], [20,50,100]] ,
              order: [[0, 'asc']],          
              
         });

         
      }else{
        alert('data not found!')
        
      }
  }

  function delData(row_number){
    const id = $('#idM'+row_number).val()
    Swal.fire({
      position: 'center',
      title: 'Confirm Delete?',         
      icon: 'warning',          
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK',
          cancelButtonText: 'Cancel'
      }).then((result) => {
          if(result.isConfirmed){ 
              Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        text: "Please Wait...",
                        showConfirmButton: false                                                    
                      }) 
                const obj = {
                  id:id                       
                }
                const obj_json = JSON.stringify(obj)
                  
                let formData = new FormData();
                formData.append('action', 'deleteData');
                formData.append('data',obj_json);        
                fetch(url, {
                     method: 'POST',
                     body: formData,       
                })
                .then(response => {        
                      return response.json()})
                .then(data => {
                     console.log(data)        
                     if(data.status == "success"){                            
                         document.getElementById('mainTable').deleteRow(document.getElementById('ROWNUMBER:'+row_number).rowIndex); 
                         Swal.fire({
                                position: 'center',
                                icon: 'success',
                                text: "Delete!",
                                timer:2000                     
                          })
                      }                               
                })
                .catch(error => {
                  console.error(error);                         
                });           
            
          }//if result.isConfirmed
      })//then      


  }
  
  function editData(row_number){
    
    const id = $('#idM'+row_number).val()
    const filterVal = gData.filter(r=>r['id'] === id)
    const name = filterVal.map(r=>r['name'])[0]
    const amount = filterVal.map(r=>r['amount'])[0]
    const category = filterVal.map(r=>r['category'])[0]
    $('#up_id').val(id)
    $('#up_name').val(name)
    $('#up_amount').val(amount)
    $('#up_category').val(category)
    $('#edit_form').show()
    $('#d_table').hide()    
     
  }

  function submitEdit(){
    document.getElementById("btn2").disabled = true
    const id =  $('#up_id').val()
    const name = $('#up_name').val()
    const amount = $('#up_amount').val()
    const category = $('#up_category').val()
    const obj = {
      id:id,
      name:name,
      amount:amount,
      category:category
    }
    const obj_json = JSON.stringify(obj)

    let formData = new FormData();
      formData.append('action', 'editData');
      formData.append('data',obj_json);        
      fetch(url, {
        method: 'POST',
        body: formData,       
      })
      .then(response => {        
        return response.json()})
      .then(data => {
        console.log(data)        
        if(data.status == "success"){   
          
          document.getElementById("btn2").disabled = false
          getDataAPI()
          closeEditEl()
        }
             
      })
      .catch(error => {
        console.error(error);
        document.getElementById("btn2").disabled = false
      });
  }

  function closeEditEl(){
    $('#up_id').val('')
    $('#up_name').val('')
    $('#up_amount').val('')
    $('#up_category').val('')
    $('#edit_form').hide()
    $('#d_table').show()
  }
  

  document.getElementById('btn1').addEventListener("click",e=>{
    addRecord()
  })
  document.getElementById('btn2').addEventListener("click",e=>{
    submitEdit()
  })
  document.getElementById('btn3').addEventListener("click",e=>{
    closeEditEl()
  })
  
  document.addEventListener('DOMContentLoaded',getDataAPI)

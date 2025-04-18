var AppsScriptLink = "AKfycbw26z64CsR-MYWhQMqnn4Mh16GljVb4sNgbELYtDMa5O6p56vpfIvY4pzODmVyGxZ599A";

window.addEventListener("load", getDataAPI, true);
var gData;
var no;
var url = "https://script.google.com/macros/s/AKfycbw26z64CsR-MYWhQMqnn4Mh16GljVb4sNgbELYtDMa5O6p56vpfIvY4pzODmVyGxZ599A/exec"
  function getDataAPI() {  
    $('#d_table').html() 
    const url1 = url+'?page=getData'   
   
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

  
  function showSendPatientTable(){    
    if(gData && gData !== undefined && gData.length != 0)
      {
      //Facture N°	Date Facture	Client	Telephone	Ville	Désignation	Quantité	Prix unitaire	Montant
      let row_number = 0
      let table_result = `<h5>Edit Table</h5><table class="table table-responsive table-bordered w3-table-all" id="mainTable" style="text-align:center;">
        <thead class="couleur" style="white-space: nowrap">
          <tr>
            <th scope='col' class="dt-center">Date Facture</th> 
            <th scope='col' class="dt-center">Client</th>                             
            <th scope='col' class="dt-center">Telephone</th> 
            <th scope='col' class="dt-center">Ville</th> 
            <th scope='col' class="dt-center"></th>  
            <th scope='col' class="dt-center"></th>            
           
                                
          </tr>
        </thead>        
        `    
        gData.forEach(r =>{
        table_result += `<tr id="ROWNUMBER:${row_number}">                     
            <td><input type="hidden" id="idM${row_number}" value="${r['id']}"> ${r['Date'].replace("00:00:00","")}</td>   
            <td>${r['Client']}</td>  
            <td>${r['Telephone']}</td>    
            <td>${r['Ville']}</td>
            <td><p type="button" onclick="foundId($('#idM${row_number}').val())" no=$('#idM${row_number}').val()><i class='fa fa-duotone fa-pen-to-square modif'></td></p>
            <td><p type="button" onclick="delData(${row_number})"><i class='fa fa-sharp fa-solid fa-trash sup' onclick='deleteData(this);'></td></p>                    
           </tr>` 
           row_number++ 
              
        })
        table_result += "</table>"        
        $('#d_table').html(table_result)  

        
         $('#mainTable').DataTable({   
             
               
                language:{
                emptyTable:"Aucune élément trouvé",
                info: "Afficher _PAGE_ sur _PAGES_",
                infoEmpty: "Aucune donnée disponible",
                loadingRecords: "Chargement...",
                processing : "En cours...",
                search: "Rechercher",
                zeroRecords: "L'élément recherché n'existe pas",
                decimal: ',',
                thousands: '.',
                lengthMenu:     "Afficher _MENU_ entrées",
                infoFiltered:   "(filtré sur _MAX_ entrées au total)",
                //url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/de-DE.json',
                
                paginate :
                    {
                    first: "Premier",
                    last: "Dernier",
                    next: "Suivant",
                    previous: "Précédent",
                    }
             }, 
              layout: 
            {
              topStart: 'buttons'
            },
            buttons: true,
            destroy: true,
            responsive: true,
            select: true,
            stateSave: true,
            ordering:true,  
            paging: true,
		        autoWidth: true,         
            order: [[0, 'desc' ]],
            pageLength: 10,
            lengthMenu: 
            [
                [10, 25, 50, 100, -1],
                ['10', '25', '50', '100', 'All']
            ],
            buttons: 
            [
             'colvis',
             'copyHtml5',
             'csvHtml5',
             'excelHtml5',
             'pdfHtml5',
             'print'
           ], 
                      
            columnDefs: 
                [{
						targets: [1, 2, 4],
						className: 'all',
					},
					{
						targets: [0],
						visible: true, //hide kolom pertama/0
						searchable: true,
					},
                    
          {
						targets: [2],
						className: 'dt-body-center',
						"render": function(data, type, row, meta) {
							if (type === 'display' && data.length > 5) 
                                {
								 data = '<a href="https://wa.me/62' + data + '?text=' + row[3] + '" target="_blank">' + '<i class="fa-brands fa-whatsapp" style="font-size:20px;color:green"></i>' + '</a>';
							    }
							return data;
						}
					},
          
					
				],
        // dom: '<"dt-buttons"Bf><"clear">lirtp',
    initComplete: function (settings, json) 
    {
			$(".dt-buttons .btn-group").append(
				'<a id="cv" class="btn btn-primary" href="#">CARD VIEW</a>'
			);
			$("#cv").on("click", function () {
				if ($("#mainTable").hasClass("card")) {
					$(".colHeader").remove();
				} else {
					var labels = [];
					$("#mainTable thead th").each(function () {
						labels.push($(this).text());
					});
					$("#mainTable tbody tr").each(function () {
						$(this)
							.find("td")
							.each(function (column) {
								$("<span class='colHeader'>" + labels[column] + ":</span>").prependTo(
									$(this)
								);
							});
					});
				}
				$("#mainTable").toggleClass("card");
			});
		}
               
              
         });

         //onclick="alert($('#idM${row_number}').val())"
      }else{
        alert('data not found!')
        
      }
  }

 function foundId(id){
    no = id;
    var mgs ="le numéro est : "
    var mge ="Pas de numéro"
    if(no!=="" && no !== undefined){
        Search(no)
        console.log(mgs+ no)

    }else{
        console.log(mge)
    }
    
    
 }
 function Search(pNo) {
    
    // if (pNo != "") no = pNo;
    $.getJSON("https://script.google.com/a/~/macros/s/" + AppsScriptLink + "/exec?page=search&no=" + pNo,
      function (data) {
        //alert(data);
        console.log(data);
        if (data == "NOT FOUND") {
          alert('Invoice No. Not Found...');
  
        }
        else {
          //var record = data;
          var record = data.record;
  
          var StartRow = data.SR;
          var RowCount = data.CNT;
  
          $('#IsNew').val('N');
          $('#StartRow').val(StartRow);
          $('#RowCount').val(RowCount);
  
          var i = 0;
          $.each(record, function (key, value) {
  
            if (i == 0) {
              var dt = value[1].substring(0, 10);
              document.getElementsByName("inv_no")[0].value = value[0];
              document.getElementsByName("inv_dt")[0].value = dt;
              document.getElementsByName("cust_nm")[0].value = value[2];
              document.getElementsByName("addr")[0].value = value[3];
              document.getElementsByName("city")[0].value = value[4];
            }
            else {
              if (i > 1) BtnAdd();
  
  
              document.getElementsByName("item_nm")[i].value = value[5];
              document.getElementsByName("qty")[i].value = value[6];
              document.getElementsByName("rate")[i].value = value[7];
              document.getElementsByName("amt")[i].value = value[8];
  
            }
  
            i = i + 1;
          });
  
          GetTotal();
          ReGenSrNo();
  
        }
      });
    $('#exampleModal').modal('hide');
  
  }
//   document.addEventListener('DOMContentLoaded',getDataAPI)

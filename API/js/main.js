window.addEventListener("load", init, true);
//https://script.google.com/macros/s/AKfycbxSfRWi-bmArc8u3mZV4FcGTTzKsuUHSlB3E5SR8RJt_kTLsigyZuPAogIgEBdyt0s9Og/exec
//https://script.google.com/macros/s/AKfycbysu7f5CP4xtqVEypJa_tkOKnTFD7lBpIq-Soy10CZvEKftmxZE2JjxtRD9iAjVX-zlfg/exec
var gData;
var img = "https://res.cloudinary.com/dkltvxk6z/image/upload/v1738868814/Maison_j1wjwa.png"
var imagOld;
var Data;
var DateF;
var DateM;
let dateg;
let tab = '';
let no;
var url = 'https://script.google.com/macros/s/AKfycbwvS7CXAHXqEUXn46EwUXYdCK_GFs309LT_dnIfKo4HQFkznfBHKPDCy7qj15vcJJHo1g/exec'
const url1 = url+'?action=getData'; 
///////////////////////////
function init() {
    getDataTab();
    SetCurrentDate();
    
  };
  ///////////
  
function getDataTab() {
    fetch(url1)
      .then(response => {
        return response.json()
      })
      .then(data => {
        Data = data.data
        getElmts(Data)
        console.log(data.data);
  
      })
      .catch(error => {
        console.error("Error in fetch:", error.message);
  
      });
  }


function getElmts() {
    if (Data && Data !== undefined && Data.length != 0) {
      let number = 0
  
      Data.forEach(r => {
        tab += `<tr id="ROWNUMBER:${number}">
          <td><input type="hidden" id="idM${number}" value="${r['id']}">${r['produit']}</td>   
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
          </tr>`
        number++
      })
  
      document.getElementById('tbody').innerHTML = tab;
      table = $('#example').DataTable(
        {
  
          "data": Data,
          "columns":
            [
              { "data": 'produit' },
              { "data": 'superficie' },
              { "data": 'nature' },
              { "data": 'pu' },
              { "data": 'pt' },
              { "data": 'site' },
              { "data": 'section' },
              { "data": 'lot' },
              { "data": 'plle' },
              { "data": 'statut' },
              { "data": 'niveau' },
              { "data": 'date' },
              { "data": 'id' },
              { "data": 'id' },
  
            ],
           
          autowidth: true,
          destroy: true,
          responsive: true,
          select: true,
          stateSave: true,
          ordering: true,
          paging: true,
          lengthMenu: true,
          pageLength: true,
          language:
          {
            processing: "Traitement en cours...",
            search: "",
            pageLengt: "Afficher _MENU_ &eacute;l&eacute;ments",
            lengthMenu: "Afficher _MENU_ &eacute;l&eacute;ments",
            info: "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
            infoEmpty: "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
            infoFiltered: "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
            infoPostFix: "",
            loadingRecords: "Chargement en cours...",
            zeroRecords: "Aucun &eacute;l&eacute;ment &agrave; afficher",
            emptyTable: "Aucune donnée disponible dans le tableau",
            paginate:
            {
              first: "Premier",
              previous: '<i class="fa-solid fa-circle-chevron-left"></i>',
              next: '<i class="fa-solid fa-circle-chevron-right"></i>',
              last: 'Dernier',
            },
            aria:
            {
              sortAscending: ": activer pour trier la colonne par ordre croissant",
              sortDescending: ": activer pour trier la colonne par ordre décroissant"
            },
            
          },
  
          order: [[0, 'desc']],
          pageLength: 10,
          lengthMenu:
            [
              [10, 25, 50, 100, -1],           
              ['10', '25', '50', '100', 'All']
            ],
          columnDefs:
            [
              {
                targets: [1, 2],
                className: 'all',
              },
              {
                targets: [0],
                visible: true, //hide kolom pertama/0
                searchable: true,
              },
              {
                targets: [11],
                className: 'dt-body-center',
                "render": function (data, type, row, meta) {
                  if (type === 'display') {
                    data = data.replace("00:00:00", "")
  
                  }   
                  return data;
                }
              },
  
              {
                targets: [12],
                orderable: false,
                className: 'dt-body-center',
                "render": function (data, type, row, meta) {
                  if (type === 'display') {
                    data = '<div type="button" class="ico" onclick="foundId(' + data + ')" no=' + row[11] + '>' + '<i class="fa fa-duotone fa-pen-to-square modif"></i>' + '</div>'
  
                  }
  
                  return data;
                }
              },
  
              {
                targets: [13],
                orderable: false,
                className: 'dt-body-center',
                "render": function (data, type, row, meta) {
                  if (type === 'display') {
                    data = '<div type="button" class="ico" onclick="foundSupId(' + data + ')" no=' + row[12] + ' >' + '<i class="fa fa-sharp fa-solid fa-trash"></i>' + '</div>';
  //no=' + row[13] + '
                  }
                  return data;
                }
              },
  
            ],
           
          layout: {
  
        
            topStart: {
              buttons: [
                {
                  extend: 'pdf',
                  text: 'PDF',
                  className: 'pdf',
                  init: function (api, node, config) {
                    $(node).hide();
                  }
                },
                {
                  extend: 'excel',
                  text: 'EXCEL',
                  className: 'excel',
                  init: function (api, node, config) {
                    $(node).hide();
                  }
                },
                {
                  extend: 'csv',
                  text: 'CSV',
                  className: 'csv',
                  init: function (api, node, config) {
                    $(node).hide();
                  }
                },
  
                {
                  extend: 'copy',
                  text: 'COPIER',
                  className: 'copie',
                  init: function (api, node, config) {
                    $(node).hide();
                  }
                },
                {
                  extend: 'colvis',
                  text: 'MASQUER',
                  className: 'mask',
                  init: function (api, node, config) {
                    $(node).hide();
                  }
                },
                {
                  extend: 'print',
                  text: 'IMPRIMER',
                  className: 'print',
                  init: function (api, node, config) {
                    $(node).hide();
                  }
                },
                {
                  extend: 'pageLength',
                  text: '10',
                  className: 'pagelen',
                  init: function (api, node, config) {
                    $(node).hide();
                  }
                },
                            
              ]
            }
          },
  
        })
      //              
      $('#btnPdf').on('click', function () {
        table.button('.pdf').trigger();
      });
  
      $('#btnExcelt').on('click', function () {
        table.button('.excel').trigger();
      });
  
      $('#btnCsv').on('click', function () {
        table.button('.csv').trigger();
      });
  
      $('#btnCopie').on('click', function () {
        table.button('.copie').trigger();
      });
  
      $('#btnMasque').on('click', function () {
        table.button('.mask').trigger();
      });
  
      $('#btnPrint').on('click', function () {
        table.button('.print').trigger();
      });
      //
      //assign a new searchbox for out table
      $('#searchBox').on('keyup', function()
      {
        table.search(this.value).draw();
      });
      //lengthMenu
      $('#btnPageL').on('click', function()
      {
        table.button('.pagelen').trigger();
      });
  
    }        
  
  }
  
  $(function () 
  {

    dialog = $("#dialog-form").dialog
      ({
  
        autoOpen: false,
        modal: true,
        Height: 400,
  
        show: {
          effect: "slide",
          duration: 700
        },
        hide: {
          effect: "clip",
          duration: 500
        },
        buttons:
        {
          Fermer: function () {
            dialog.dialog("close");
          },
        },
  
        close: function () {
          //  form[ 0 ].reset();
          // allFields.removeClass( "ui-state-error" );
        }
  
      });
  
    $("#btnNew").button().on("click", function () {
      dialog.dialog("open");
    });
  });

function SetCurrentDate() {
    const date = new Date();
    console.log(date);
  
    let d = date.getDate();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();
  
    if (d < 10) d = '0' + d;
    if (m < 10) m = '0' + m;
  
    let CurrDate = y + '-' + m + '-' + d;
    DateF = d + '/' + m + '/' + y;
    console.log(DateF);

    $('input[name="date"]').val(CurrDate);
  } 

  function dateChange()
  {
    let getDate = $('input[name="date"]').val();
    const Mdate = new Date(getDate);
    console.log(Mdate);

    let d = Mdate.getDate();
    let m = Mdate.getMonth();
    let y = Mdate.getFullYear();

    if (d < 10) d = '0' + d;
    if (m < 10) m = '0' + m;
  
    DateF = d + '/' + m + '/' + y;
    let CurrDateFA = y + '-' + m + '-' + d;
  
    console.log(DateF);
    console.log(CurrDateFA);
  }

  function dateG(dt){
    let d_st = dt.substring(0,2)
    let m_st = dt.substring(3,5)
    let y_st = dt.substring(6,10)
    dateg = y_st + '-' + m_st + '-' + d_st
    
    console.log(d_st)
    console.log(m_st)
    console.log(y_st)
    console.log(dateg)
}

  function SetCurrentId() {
    const date = new Date();
    console.log(date);
    let IdDate = date.getTime().toString();
  
    let d = date.getDate();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();
  
    if (d < 10) d = '0' + d;
    if (m < 10) m = '0' + m;
  
    let CurrDate = y + '-' + m + '-' + d;
  //1744909549506
    $("input[name='id']").val(IdDate);
  
  } 
// 
function addRecord(){
  SetCurrentId();
    document.getElementById("btn1").disabled = true
    const id = $('#id').val()
    const produit = $('#produit').val()
    const superficie = $('#superficie').val()
    const nature = $('#nature').val()
    const pu = $('#prixUnit').val()
    const pt = $('#prixT').val()
    const site = $('#site').val()
    const section = $('#section').val()
    const lot = $('#lot').val()
    const plle = $('#plle').val()
    const statut = $('#statut').val()
    const niveau = $('#niveau').val()
    const date = DateF
    const image = $('#image1').val()
    
    let imag = image
    if(imag == "")
    {
      imag = img
    }

  const obj =
  {
    id: id,
    produit: produit,
    superficie: superficie,
    nature: nature,
    pu: pu,
    pt: pt,
    site: site,
    section: section,
    lot: lot,
    plle: plle,
    statut: statut,
    niveau: niveau,
    date: date,
    image: imag
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
          viderChamps();
          getDataTab();
          let msg ="Données ajoutées avec succès !";
          let msgtext = document.getElementById("message").innerHTML       
          msgtext = msg;

        }
             
      })
      .catch(error => 
        {
        console.error(error);
        document.getElementById("btn1").disabled = false
      });
    console.log(formData);
  }
  //

  function delData(row_number){
    const id = row_number
    Swal.fire({
      position: 'center',
      title: 'Confirmez la suppression?',         
      icon: 'warning',          
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Valider',
      cancelButtonText: 'Annuler'
      }).then((result) => {
          if(result.isConfirmed){ 
              Swal.fire({
                        position: 'center',
                        icon: 'warning',
                        text: "Veuillez patienter...",
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
                         document.getElementById('example').deleteRow(('ROWNUMBER:'+row_number).rowIndex); 
                         Swal.fire({
                                position: 'center',
                                icon: 'success',
                                text: "Supprimé avec succès!",
                                timer:1000                     
                          })
                      }                               
                })
                .catch(error => {
                  console.error(error);                         
                });           
            
          }//if result.isConfirmed
      })//then      
  }
  function foundSupId(id) {
    no = id;
    if (no !== "" && no !== undefined) {
      delData(no)   
    } 
  }

  function foundId(id) {
    no = id;
   
    if (no !== "" && no !== undefined) {
      editData(no)  
    } 
  }
  
  function editData(row_number)
  {
    const filterVal = Data.filter(r=>r['id'] === row_number)
    const id = filterVal.map(r=>r['id'])[0]
    const produit = filterVal.map(r=>r['produit'])[0]
    const superficie = filterVal.map(r=>r['superficie'])[0]
    const nature = filterVal.map(r=>r['nature'])[0]
    const pu = filterVal.map(r=>r['pu'])[0]
    const pt = filterVal.map(r=>r['pt'])[0]
    const site = filterVal.map(r=>r['site'])[0]
    const section = filterVal.map(r=>r['section'])[0]
    const lot = filterVal.map(r=>r['lot'])[0]
    const plle = filterVal.map(r=>r['plle'])[0]
    const statut = filterVal.map(r=>r['statut'])[0]
    const niveau = filterVal.map(r=>r['niveau'])[0]
    const date = filterVal.map(r=>r['date'])[0]
    const image = filterVal.map(r=>r['image'])[0]
    // convert datte
    let d_st = date.substring(0,2)
    let m_st = date.substring(3,5)
    let y_st = date.substring(6,10)
    dateg = y_st + '-' + m_st + '-' + d_st
    DateF = d_st + '/' + m_st + '/' + y_st;
    // convert datte
    // console.log(d_st)
    // console.log(m_st)
    console.log(DateF)
    console.log(dateg)
    //
    $('#id').val(id)
    $('#produit').val(produit)
    $('#superficie').val(superficie)
    $('#nature').val(nature)
    $('#prixUnit').val(pu)
    $('#prixT').val(pt)
    $('#site').val(site)
    $('#section').val(section)
    $('#lot').val(lot)
    $('#plle').val(plle)
    $('#statut').val(statut)
    $('#niveau').val(niveau)
    $('#date').val(dateg)
    $('#imageOld').val(image)

    $('#dialog-form').dialog('open');

  }

  function submitEdit(){
    document.getElementById("btn2").disabled = true 
    const id = $('#id').val()
    const produit = $('#produit').val()
    const superficie = $('#superficie').val()
    const nature = $('#nature').val()
    const pu = $('#prixUnit').val()
    const pt = $('#prixT').val()
    const site = $('#site').val()
    const section = $('#section').val()
    const lot = $('#lot').val()
    const plle = $('#plle').val()
    const statut = $('#statut').val()
    const niveau = $('#niveau').val()
    const date = DateF
    const image = $('#image1').val()
    imagOld = $('#imageOld').val()

    let imag = image
    if(imag == "" && imagOld !=="")
    {
      imag = imagOld
    }else if(imagOld == "")
    {
      imag = img
    }

      const obj = 
      {
      id: id,
      produit: produit,
      superficie: superficie,
      nature: nature,
      pu: pu,
      pt: pt,
      site: site,
      section: section,
      lot: lot,
      plle: plle,
      statut: statut,
      niveau: niveau,
      date: date,
      image: imag
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
          getDataTab()
          //closeEditEl()
        }
             
      })
      .catch(error => {
        console.error(error);
        document.getElementById("btn2").disabled = false
      });
  }



  //

  function viderChamps(){
document.getElementById("produit").value = "";
          document.getElementById("superficie").value = "";
          document.getElementById("nature").value = "";    
          document.getElementById("btn1").disabled = false
  }
  document.getElementById('btn1').addEventListener("click",e=>{
    addRecord()
  })
  document.getElementById('btn2').addEventListener("click",e=>{
    submitEdit()
  })



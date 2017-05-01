out = $(document).ready(function() {
    $('#example').DataTable( {
   
    "pageLength": 15,
    "bInfo" : false,
"order": [],
         "aaSorting": [[ 2, 'asc' ]], 
    "bLengthChange": false,
    "bFilter": true,
    "bInfo": false,
    
    "bAutoWidth": false,
        "language": {
            "search": ""
          },
        "ajax": "data/objects.json",
         
        "columns": [
            { "data": "code" },
            { "data": "desc" }
        ]
        
    } );

} );


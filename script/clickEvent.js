
//Click event 

$(document).ready(function() {
  
var table = $('#example').DataTable(); $('#example tbody').on( 'mouseover', 'td', function () {    
    term = table.row( this ).data().code;
    console.log( term );
   
    //Loop through rec file
    found = $(recs.data).filter(function (i,n){return n.code == term});
    
    //Check if NAICS or CPC
    if(term.substring(0,1).match(/[A-Z]/i)==null){
                querytype = "NAICS"
                searchtype = "CPC"
            } else {
                querytype = "CPC"
                searchtype = "NAICS"
            }
    
    //Clear DIV
    $( "#recs" ).empty();   
    
    //Drop-in explanation text
    $( "#recs" ).append("<div><h4>"+ searchtype+" Codes Associated With " +querytype+ " " +term+"</h4></div>" ); 
    
    //Populate information about matches (in array)
    for(var i=0; i < found.length;i++){
        for(var k = 0; k < found[i].matches.length; k++){
            
            //For the kth match
            codetemp = found[i].matches[k].code
            scoretemp = found[i].matches[k].score;
            
            //Retrieve descriptions
            founddesc = $(refs.data).filter(function (i,n){return n.code == codetemp});
            //console.log(scoretemp);
            //console.log(codetemp);
            
            
             $( "#recs" ).append("<div><p style='font-size:16'><strong>"+ scoretemp +"%</strong>: " + codetemp +"</p></div>" ); 
            for(var j = 0; j < founddesc.length; j++){
                $( "#recs" ).append("<div><p style='font-size:12;color:grey' class='explain'>"+ founddesc[j].desc +"</p></div>" ); 
                console.log(founddesc[j].desc);
            };
            delete scoretemp;
            delete codetemp;
        }
       
        console.log(i);
    };
    
    
    }); 
} );


//Bar Graph
function barText(x){
    reps = Math.round(x/5);
    bars = "";
    for(var i=0; i < reps; i++){
        bars = bars.concat("|")
    };
    stylebar = "<span style=\"letter-spacing:-1px;font-size:150%\"><strong>"+bars + "</strong></span>"
    return(stylebar)
}

//Click event 

$(document).ready(function() {
  
var table = $('#example').DataTable(); $('#example tbody').on( 'mouseover', 'td', function () {    
    term = table.row( this ).data().code;
    termdesc = table.row( this ).data().desc;
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
    $( "#recs" ).append("<div><h4>"+ searchtype+" Codes Associated With " +querytype+ " " +term+"</h4><p>"+termdesc+"</div>" ); 
    
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
            
            
            
             $( "#recs" ).append("<div><p style='font-size:16'>"+barText(scoretemp)+ " <strong> "+ codetemp +":</strong> " + scoretemp +"%</p></div>" ); 
            for(var j = 0; j < founddesc.length; j++){
                
                if(searchtype == "CPC"){
                    urltext = "<a href=\"https://www.uspto.gov/web/patents/classification/cpc/html/def"+founddesc[j].code +".html\" target=\"_blank\">Learn about CPC Subclass "+founddesc[j].code+"</a>"
                } else {
                    urltext = "<a href=\"https://www.census.gov/cgi-bin/sssd/naics/naicsrch?code="+founddesc[j].code +"&search=2017%20NAICS%20Search\" target=\"_blank\"> Learn about NAICS "+founddesc[j].code+"</a>"
                }
                
                $( "#recs" ).append("<div><p style='font-size:12;color:grey' class='explain'>"+ founddesc[j].desc +"("+urltext+")</p></div>" ); 
                console.log(founddesc[j].desc);
            };
            delete scoretemp;
            delete codetemp;
            delete urltext;
        }
       
        console.log(i);
    };
    
    
    }); 
} );


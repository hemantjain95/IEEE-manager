	
	// code for changing file name and parsing website
	var folder = "PDFdownloads";
	var x;
	var z;
	var u;
	var name;
	chrome.downloads.onDeterminingFilename.addListener(			//event listener 
	function (downloadItem, suggest) 
	{	///window.alert(downloadItem.url);
	  	//window.alert("inside downloads");
		if (/^https?:\/\/ieeexplore\.ieee\.org.*/.test(downloadItem.referrer))		//checking that the site is ieee 
		{ 	
			name=downloadItem.filename;
			x=downloadItem.url;
			//window.alert("match done")
	        folder="IEEEDownloads";													//changing the fodername
	        //window.alert(String(downloadItem.referrer));
	    	z=downloadItem.referrer;
	      	var res = z.split("arnumber=");
	      	var res1 = res[1].split("&");
	      	//alert(res1[0]);
	      	console.log(res1[0]);
	      	u="http://ieeexplore.ieee.org/xpl/articleDetails.jsp?tp=&arnumber="+res1[0];
	      	console.log(u);
	      	$.get(u, function(data) 												//function for parsing the webpage
	      	{	data = data.replace(/(<meta.*[^\/])>/g, "$1/>");
   				console.log(data);
				$(data).find('a').each(function()
   				{
   					console.log($(this).text());
					if($(this).text().indexOf("Full Text as PDF")>=0)
   					{
   							//alert($(this).text());
   					}
	 			});
	 			$(data).find('h1').each(function()
   				{	name="";
   					console.log($(this).text());
   					//alert($(this).text());
   					name=$.trim($(this).text());
   					name=name.replace(" ","");
   					//alert(name);
				});
	 			var text="";
	 			var index;
	 			var res2 = data.match(/<meta name="citation_author" content.*/g);
	 			if(res2!=null)
	 			{
	 				console.log(res2[0]);
	 				console.log(res2.length);
	 				for	(index = 0; index < res2.length; ++index) 
	 				{	
	 					res2[index] = res2[index].split('content="')[1];
	 					console.log(res2[index]);
	      				res2[index] = res2[index].split('"')[0];
	      				console.log(res2[index]);
	      				//alert(res2[index]);
 						text += res2[index]+"-";
					}
					name=text+name;
	 				//alert(text);
	 			}
	 			var res3 = data.match(/<meta name="citation_date" content=.*/g);
	 			if(res3!=null)
	 			{	
	 				console.log(res3[0]);
	 				console.log(res3.length);
	 				text="";
	 				for	(index = 0; index < res3.length; ++index) 
	 				{	
	 					res3[index] = res3[index].split('content="')[1];
	 					console.log(res3[index]);
	      				res3[index] = res3[index].split('"')[0];
	      				console.log(res3[index]);
	      				//alert(res3[index]);
 						text += "-"+res3[index];
					}
				}	
					name+=text;
					name=name.replace( /\s/g,"_");
					//alert(name.length);
					if(name.length>150)
					{	//alert("X");
						name=name.substring(0,150);
						//alert(name);
	 				}
	 				//alert(text);
	 				//alert("hi");
	 				//alert(name);
	 				suggest({filename: folder + "/" + name});								//change file name
	 				//alert("hi");
	 				/*
	 				$(data).find('meta').each(function()
   					{
   						console.log($(this).text());
   						//alert($(this).text());
   						alert($(this).attr('content'));
   						console.log($(this).attr('content	'));
						
	 				});*/
	 		});	
			return true;
			/*														//foe asynchronous execution
			if(isPDF(downloadItem))
	    	{	alert("lame");
	    	 	suggest({filename: folder + "/" + name});
	    	}
	    	else suggest();

	    	*/
 		}
	    	
	});

	function isPDF(item)
	{
	  if(item.mime === "application/pdf") return true;
	  else if (item.filename.match(/\.pdf$/i)) return true;
	  else return false;
	}

/*
**************************************commented code*********************************************************************************************
var y;

	chrome.tabs.getSelected(null, function(tab) {
    alert("current:"+tab.url);
    y=tab.url;
});

var title;
var data; 
chrome.tabs.onActivated	.addListener( function(activeInfo){
  chrome.tabs.get(activeInfo.tabId, function(tab){
    y = tab.url;

    
    
$.get(y, function(data) {
   	console.log(data);
   	$(data).find('a').each(function() {
   		console.log($(this).text());

   		if($(this).text().indexOf("Full Text as PDF")>=0)
   		{	alert($(this).text());
   			$(this).on("click", function()
            {	event.preventDefault( );
            	console.log("link clicked");
                alert("link clicked");
            });
	     }
	 });
   	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    console.log(changeInfo);
    if(changeInfo.status == "loading") {
    	alert("hii");
    	chrome.history.search({text: '', maxResults: 10}, function(data){
   		alert(data[0].url);
   	
   		console.log(data);
   	});
        
    }
});
   	chrome.history.search({text: '', maxResults: 10}, function(data){
   		alert(data[0].url);
   	
   		console.log(data);
   	});
 //   	var datahtml = $(y).html();

	// $(datahtml).find('a').each(function() {
	//     alert($(this).attr('href'));
	// });
	//         data = $(data);
	//          title = $("p").html(data);
	//          var htmlString = $( this ).html();
	//          alert(htmlString);
	//         alert(title);
	//       });

	//    $("p").load( y, function() {
	//   alert( "Load was performed." );
	// });
	//         var xhr = new XMLHttpRequest();
	// 	xhr.open('GET',y);
	// xhr.onload = function() {
	//     var doc = xhr.response;
	//     // Nou can use jQuery, since the string has been parsed.
	//     alert("working");
	// };
	// xhr.responseType = 'document'; // Chrome 18+
	// xhr.send();
	  
	//   })
});
});
});
*/
// $(document).ready(function() {
//       $( "#result" ).load( y, function() {
//   alert( "Load was performed." );
// });
//    });


	/*
	chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {

     // since only one tab should be active and in the current window at once
     // the return variable should only have one entry
     var activeTab = arrayOfTabs[0];
     y= arrayOfTabs[0].url; // or do whatever you need

  });

*/	



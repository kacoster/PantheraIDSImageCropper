//function fetchServerData(csvfile,moduleId)
//{
//  if(moduleId === "img_clssfctn_ud"){setImageArray(loadFile(csvfile))}
//  if(moduleId === "ct_vldt_img_trggr_tbl_vldtn_9") {setValidationArray(loadFile(csvfile),9)}
//  if(moduleId === "ct_vldt_img_trggr_tbl_vldtn_10"){setValidationArray(loadFile(csvfile),10)}
//  if(moduleId === "ct_vldt_img_trggr_tbl_vldtn_11"){setValidationArray(loadFile(csvfile),11)}
//  if(moduleId === "ct_vldt_img_trggr_tbl_vldtn_12"){setValidationArray(loadFile(csvfile),12)}
//}

async function loadFile(filename) {
  //console.log("In loadFile");
  let response = await fetch(filename,{cache: "no-cache"});
            //proceed once the first promise is resolved.
    if(response.ok){
      let data = await response.text();
      return (data.replace(/^\s*$[\n\r]{1,}/gm, ''));
    }
    return 0;
}

/*async function getData(filename) 
        {
            //await the response of the fetch call
           let response = await fetch(filename,{cache: "no-cache"});
            //proceed once the first promise is resolved.
            if(response.ok){
              let data = await response.text();
              //console.log(response.status);
              return (data.replace(/^\s*$[\n\r]{1,}/gm, ''));
            }
            return 0;
            
          
            //proceed only when the second promise is resolved
          
    } 
//call getData function
loadFile()
.then(data => console.log(data));//log t*/ 


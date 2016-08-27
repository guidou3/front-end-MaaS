syntax collection = function(ctx){
let params= ctx.next().value.inner();
let body = ctx.next().value.inner();
let label = #``;
let name =#``;
let id=#``;
let weight=#``;
let perpageIndex=#``;
let populateIndex=#``;
let sortbyIndex=#``;
let orderIndex=#``;
let queryIndex=#``;
let populateShow=#``;
let rows =#``;
let columns=#``;
for(let param of params){
   if(param.isIdentifier('label')){
       params.next();
       label = params.next('expr').value;
   }
   if(param.isIdentifier('name')){
       params.next();
       name = params.next('expr').value;
   }
   if(param.isIdentifier('weight')){
       params.next();
       weight = params.next('expr').value;
   }
   if(param.isIdentifier('id')){
       params.next();
       id = params.next('expr').value;
   }
}
//controllare se sono state trovate label e name e che siano uniche
let index =body.next().value;
if(index.isIdentifier('index')){
  let indexA = body.next().value.inner();

  for(let attribute of indexA){
      if(attribute.isIdentifier('perpage')){
         indexA.next();
         perpageIndex=indexA.next().value;
      }
      if(attribute.isIdentifier('populate')){
        indexA.next();
        populateIndex=indexA.next().value;
      }
      if(attribute.isIdentifier('sortby')){
         indexA.next();
         sortbyIndex=indexA.next().value;
      }
      if(attribute.isIdentifier('order')){
         indexA.next();
         orderIndex=indexA.next().value;
      }
      if(attribute.isIdentifier('query')){
         indexA.next();
         queryIndex=indexA.next().value;
      }
 }
  let indexB=body.next().value.inner();
  for(let column of indexB){
     if(column.isIdentifier('column')){
        let columnParams=indexB.next().value.inner();
        for(let columnParam of columnParams){
           if(columnParam.isIdentifier('label')){
              columnParams.next();
              columns = columns.concat(columnParams.next().value);
           }
           if(columnParam.isIdentifier('name')){
              columnParams.next();
              columns = columns.concat(columnParams.next().value);
           }
           if(columnParam.isIdentifier('sortable')){
              columnParams.next();
              columns = columns.concat(columnParams.next().value);
           }
           if(columnParam.isIdentifier('selectable')){
              columnParams.next();
              columns = columns.concat(columnParams.next().value);
           }
           if(columnParam.isIdentifier('transformation')){
              columnParams.next();
              columns = columns.concat(columnParams.next().value);
           }

        }
     }
     indexB.next();
  }
  }
  //da mettere obbligatorio che deve leggere almeno una riga?

let show =body.next().value;
if(show.isIdentifier('show')){
  let showP = body.next().value.inner();
  //controllare se PopulateI è vuoto o meno
  let populateI = showP.next().value;
  if(populateI.isIdentifier('populate')) {
     showP.next();
     populateShow =showP.next().value;
  }
  let showB=body.next().value.inner();
  for(let row of showB){
     if(row.isIdentifier('row')){
        let rowParams=showB.next().value.inner();
        for(let rowParam of rowParams){
           if(rowParam.isIdentifier('label')){
              rowParams.next();
              rows = rows.concat(rowParams.next().value);
           }
           if(rowParam.isIdentifier('name')){
              rowParams.next();
              rows = rows.concat(rowParams.next().value);
           }
        }
     }
     showB.next();
  }
  //da mettere obbligatorio che deve leggere almeno una riga?

}
//lancia l'errore che non è stato trovato lo show oppure c'era altro prima scritto
//da controllare che non manchi l'index e stare attenti che non si inseriscano le cose dopie?
//controllare la posizione dell'inerimento se si inverte index e show al contrario si sminchia

return #`insert(new collection(${name}, ${label}, ${id}, ${weight}, ${perpageIndex}, ${populateIndex}, ${sortbyIndex}, ${orderIndex}, ${queryIndex}, [${columns}], ${populateShow}, [${rows}]));`;
}

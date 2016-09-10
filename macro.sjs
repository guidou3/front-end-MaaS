//--------------------Dashboard---------------------------------------
syntax readParams = function(ctx){
let params=ctx.next().value.inner();

let x = undefined;
x= #``;
for(let stx of params){
  params.next();
  let param = params.next('expr').value;
  x = x.concat(#`${stx}: ${param}`);
  params.next();
}
  return #`{${x}}`;
}
syntax rowsDashboard = function(ctx){

let y = #``;
let rowB = ctx.next().value.inner();
for(let rows of rowB){
   if(rows.isIdentifier('row')){
     y=y.concat(#`readParams ${rowB.next().value}`);
  }
}
  return#`[${y}]`;
}

syntax dashboard = function(ctx){
  let params = ctx.next().value.inner();
  let body = ctx.next().value;
  let name =#``;
  for(let param of params){
    params.next();
    let m= params.next('expr').value;
    name = name.concat(#`${param}:${m}`);
    params.next();
  }
  let paramsValue = #`{${name}}`;

  let bodyValue = #`rowsDashboard ${body}`;
return #`insert(new dashboardModel(${paramsValue}, ${bodyValue}))`;
}

//--------------------Collection--------------------------------------
syntax collection = function(ctx){
let params= ctx.next().value.inner();
let body = ctx.next().value.inner();
let label = #``;
let paramValue =#``;
let perpageIndex=#``;
let populateShow=#``;
let rows =#``;
let columns=#``;
let showObject=#``;
let columnDDD=#``;
let columnObject=#``;
for(let param of params){
   if(!(param.isParens())){
       params.next();
       let c = params.next('expr').value;
       label = label.concat(#`${param} :${c}`);
       params.next();
  }
}
  paramValue = #`{param : {${label}}}`;

let index =body.next().value;
if(index.isIdentifier('index')){
  let indexA = body.next().value.inner();

  for(let attribute of indexA){
    indexA.next();
    let perpageIndexValue =indexA.next().value;
    perpageIndex= perpageIndex.concat(#`${attribute}:${perpageIndexValue}`);
    indexA.next();
 }
  columnDDD = #`param:{${perpageIndex}}`;
  let indexB=body.next().value.inner();
  let c = #``;
  for(let column of indexB){
     if(column.isIdentifier('column')){
       let d = #``;
        let columnParams=indexB.next().value.inner();
        for(let columnParam of columnParams){
              columnParams.next();
              let columValue = columnParams.next().value;
              d = d.concat(#`${columnParam} : ${columValue}`);
              columnParams.next();
        }
        c = c.concat(#`{${d}}`);
     }
     indexB.next();
  }
  columns = #`columns:[${c}]`;
  columnObject = #`{${columnDDD}, ${columns}}`;
  }

let show =body.next().value;
if(show.isIdentifier('show')){
  let showP = body.next().value.inner();
  let populateI = showP.next().value;
  if(populateI.isIdentifier('populate')) {
     showP.next();
     let populateX = showP.next().value;
     populateShow = populateShow.concat(#`${populateI}:${populateX}`)
  }
  let showB=body.next().value.inner();
  let b = #``;
  for(let row of showB){
     if(row.isIdentifier('row')){
       let a = #``;
        let rowParams=showB.next().value.inner();
        for(let rowParam of rowParams){
              rowParams.next();
              let rowValue = rowParams.next().value;
              a = a.concat(#`${rowParam} : ${rowValue}`);
              rowParams.next();
        }
        b = b.concat(#`{${a}}`);
     }
     showB.next();
  }
  rows = #`rows:[${b}]`;
  showObject=#`{${populateShow}, ${rows}}`;


}

return #`insert(new collectionModel(${paramValue},${columnObject}, ${showObject}));`;
}

//------------------- Document----------------------------------------
syntax document = function(ctx){
 let params= ctx.next().value.inner();
 let body = ctx.next().value.inner();
 let dataParam = #``;
 let dataParams = #``;
 let populate=#``;
 let rows =#``;
 for(let param of params){
        params.next();
        let c = params.next('expr').value;
        dataParam = dataParam.concat(#`${param} : ${c}`);
        params.next();

  }
 dataParams = #`{${dataParam}}`;

 let show =body.next().value;
 if(show.isIdentifier('show')){
   let showP = body.next().value.inner();
   let populateI = showP.next().value;
   if(populateI.isIdentifier('populate')) {
      showP.next();
      let populateX =showP.next().value;
      populate = populate.concat(#`{${populateI}:${populateX}}`);
   }
   let showB=body.next().value.inner();
   let rowl = #``;
   for(let row of showB){
      if(row.isIdentifier('row')){
         let rowk=#``;
         let rowParams=showB.next().value.inner();
         for(let rowParam of rowParams){
               rowParams.next();
               let c = rowParams.next().value;
               rowk = rowk.concat(#`${rowParam} : ${c}`);
               rowParams.next();
         }
         rowl = rowl.concat(#`{${rowk}}`);
      }
      showB.next();
   }
   rows = #`[${rowl}]`;
 }
  return #`insert(new documentModel(${dataParams},${populate},${rows}));`;
}


//------------------- Cell--------------------------------------------
syntax cell = function(ctx) {
  let params = ctx.next().value.inner();
  let dataReturn = #``;
  for (let stx of params) {
    // eat ':'
    params.next();

      let param = params.next('expr').value;
      dataReturn = dataReturn.concat(#`${stx}: ${param}`);

    // eat ','
    params.next();
  }
  return #`insert(new cellModel({${dataReturn}}));`;
}

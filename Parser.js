var sjs = require ('sweet.js');
var fs = require('fs');
var vm = require('vm');

class Parser{
  constructor(){
    this.macro=fs.readFileSync(`macro.sjs`, "utf-8");
    console.log(this.macro);
  }
 compileAndRun(dslFilePath){
    var DSLFile=fs.readFileSync(dslFilePath, "utf-8");
    DSLFile = `${this.macro}\n\n${DSLFile}`;
    var out =null;
    out=sjs.compile(DSLFile);
    //console.log(out);
    var x =[];
    function insert(coll){
        x.push(coll);
    }
    vm.runInNewContext(out.code, {insert:insert,require:require, console: console,});
    console.log(x[0]);
  }
}

module.exports = Parser;

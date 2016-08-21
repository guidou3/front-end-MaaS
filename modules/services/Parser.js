//import Sjs from 'sweet.js'
var sjs;

const getModule = (sjs, cb) =>
  require.ensure([], require => cb(require(`./${sweet.js}`).default));
var fs = require('fs');
var vm = require('vm');

class Parser{
   constructor(){
     //this.macro=fs.readFileSync(`macro.sjs`, "utf-8");
     console.log("MACRO:"/*+this.macro*/);
   }

   compileAndRun(dslFilePath){
     console.log("passed from compile&run")
      /*var DSLFile=fs.readFileSync(dslFilePath, "utf-8");
      DSLFile = `${this.macro}\n\n${DSLFile}`;
      var out =null;
      out=sjs.compile(DSLFile);
      //console.log(out);
      var x =[];
      function insert(coll){
          x.push(coll);
      }
      vm.runInNewContext(out.code, {insert:insert,require:require, console: console,});
      console.log(x[0]);*/
    }
  }

export default Parser

  /*jshint esversion: 6 */
  /*
   * Name : cell.js
   * FrontEnd::Model::CellModel
   * Location : /model/
   *
   * History :
   *
   * Version         Date           Programmer
   * =================================================
   * 0.0.1           2016-07-12     Zamberlan Sebastiano
   * 0.0.2           2016-08-15     Berselli Marco
   * 0.0.3           2016-08-22     Berselli Marco
   * 0.1.0           2016-01-09     Zamberlan Sebastiano
   * -------------------------------------------------
   * Codifica modulo
   * =================================================
   */

  /*jshint esversion: 6 */
  import
  {
    executeQuery
  }
  from '../utils/DSLICompiler'
  import * as actions from '../actions/RootAction'
  import React from 'react'
  import AttributeReader from '../utils/AttributeReader'
  import MaasError from "../utils/MaasError";

  class CellModel
  {
    constructor(params)
    {
      var self = this;
      this.label = undefined;

      //Lettura Attributi Obbligatori
      AttributeReader.readRequiredAttributes(params, this, [
        "label", "type", "value"
      ], function(param)
      {
        throw new MaasError(8000,
          "Required parameter '" + param + "' in cell '" +
          self
          .toString() + "'");
      });

      //Lettura Attributi con valore vuoto
      AttributeReader.assertEmptyAttributes(params, function(param)
      {
        throw new MaasError(8000,
          "Unexpected parameter '" + param + "' in cell '" +
          self.toString() + "'");
      });

      if (typeof this.value == "object")
      {
        //Lettura Attributi Obbligatori
        AttributeReader.readRequiredAttributes(this.value, this, [
          "collection"
        ], function(param)
        {
          throw new MaasError(8000,
            "Required parameter '" + param +
            "' in cell.value '" + self.toString() + "'");
        });

        this.sortby = "{'_id': 1}";
        this.order = "asc";
        this.count = false;

        //Lettura Attributi Opzionali
        AttributeReader.readOptionalAttributes(this.value, this, [
          "query", "sortby", "orderby", "count", "select"
        ]);

        //Lettura Attributi con valore vuoto
        AttributeReader.assertEmptyAttributes(this.value,
          function(param)
          {
            throw new MaasError(8000,
              "Unexpected parameter '" + param +
              "' in cell.value '" + self.toString() + "'");
          });
      }


      if (typeof this.value != "string" && typeof this.value !=
        "number" && typeof this.value != "object")
      {
        throw new MaasError(8000,
          "Unexpected value in cell.value '" + self.toString() +
          "'");
      }
    }

    //Metodi della Classe

    //Metodi Get
    getLabel()
    {
      return this.label;
    }

    getType()
    {
      return this.type;
    }

    //Metodo Costruzione Query
    buildQuery()
    {
      if (typeof this.value == "string" || typeof this.value ==
        "number")
      {
        console.log(this.value);
        return this.value;
      }
      else
      {
        if (typeof this.value == "object")
        {
          var findQuery = "db.collection('" + this.collection +
            "')";
          if (this.query)
          {
            var sostituition1 = this.query.replace("<","'");
            var sostituition2 = sostituition1.replace("<","'");
            this.query = sostituition2;
            if (!this.select)
            {
              this.select = "{_id: 1}";
            }
            findQuery = findQuery + ".find(" + this.query + "," +
              this.select + ")";
          }
          else
          {
            if (!this.select)
            {
              findQuery = findQuery + ".find({},{_id : 1})";
            }
            else
            {
              findQuery = findQuery + ".find({},{" + this.select +
                ":1, _id : 0})";
            }
          }
          if (this.order == "desc")
          {
            var completeQuery = findQuery + ".sort(-" +
              this.sortby + ").limit(1)";
          }
          else
          {
            var completeQuery = findQuery + ".sort(" +
              this.sortby + ").limit(1)";
          }
          if (this.count == true && typeof this.count == "boolean")
          {
            return "db.collection('" + this.collection +
              "').aggregate([{ $match:" + this.query +
              " },{ $group: { _id: null, count: { $sum: 1 } } }])";
          }
          else
          {
            return completeQuery;
          }
        }
      }
    }

    //Metodo di specifica del tipo di DSL
    DSLType()
      {
        return "cell";
      }
      //Metodo Costruzione JSON
    JSONbuild(queryResult)
    {
      return {
        "properties":
        {
          "label": this.label,
          "DSLType": this.DSLType(),
          "returnType": this.getType()
        },
        "data":
        {
          "result": queryResult
        }
      };
    }

    valueIsQuery()
    {
      if (typeof this.value == "object")
      {
        return true;
      }
      else
      {
        return false;
      }
    }

  render(store)
  {
    if (this.valueIsQuery())
    {
      var query = this.buildQuery();
      if (this.flag)
      {
        this.flag = false;
        executeQuery(store.getState().currentDSLI, query, store.getState()
          .loggedUser.token, (err, res) =>
          { //LAUNCH OF A QUERY
            if (err) //CALLBACK FUNCTION WHERE QUERY ENDS
              return;
            this.storageResult = Object.assign(
            {}, res);
            store.dispatch(actions.refresh()); //CALL RENDER TO DISPLAY DATA
          });
      }
      this.JSON = this.JSONbuild(this.storageResult);
      this.show = true;
    }
    else
    {
      this.JSON = this.JSONbuild(this.buildQuery());
      this.show = true;
    }
    if (!this.show)
      return <div > Eseguendo le query... < /div>
    else
      return <div > Ciao, sono una CELLA! <
        /div>                                       //RENDER CODE HERE, DATI IN JSON
  }
};

  export default CellModel

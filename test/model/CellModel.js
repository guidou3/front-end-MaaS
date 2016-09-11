import React from 'react';
import
{
  shallow
}
from 'enzyme';
import expect from 'expect'
import CellModel from '../../modules/model/CellModel'
  /*function setup()
  {
    const enzymeWrapper = shallow(new CellModel(data));
    return enzymeWrapper;
  }*/
let data = {
  label: "prova",
  type: 'number',
  value: 21
};

let cell = new CellModel(data);
let query = cell.buildQuery();

describe("CellModel", function()
{
  describe("GetLabel()", function()
  {
    it("it should show the label of the CellModel", function()
    {
      expect(cell.getLabel()).toBe("prova");
    })
  })
  describe("GetType()", function()
  {
    it("it should show the type of the CellModel", function()
    {
      expect(cell.getType()).toBe("number");
    })
  })
  describe("buildQuery()", function()
  {
    it("it should build the query of of the CellModel",
      function()
      {
        expect(cell.buildQuery()).toBe(21);
      })
  })
  describe("JSONBuild()", function()
  {
    it("it should build the JSON of the mongo query",
      function()
      {
        expect(cell.JSONbuild(query)).toEqual(
        {
          "data":
          {
            "result": 21
          },
          "properties":
          {
            "label": "prova",
            "dsl": "cell",
            "returnType": "number",
          }
        });
      })
  })
  describe("DSLType()", function()
  {
    it("it should show the DSLType of the CellModel",
      function()
      {
        expect(cell.DSLType()).toBe("cell");
      })
  })
  describe("ValueisQuey()", function()
  {
    it("it should return true if value is an Object",
      function()
      {
        expect(cell.valueIsQuery()).toBe(false);
      })
  })
})

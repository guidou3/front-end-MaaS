/*
* Name : DSLIList.js
* Location : ./modules/reducers/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.1.0           2016-08-20     Guido Santi
* -------------------------------------------------
* Codifica modulo
* =================================================
* 0.2.0           2016-08-22     Guido Santi
* -------------------------------------------------
* Modifica modulo
* =================================================
*/
export default function DSLIListReducer(state = 0, action) {
	switch(action.type) {
		case 'getDSLIList':
			return action.listDSLI

		case 'embodyUser':
		case 'logout':
			return 0
		default:
			return state
	}
}

/*
case 'renameDSLI':
{
var temp = Object.assign({}, state)
for (var i=0; i < temp.length; i++)
	if (temp[i].name === action.oldName)
		temp[i].name = action.newName
return temp
}
case 'newDSLI':
{
var temp = Object.assign({}, state)
temp.push({
	id: action.DSLI.id,
	name: action.DSLI.name,
	permit: action.DSLI.permit //da rivedere -> dovrebbe essere sempre quello per quelli creati
})
}
case 'cloneDSLI':
{
var temp = Object.assign({}, state)
temp.push({
	id: action.DSLI.id,
	name: action.DSLI.name,
	permit: action.DSLI.permit //da rivedere -> dovrebbe essere sempre quello per quelli creati
})
}
case 'deleteDSLI':
{
var temp = Object.assign({}, state)
temp.splice(array.indexOf(action.DSLI.id), 1);
return temp
}
*/

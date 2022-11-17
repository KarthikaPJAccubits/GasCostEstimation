export const DefaultValue = async (type:any,input:any) => {
    
	var returnVal = (type=="string")? "qwert":
	(type=="address")?"0x9cf2805ABA77Afef651E99363F7A838E2489cf3D":
	(type.includes("uint"))?1:
	(type=="bytes4")?"0x00340078":
	(type=="bytes")?"0x00340078":
	(type==("bytes32"))?"0x626c756500000000000000000000000000000000000000000000000000000000":"";
  
    if(returnVal ==""){
    
        switch(type)
        {
            case "tuple":
                var returnTuple:any = [];
              await  input.components.forEach((item:any) => {
                    var itemValue = DefaultValue(item.type,item);
                    returnTuple.push(itemValue);
                });
                return returnTuple
            case "tuple[]":
                var returnTuple:any = [];
                var insideTuple:any = [];
               await input.components.forEach((item:any)=> 

                {
                    var itemValue = DefaultValue(item.type,item);
                    insideTuple.push(itemValue);
                    returnTuple.push(insideTuple);
                });
                return returnTuple
            default:
            
                return undefined;
                break;
        }
    }
    else
    {
        
        return returnVal;
    }
}

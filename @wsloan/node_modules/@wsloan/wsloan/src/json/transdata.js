var data = require('@wsloan/wsloan/src/json/address.json')
var provinceList = []
data.forEach((item)=>{
    !item.parent && provinceList.push({
        "name":item.name,
        "value":item.value
    })

    if(item.parent){
         provinceList.forEach((list)=>{
        // 
        if(item.parent === list.value){
            !list["cityList"] && (list["cityList"] = [] );
            list["cityList"].push({
                "name":item.name,
                "value":item.value

            })
        }
        //
        !list.cityList && (list.cityList = [] );
        var city = list.cityList.forEach((city)=>{
            if(city.value === item.parent){

                !city.areaList && (city.areaList = []);
                city.areaList.push(item.name) 
            } 
        })
        // console.log(city)
        
    })
}
    
})
console.log(provinceList)
console.log(JSON.stringify(provinceList))
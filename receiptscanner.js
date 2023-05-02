(async function(){
 
    var raw = await fetch('https://interview-task-api.mca.dev/qr-scanner-codes/alpha-qr-gFpwhsQ8fkY1');
    var resp = await raw.json();
 
    var resp = resp.map(function(x){
        x.priceFormatted = x.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        x.weightFormatted = x.weight == null ? "N/A" : x.weight + "g";
        x.descriptionFormatted = x.description.substr(0, 10) + "..."; 
        return x;
    });
 
    var domestic = resp.filter((x) => x.domestic).sort((x, y) => x.name.localeCompare(y.name));
    var imported = resp.filter((x) => !x.domestic).sort((x, y) => x.name.localeCompare(y.name));
 
    var domesticCost = domestic.map((x) => x.price).reduce((x, y) => x + y);
    var importedCost = imported.map((x) => x.price).reduce((x, y) => x + y);
 
    var domesticCount = domestic.length;
    var importedCount = imported.length;
 
    console.log(".Domestic");
    domestic.forEach((x) => console.log(`... ${x.name}\n\tPrice: ${x.priceFormatted}\n\t${x.descriptionFormatted}\n\tWeight: ${x.weightFormatted}`));
 
    console.log(".Imported");
    imported.forEach((x) => console.log(`... ${x.name}\n\tPrice: ${x.priceFormatted}\n\t${x.descriptionFormatted}\n\tWeight: ${x.weightFormatted}`));
 
    console.log("Domestic cost: " + domesticCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));
    console.log("Imported cost: " + importedCost.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));
 
    console.log("Domestic count: " + domesticCount);
    console.log("Imported count: " + importedCount);
 
})();
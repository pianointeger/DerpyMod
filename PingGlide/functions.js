function getBlockColor(blocker) {

  let blockerColor;

  let colorList = ["purple", "red", "light_blue", "lime", "orange", "yellow", "white", "green", "blue", "black", "brown", "magenta"];
  for (let i = 0; i < colorList.length; i++) {
    if(blocker.includes(colorList[i]) && blocker.includes("glass")) {
      blockerColor = colorList[i];
      break;
    }
    else {
      blockerColor = "none";
    }
  }
  return blockerColor;

}
function getGemstoneType(blockColor1) {

  let gemstoneType;

  switch(blockColor1) {

    case "purple":
      gemstoneType = "amethyst";
      break;
    case "red":
      gemstoneType = "ruby";
      break;
    case "light_blue":
      gemstoneType = "sapphire";
      break;
    case "lime":
      gemstoneType = "jade";
      break;
    case "orange":
      gemstoneType = "amber";
      break;
    case "yellow":
      gemstoneType = "topaz";
      break;
    case "white":
      gemstoneType = "opal";
      break;
    case "green":
      gemstoneType = "peridot";
      break;
    case "blue":
      gemstoneType = "aquamarine";
      break;
    case "black":
      gemstoneType = "onyx";
      break;
    case "brown":
      gemstoneType = "citrine";
      break;
    case "magenta":
      gemstoneType = "jasper";
      break;

    default:
      gemstoneType = "none";
      break;
  }
  return gemstoneType;


}
function getHardness(gemType1) {

  let hardness;

  switch(gemType1) {
    case "amethyst":
      hardness = 3000;
      break;
    case "ruby":
      hardness = 2300;
      break;
    case "sapphire":
      hardness = 3000;
      break;
    case "jade":
      hardness = 3000;
      break;
    case "amber":
      hardness = 3000;
      break;
    case "topaz":
      hardness = 3800;
      break;
    case "opal":
      hardness = 3000;
      break;
    case "peridot":
      hardness = 5200;
      break;
    case "aquamarine":
      hardness = 5200;
      break;
    case "onyx":
      hardness = 5200;
      break;
    case "citrine":
      hardness = 5200;
      break;
    case "jasper":
      hardness = 4800;
      break;
    default:
      hardness = 0;
      break;
  }
  return hardness;

}


function calculateTicks(paramHardness, paramMiningSpeed) {
 
  let ticks;
 
  if (paramHardness != 0){
    ticks = Math.ceil((paramHardness*30)/paramMiningSpeed); 
    if (ticks % 1 < 0.5) {
      ticks = Math.floor(ticks);
    }
    else {
      ticks = Math.ceil(ticks);
    }
    return ticks;
  }

}



export { getBlockColor }
export { getGemstoneType }
export { getHardness }
export { calculateTicks }

import RenderLibV2 from "../../RenderLibV2";
import { getBlockColor } from "./functions.js"
import { getGemstoneType } from "./functions.js"
import { getHardness } from "./functions.js"
import { calculateTicks } from "./functions.js"
import { clearTimeout } from "../../setTimeout/index.js";
import { setTimeout } from "../../setTimeout/index.js";
import settings from "../GUI/config.js";


let ticks;

let blockType;

let isMining = false;

let isSwitchOn = false;

let currentBlock;

let isBreaking = false;

let delay = 0;

let isBroken = false;

let timeOut1 = null;

let timeOut2 = null;

let block1;

let targetBlock = null;

let targetBlockPos = null;

let miningSpeedScalar = 1;

let hitblock1;

let click1 = null;

let tick1 = null;

let render1 = null;

let mining = 1000;

function clearTimer(){

  if(timeOut1)
    clearTimeout(timeOut1)
    timeOut1 = null
  if(timeOut2)
    clearTimeout(timeOut2)
    timeOut2 = null

}


register("chat", () => {

  if(settings.miningSpeedBoostScalar){
    miningSpeedScalar = 1 + (settings.miningSpeedBoostScalar/100)
  }

}).setCriteria("You used your Mining Speed Boost Pickaxe Ability!").setContains();


register("chat", () => {

  if(settings.miningSpeedBoostScalar){
    miningSpeedScalar = 1
  }

}).setCriteria("Your Mining Speed Boost has expired!").setContains();


if(settings.PingGlideSwitch){
  pingGlideFeature()
}


settings.getConfig().registerListener("PingGlideSwitch", () => {

  if(settings.PingGlideSwitch){
    pingGlideFeature()
  }

  else{
    pingGlideCancel()
  }

})


function pingGlideFeature(){

  hitblock1 = register("Hitblock", () => {

    block1 = Player.lookingAt();
    isBroken = false;

    clearTimer()

    isSwitchOn = false;
    targetBlock = null;
    targetBlockPos = null;

    try {

      blockType = block1.getState().toString();

    } catch (e) {

      return;

    }

    if(settings.TextInput && settings.miningSpeedBoostScalar){
      ticks = calculateTicks(getHardness(getGemstoneType(getBlockColor(blockType))), (settings.TextInput * miningSpeedScalar));
    }

    else if(mining){
      ticks = calculateTicks(getHardness(getGemstoneType(getBlockColor(blockType))), (mining * miningSpeedScalar));
    }

    delay = ticks - settings.ticksInput; 

    isMining = true;

    if (blockType.toString().includes("glass")) { 
      targetBlock = block1;
      targetBlockPos = block1.getPos().toString();

      let targetBlock2 = targetBlock;
      let targetBlockPos2 = targetBlockPos;

      timeOut1 = setTimeout(() => {
        if (isMining && isBreaking && targetBlock2 && targetBlock2.getPos().toString() == targetBlockPos2 && !targetBlock2.getState().toString().includes("air")){
          isSwitchOn = true;
        }
      }, delay*50); 

        timeOut2 = setTimeout(() => {
          if (targetBlock2 && targetBlock2.getPos().toString() == targetBlockPos2){           
            isSwitchOn = false;
            if (targetBlock == myTargetBlock){
              targetBlock = null;
              targetBlockPos = null;
            }
          }

          clearTimer()
        }, ticks*50); 
    }
  });


  click1 = register("clicked", (x,y , button, state) => {

    if (!state && button == 0) { 
      isBreaking = false;
      isSwitchOn = false;

      clearTimer();

      targetBlock = null;
      targetBlockPos = null;
    }
   
    if (state && button == 0) { 
      isBreaking = true;
    }
  });


  tick1 = register("Tick", () => {

    currentBlock = Player.lookingAt();

    if (targetBlock) {
      try {
        if (targetBlock.getState().toString().includes("air")) {
          isSwitchOn = false;
          targetBlock = null;
          targetBlockPos = null;
          clearTimer();
        }
      } catch (e) {
        isSwitchOn = false;
        targetBlock = null;
        targetBlockPos = null;
        clearTimer();
      }
    }
  });


  render1 = register("renderWorld", () => {

    block = Player.lookingAt();
    if (isSwitchOn && targetBlock) {

      try {
        if (!targetBlock.getState().toString().includes("air")) {

          if(settings.BlockHighlight){
            RenderLibV2.drawInnerEspBox(targetBlock.getX() + 0.5, targetBlock.getY(), targetBlock.getZ() + 0.5, 1, 1, settings.inputColor[0]/255, settings.inputColor[1]/255, settings.inputColor[2]/255, settings.inputColor[3]/255, true)
          }

          else{
            RenderLibV2.drawEspBox(targetBlock.getX() + 0.5, targetBlock.getY(), targetBlock.getZ() + 0.5, 1, 1, settings.inputColor[0]/255, settings.inputColor[1]/255, settings.inputColor[2]/255, settings.inputColor[3]/255, true);
          }
        }

        else {
          isSwitchOn = false;
          targetBlock = null;
          clearTimer();
        }
       
      } catch (e) {
        isSwitchOn = false;
        targetBlock = null;
        clearTimer();
      }
    }
  });
}


function pingGlideCancel(){

  clearTimer()
  isSwitchOn = false;
  targetBlock = null;
  targetBlockPos = null;

  if(hitblock1){

    hitblock1.unregister()
    hitblock1 = null;

  }

  if(click1){

    click1.unregister()
    click1 = null;

  }

  if(tick1){

    tick1.unregister()
    tick1 = null;

  }

  if(render1){

    render1.unregister()
    render1 = null;

  }
}




/*
amethyst - purple
ruby - red
sapphire - light_blue
jade - lime
amber - orange
topaz - yellow
opal - white
peridot - green
blue - aquamarine
onyx - black
citrine - brown
jasper - magenta
*/


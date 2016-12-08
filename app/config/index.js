// Adapters
import SparkAdapter from '../adapters/spark/';

// Languages
import Scala from '../core/languages/Scala';

const adapters = {};
adapters[SparkAdapter.getId()] = SparkAdapter;

const languages = {};
languages[Scala.getID()] = Scala;

export default {
  adapters,
  languages,
  isNodeHidden: (nodeType) =>{
    return SparkAdapter.getNodeTemplates()[nodeType].isNodeHidden();
  }
}

let initilizied = false;
export function init(){
  if(initilizied) return;

  let data = {};
  // TODO: Load data from Local Storage
}
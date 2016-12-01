import joint from 'jointjs';
import _ from 'lodash';

import portDefinition from '../../../core/graph/portDefinition';
import NodeTemplate from '../../../core/graph/NodeTemplate';

const NAME = 'Count';
const NODE_TYPE = 'spark.count';
const MODEL = joint.shapes.basic.Rect.extend({
  portMarkup: '<circle class="port-body"/>',
  defaults: _.defaultsDeep({
    type: NODE_TYPE,
    size: {
      width: 80,
      height: 80
    },
    attrs: {
      '.': {
        magnet: false
      },
      text : { text: NAME }
    },
    ports: {
      items: [
        {
          id: 'in',
          group: 'in'
        }
      ],
      groups: portDefinition
    }
  }, joint.shapes.basic.Rect.prototype.defaults)
});

if(!joint.shapes['spark']) joint.shapes['spark'] = {};
joint.shapes['spark']['count'] = MODEL;

export default class Filter extends NodeTemplate{

  static getNodeType(){
    return NODE_TYPE;
  }

  static getName(){
    return NAME;
  }

  static getModel(){
    return MODEL.bind(joint);
  }
}

/**
 * A palette that allows you to create BPMN _and_ custom elements.
 */

import {
  customShapeAction, //图形
  customFlowAction, //线
  batchCreateCustom //遍历方法
} from '../utils/util'
export default function PaletteProvider(palette, create, elementFactory, globalConnect) {
  this.create = create
  this.elementFactory = elementFactory
  this.globalConnect = globalConnect

  palette.registerProvider(this)
}

PaletteProvider.$inject = [
  'palette',
  'create',
  'elementFactory',
  'globalConnect'
]

PaletteProvider.prototype.getPaletteEntries = function (element) {
  var actions = {}
  const {
    create,
    elementFactory,
    globalConnect
  } = this;

  function createConnect(type, group, className, title, options) {
    return {
      group,
      className,
      title: '新增' + title,
      action: {
        click: function (event) {
          globalConnect.toggle(event)
        }
      }
    }
  }

  function createAction(type, group, className, title, options) {
    function createListener(event) {
      var shape = elementFactory.createShape(Object.assign({
        type
      }, options))
      create.start(event, shape)
    }

    return {
      group,
      className,
      title: '新增' + title,
      action: {
        dragstart: createListener,
        click: createListener
      }
    }
  }
  Object.assign(actions, {
    ...batchCreateCustom(customShapeAction, createAction),
    ...batchCreateCustom(customFlowAction, createConnect), // 线
  })
  return actions
}
<template>
  <div class="custom-properties-panel" :class="dragClass" ref="dragbox">
    <div v-if="selectedElements.length == 1">
      <node-properties
        :element="element"
        v-if="element.type == 'bpmn:Task'"
        @changeProperties="changeProperties"
      ></node-properties>
      <route-properties
        :element="element"
        v-if="element.type == 'bpmn:ExclusiveGateway'"
        @changeProperties="changeProperties"
      ></route-properties>
    </div>
  </div>
</template>

<script>
import { START_EVENT } from 'bpmn-js/lib/features/replace/ReplaceOptions.js';
import nodeProperties from './nodeProperties.vue';
import routeProperties from './routeProperties.vue';
import { Drags } from '../js/drag.js';
export default {
  name: 'PropertiesView',
  components: {
    nodeProperties,
    routeProperties
  },
  props: {
    modeler: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      selectedElements: [],
      element: null,
      eventTypes: [
        { label: '默认', value: '' },
        {
          label: 'MessageEventDefinition',
          value: 'bpmn:MessageEventDefinition'
        },
        { label: 'TimerEventDefinition', value: 'bpmn:TimerEventDefinition' },
        {
          label: 'ConditionalEventDefinition',
          value: 'bpmn:ConditionalEventDefinition'
        }
      ],
      eventType: '',
      taskTypes: [
        { label: 'Task', value: 'bpmn:Task' },
        { label: 'ServiceTask', value: 'bpmn:ServiceTask' },
        { label: 'SendTask', value: 'bpmn:SendTask' },
        { label: 'UserTask', value: 'bpmn:UserTask' }
      ],
      taskType: ''
    };
  },
  created() {
    this.init();
  },
  mounted() {
    let box = this.$refs.dragbox;
    let dragBox = new Drags(box);
  },
  methods: {
    init() {
      const { modeler } = this;
      modeler.on('selection.changed', e => {
        console.log(e);
        this.selectedElements = e.newSelection;
        this.element = e.newSelection[0];
        console.log(this.element);
        this.setDefaultProperties();
      });
      modeler.on('element.changed', e => {
        const { element } = e;
        const { element: currentElement } = this;
        if (!currentElement) {
          return;
        }
        // update panel, if currently selected element changed
        if (element.id === currentElement.id) {
          this.element = element;
        }
      });
    },
    setDefaultProperties() {
      const { element } = this;
      if (element) {
        const { type, businessObject } = element;
        const { name } = businessObject;
        if (this.verifyIsEvent(type)) {
          this.eventType = businessObject.eventDefinitions
            ? businessObject.eventDefinitions[0]['$type']
            : '';
          console.log(this.eventType);
        } else if (this.verifyIsTask(type)) {
          this.taskType = type;
        }
        element['name'] = name;
      }
    },
    verifyIsEvent(type) {
      return type.includes('Event');
    },
    verifyIsTask(type) {
      return type.includes('Task');
    },
    /**
     * 改变控件触发的事件
     * @param { Object } input的Event
     * @param { String } 要修改的属性的名称
     */
    // changeField(event, type) {
    //   console.log(event);
    //   console.log(type);
    //   const value = event.target.value;
    //   this.element[type] = value;
    //   let properties = {};
    //   properties[type] = value;
    //   if (type === 'color') {
    //     this.onChangeColor(value);
    //   }
    //   this.updateProperties(properties);
    // },
    //业务方法
    changeField(key, value) {
      this.element[key] = value;
      let properties = {};
      properties[key] = value;
      this.updateProperties(properties);
    },
    updateName(name) {
      const { modeler, element } = this;
      const modeling = modeler.get('modeling');
      modeling.updateLabel(element, name);
    },
    onChangeColor(color) {
      console.log(color);
      const { modeler, element } = this;
      const modeling = this.modeler.get('modeling');
      modeling.setColor(element, {
        fill: null,
        stroke: color
      });
    },
    changeEventType(event) {
      console.log(event);
      const { modeler, element } = this;
      const value = event.target.value;
      const bpmnReplace = modeler.get('bpmnReplace');
      this.eventType = value;
      bpmnReplace.replaceElement(element, {
        type: element.businessObject.$type,
        eventDefinitionType: value
      });
    },
    changeTaskType(event) {
      console.log(event);
      const { modeler, element } = this;
      const value = event.target.value;
      const bpmnReplace = modeler.get('bpmnReplace');
      bpmnReplace.replaceElement(element, {
        type: value
      });
    },
    /**
     * 更新元素属性
     * @param { Object } 要更新的属性, 例如 { name: '' }
     */
    updateProperties(properties) {
      const { modeler, element } = this;
      const modeling = modeler.get('modeling');
      modeling.updateProperties(element, properties);
    },
    changeProperties(form) {
      for (let key in form) {
        this.changeField(key, form[key]);
      }
    }
  },
  computed: {
    isEvent() {
      const { element } = this;
      return this.verifyIsEvent(element.type);
    },
    isTask() {
      const { element } = this;
      return this.verifyIsTask(element.type);
    },
    dragClass() {
      const { element } = this;
      if (!element) {
        return '';
      } else if (element.type == 'bpmn:Task') {
        return 'task';
      } else if (element.type == 'bpmn:ExclusiveGateway') {
        return 'exclusiveGateway';
      } else {
        return '';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.custom-properties-panel {
  position: fixed;
  right: 50px;
  top: 100px;
  background-color: #eeeeee;
  &.task {
    padding: 10px;
    width: 340px;
  }
  &.exclusiveGateway {
    padding: 10px;
    width: 340px;
  }
}
</style>

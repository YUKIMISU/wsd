module.exports = {
  template: require('./index.html'),
  data: {
    items: require('../json/bank.json'),
    name: ''
  },
  events: {
    'change .select': function ($vm) {
      $vm.$emit('change', this.value)
    }
  },
  ready: function () {
    this.$el.find('.select').val(this.name);
  }
}
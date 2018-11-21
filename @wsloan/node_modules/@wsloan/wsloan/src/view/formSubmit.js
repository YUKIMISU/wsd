var $ = window.$;

function formSubmit(obj) {
  var $form = $('<form/>');
  $form.attr('method', obj.methods || 'get');
  $form.attr('action', obj.url);
  $form.attr('target', obj.target || '_blank');
  $form.attr('style', 'display: none');
  $.each(obj.data, function (name, value) {
    createInput(name, value, $form);
  });
  $('body').append($form);
  $form.trigger('submit');
}

function createInput(name, value, $parent) {
  var $input = $('<input/>');
  $input.attr('type', 'hidden');
  $input.attr('name', name);
  $input.attr('value', value);
  $parent.append($input);
}

// wsloan.formSubmit = formSubmit;

module.exports = formSubmit;

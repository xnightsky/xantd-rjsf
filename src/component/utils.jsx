

function getValueFromEvent(event) {
  return (event && event.target) ? event.target.value : event;
}


function getValueFromPreventEvent(e) {
  if (e && e.target) {
    preventEvent(e)
  }
  return getValueFromEvent(e);
}

function preventEvent(e) {
  e.preventDefault();
  e.stopPropagation();
}


export {
  getValueFromEvent,
  getValueFromPreventEvent,
  preventEvent,
}

import PropTypes from "prop-types";

export const registryPropTypes = PropTypes.shape({
  fields: PropTypes.object,
  SchemaFieldTemplate: PropTypes.func,
  FieldTemplate: PropTypes.func,
  ArrayFieldTemplate: PropTypes.func,
});


export const fieldPropTypes = PropTypes.shape({
  schema: PropTypes.object.isRequired,
  uiSchema: PropTypes.object,
  registry: registryPropTypes.isRequired,
})

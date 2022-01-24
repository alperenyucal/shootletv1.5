import Joi from 'joi';
import i18n from 'i18next';

function joiGeneric(obj: Joi.AnySchema) {
  return obj.messages({
    'any.required': i18n.t('main:Form.Messages.any.required'),
    'string.alphanum': i18n.t('main:Form.Messages.string.alphanum'),
    'string.email': i18n.t('main:Form.Messages.string.email'),
    'string.empty': i18n.t('main:Form.Messages.string.empty'),
    'string.max': i18n.t('main:Form.Messages.string.max'),
    'string.min': i18n.t('main:Form.Messages.string.min'),
  });
}

export const passwordValidator = joiGeneric(
  Joi.string()
    .label('password')
    .options({ errors: { wrap: { label: false } } })
    .min(6)
    .max(20)
    .required(),
);

export const emailValidator = joiGeneric(
  Joi.string()
    .label('email')
    .options({ errors: { wrap: { label: false } } })
    .email({ tlds: { allow: false } })
    .required(),
);

export const usernameValidator = joiGeneric(
  Joi.string()
    .label('First Name')
    .options({ errors: { wrap: { label: false } } })
    .regex(/^[a-zA-Z]/)
    .alphanum()
    .min(5)
    .max(20)
    .required()
    .messages({
      'string.pattern.base': i18n.t('auth:Form.Messages.string.pattern.letter'),
    }),
);

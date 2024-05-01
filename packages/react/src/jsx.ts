import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import {
  ElementType,
  Key,
  Props,
  ReactElementType,
  Ref,
  Type,
} from 'shared/ReactTypes';

const ReactElement = function (
  type: Type,
  key: Key,
  ref: Ref,
  props: Props,
): ReactElementType {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
    __mark: 'hello',
  };
  return element;
};

export const jsx = (type: ElementType, config: any, ...maybeChildren: any) => {
  let key: Key = null;
  const props: Props = {};
  let ref: Ref = null;

  for (const conf in config) {
    const val = config[conf];
    if (conf === 'key') {
      if (val !== undefined) {
        key = val;
      }
      continue;
    }
    if (conf === 'ref') {
      if (val !== undefined) {
        ref = val;
      }
      continue;
    }

    if ({}.hasOwnProperty.call(config, conf)) {
      props[conf] = val;
    }
  }

  const childrenLength = maybeChildren.length;
  if (childrenLength) {
    if (childrenLength === 1) {
      props.children = maybeChildren[0];
    } else {
      props.children = maybeChildren;
    }
  }

  return ReactElement(type, key, ref, props);
};

export const jsxDEV = jsx;

import React from "react";

function normalizeProps(props: any) {
  const normalized: any = { ...props };

  if (props.onPress) {
    normalized.onClick = props.onPress;
    delete normalized.onPress;
  }

  if (props.onChangeText) {
    normalized.onChange = (event: any) =>
      props.onChangeText(event.target.value);
    delete normalized.onChangeText;
  }

  if (props.testID) {
    normalized["data-testid"] = props.testID;
    delete normalized.testID;
  }

  if (props.style) {
    normalized.style = props.style;
  }

  return normalized;
}

export const View = (props: any) =>
  React.createElement("div", normalizeProps(props), props.children);

export const Text = (props: any) =>
  React.createElement("span", normalizeProps(props), props.children);

export const TextInput = (props: any) =>
  React.createElement("input", normalizeProps(props));

export const Button = (props: any) =>
  React.createElement(
    "button",
    normalizeProps({ ...props, type: "button" }),
    props.title || props.children,
  );

export const TouchableOpacity = (props: any) =>
  React.createElement(
    "button",
    normalizeProps({ ...props, type: "button" }),
    props.children,
  );

export const Image = (props: any) => {
  const normalized = normalizeProps({ ...props, src: props.source?.uri });
  delete normalized.source;
  return React.createElement("img", normalized);
};

export const Pressable = (props: any) =>
  React.createElement(
    "button",
    normalizeProps({ ...props, type: "button" }),
    props.children,
  );

export const StyleSheet = {
  create: (styles: any) => styles,
};

import { Animated, View, Text, Button, TouchableHighlight, Image } from 'react-native';
import { useState, useEffect, createElement } from 'react';

const dropshadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1
  },
  shadowOpacity: 0.2,
  shadowRadius: 2,
  elevation: 3
};
const defaultStyle = {
  animated: {},
  container: { ...dropshadow,
    alignItems: "center",
    backgroundColor: "#323232",
    borderRadius: 4,
    bottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    zIndex: 8
  },
  label: {
    color: "#eeeeee",
    flex: 1,
    size: 14,
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  actions: {
    alignItems: "center",
    flexDirection: "row"
  },
  closeButton: {
    borderRadius: 50,
    margin: 9
  },
  closeImage: {
    height: 36,
    width: 36
  }
};
function NativeSnackbar({
  action,
  actionColor,
  autoClose,
  buttonLabel,
  canBeClosed,
  openSnackbar,
  textLabel
}) {
  const styles = defaultStyle;
  const [display, setDisplay] = useState(false);
  const closeImage = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAAGWB6gOAAAACXBIWXMAAAsSAAALEgHS3X78AAAAzklEQVRYhe2X2w3DIAxF7U7QbJARunFG6Qh0hI7QDW6FZFqEWiCO8lB0z1dCiG0wtrHMBwAcv/UDIKyqoIdoxOor3QUAVwBTVXeaECefbwsOT37yoiua/qphAuD2pZ2YUIydMDYIcWHl4hOki8LDhN0XBW1uSU9FvbSEiMggIg93eS6XY3lpdAkjhBDSnXxHS8B/b5Kp5/HUnGr5+IWqPq2k3ErD0o3VXgdVfc2Vv4jUI+FL2LUVyowJxfO2RtWU59+2NKi5A+xiCTkkIvIGBjfr3SA9zPQAAAAASUVORK5CYII=`;
  const opacity = useState(new Animated.Value(0))[0];
  const scale = useState(new Animated.Value(0))[0];

  function onclickAction() {
    action.execute();
  }

  function closeSnackbar() {
    popOut();
    setTimeout(() => {
      setDisplay(false);
      openSnackbar.setValue(false);
    }, 300);
  }

  function popIn() {
    Animated.parallel([Animated.timing(opacity, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true
    }), Animated.timing(scale, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true
    })]).start();
  }

  function popOut() {
    Animated.parallel([Animated.timing(opacity, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true
    }), Animated.timing(scale, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true
    })]).start();
  }

  useEffect(() => {
    if (openSnackbar.value === true) {
      const timer = setTimeout(() => closeSnackbar(), autoClose * 1000);
      return () => clearTimeout(timer);
    } else {
      return null;
    }
  });
  useEffect(() => {
    if (openSnackbar.value === true) {
      setDisplay(true);
    }

    if (openSnackbar.value === false) {
      setDisplay(false);
    }
  }, [openSnackbar.value]);

  if (textLabel.status === "available" && display === true) {
    popIn();
    return createElement(Animated.View, {
      style: [styles.animated, opacity, {
        transform: [{
          scale: scale
        }]
      }]
    }, createElement(View, {
      style: styles.container
    }, createElement(Text, {
      style: styles.label
    }, textLabel.value), createElement(View, {
      style: styles.actions
    }, action && action.canExecute && createElement(Button, {
      color: actionColor.value,
      title: buttonLabel,
      onPress: onclickAction
    }, buttonLabel), canBeClosed === true && createElement(TouchableHighlight, {
      style: styles.closeButton,
      underlayColor: "#424242",
      onPress: closeSnackbar
    }, createElement(Image, {
      style: styles.closeImage,
      source: {
        uri: closeImage
      }
    })))));
  } else {
    return null;
  }
}

export { NativeSnackbar, dropshadow };

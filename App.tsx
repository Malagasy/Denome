import { ConnectedRouter } from "connected-react-router";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { Route } from "react-router-native";
import { compose, pure } from "recompose";
import { GameConfiguration } from "./src/pages/GameConfiguration";
import { history, configureStore } from "./src/store";
import { Play } from "./src/pages/Play";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
});

export const AppBase: React.FC<{}> = () => {
  return (
    <Provider store={configureStore()}>
      <ConnectedRouter history={history}>
        <View style={styles.container}>
          <Route exact path="/" component={GameConfiguration} />
          <Route path="/play" component={Play} />
        </View>
      </ConnectedRouter>
    </Provider>
  );
};

export default compose(pure)(AppBase);

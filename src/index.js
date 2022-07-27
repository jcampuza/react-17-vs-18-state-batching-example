import { render } from "react-dom";
import { createRoot } from "react-dom/client";
import App from "./App";
// Root of the problem: https://github.com/yahoo/fluxible/blob/fluxible-router%401.5.4/packages/fluxible/utils/callAction.js

// React 17 API
// Essentially Fluxible calls setState whenever a state change occurs.
// In React 17, updates that happened outside of React event handlers (setTimeout, Promise, etc)
// Were not batched. So you'll see in this example, clicking the button will actually rerender
// the component and call componentDidUpdate 3 separate times. This made our app work because
// every `navigateAction` in Fluxible calls setState 2 times, once for NAVIGATE_START
// and once for NAVIGATE_SUCCESS/FAILURE. The Fluxible historyHandler would call
// history.pushState() after the first NAVIGATE_START in componentDidUpdate, the NAVIGATE_SUCCESS would happen
// and the URL would already be updated, so all components would have the latest location.

// React 18 API
// In React 18, setState was changed to ALWYAYS batch, including in setTimeout/Promise, etc.
// This is what is breaking fluxible. What happens now is NAVIGATE_START is called in a setImmediate, which calls setState.
// NAVIGATE_SUCCESS is then called right after if there is no `action` present to execute for that route which calls setState again.
// But in React 18, there is no rerender/componentDidUpdate between these two actions. So now the state is already updated
// a rerender happens, then componentDidUpdate is called which calls history.pushState (which itself does not trigger a rerender)
// So this means the tree will actually rerender before the URL has finished updating.

// React 17
const root1 = document.getElementById("root1");
render(<App name="React 17" />, root1);

// React 18
const root2 = document.getElementById("root2");
createRoot(root2).render(<App name="React 18" />);

# react-17-vs-18-state-batching-example

This is an example repo used to show the difference in state batching behavior between react 17 and 18 for a quick lightning talk I'm giving.

There are some libraries that break due to this and a reliance on things like multiple `componentDidUpdate()` calls occuring between setStates called in a timer.
